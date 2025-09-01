import { NextRequest, NextResponse } from 'next/server';
import { PumpInputSchema } from '@/lib/schemas';
import { generateThread } from '@/lib/generator';
import { redact } from '@/lib/redactor';
import type { PumpInput as PumpInputType } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const input = PumpInputSchema.parse(body) as PumpInputType;
    
    const thread = generateThread(input);
    
    const redactedThread = {
      ...thread,
      tweets: thread.tweets.map(tweet => redact(tweet)),
      disclaimer: redact(thread.disclaimer)
    };
    
    return NextResponse.json(redactedThread);
  } catch (error) {
    console.error('Generation failed:', error);
    return NextResponse.json(
      { error: 'Failed to generate thread' },
      { status: 500 }
    );
  }
}
