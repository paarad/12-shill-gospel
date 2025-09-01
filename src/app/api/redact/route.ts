import { NextRequest, NextResponse } from 'next/server';
import { redact } from '@/lib/redactor';

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();
    
    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }
    
    const redactedText = redact(text);
    
    return NextResponse.json({ redacted: redactedText });
  } catch (error) {
    console.error('Redaction failed:', error);
    return NextResponse.json(
      { error: 'Failed to redact text' },
      { status: 500 }
    );
  }
}
