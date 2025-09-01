import { NextRequest, NextResponse } from 'next/server';
import { PumpInputSchema } from '@/lib/schemas';
import type { PumpInput as PumpInputType, Thread as ThreadType } from '@/lib/types';
import { redact } from '@/lib/redactor';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const input = PumpInputSchema.parse(body) as PumpInputType;

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Missing OPENAI_API_KEY' }, { status: 400 });
    }

    const prompt = `You are a satirical crypto KOL copywriter. Generate a ${input.mode} for ticker ${input.ticker} using persona ${input.persona} and narrative ${input.narrative}. Cope Dial intensity=${input.intensity}. Length=${input.length} (only applies for thread mode). Red flags: ${input.redFlags.join(', ') || 'none'}. Output must:
- Be clearly satirical, avoid real names/brands.
- Use crypto twitter tone; short, punchy lines with emojis.
- If mode is thread, produce numbered tweets; if tweet, produce a single concise line.
- Provide a disclaimer that it's satire/NFA/DYOR.
- Provide a cardMeta with a short title and up to 3 concise bullets.

Return ONLY JSON with shape: { "tweets": string[], "disclaimer": string, "cardMeta": { "title": string, "bullets": string[] } }.`;

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You write satirical, shill-style crypto posts. Never use real names; keep placeholders.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.9,
        max_tokens: 700,
      }),
    });

    if (!res.ok) {
      const t = await res.text();
      return NextResponse.json({ error: 'OpenAI error', detail: t }, { status: 500 });
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content || '';

    let json: ThreadType;
    try {
      json = JSON.parse(content);
    } catch {
      const match = content.match(/\{[\s\S]*\}$/);
      if (!match) throw new Error('Bad AI response');
      json = JSON.parse(match[0]);
    }

    const safe: ThreadType = {
      tweets: Array.isArray(json.tweets) && json.tweets.length > 0 ? json.tweets.map((t: string) => redact(t)) : [redact('1/ Satirical output unavailable')] ,
      disclaimer: typeof json.disclaimer === 'string' ? redact(json.disclaimer) : redact('Satire / Parody / NFA / DYOR'),
      cardMeta: {
        title: typeof json.cardMeta?.title === 'string' ? json.cardMeta.title : `${input.ticker} — ${input.narrative} Play`,
        bullets: Array.isArray(json.cardMeta?.bullets) ? json.cardMeta.bullets.slice(0, 3) : ['Float tight • Squeeze setup'],
      },
    };

    return NextResponse.json(safe);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'AI generation failed', detail: errorMessage },
      { status: 500 }
    );
  }
} 