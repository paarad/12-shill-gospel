import { NextRequest, NextResponse } from 'next/server';
import { redact } from '@/lib/redactor';

export const runtime = 'edge';

interface RemixResponse {
  tweets: string[];
  disclaimer: string;
  cardMeta: {
    title: string;
    bullets: string[];
  };
}

export async function POST(req: NextRequest) {
  try {
    const { input, thread } = await req.json();
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Missing OPENAI_API_KEY' }, { status: 400 });
    }

    const prompt = `You are a satirical crypto KOL copywriter. Rewrite the following output to be punchier and funnier while staying clearly satirical and avoiding real names/brands. Keep the same mode (tweet vs thread). Use crypto twitter tone. Avoid financial advice. Keep numbered tweets if thread. Inputs (persona, narrative, cope=${input?.intensity}). Output must be short lines, high-signal, with emojis.\n\nCurrent output:\n${JSON.stringify(thread, null, 2)}\n\nReturn ONLY the JSON with { "tweets": string[], "disclaimer": string, "cardMeta": { "title": string, "bullets": string[] } }.`;

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
        temperature: 0.85,
        max_tokens: 600,
      }),
    });

    if (!res.ok) {
      const t = await res.text();
      return NextResponse.json({ error: 'OpenAI error', detail: t }, { status: 500 });
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content || '';

    let json: RemixResponse;
    try {
      json = JSON.parse(content);
    } catch {
      const match = content.match(/\{[\s\S]*\}$/);
      if (!match) throw new Error('Bad AI response');
      json = JSON.parse(match[0]);
    }

    const safe = {
      tweets: Array.isArray(json.tweets) ? json.tweets.map((t: string) => redact(t)) : thread.tweets,
      disclaimer: typeof json.disclaimer === 'string' ? redact(json.disclaimer) : thread.disclaimer,
      cardMeta: {
        title: json.cardMeta?.title || thread.cardMeta.title,
        bullets: Array.isArray(json.cardMeta?.bullets) ? json.cardMeta.bullets.slice(0, 3) : thread.cardMeta.bullets,
      },
    };

    return NextResponse.json(safe);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Remix failed', detail: errorMessage }, { status: 500 });
  }
}
