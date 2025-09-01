import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { html } = await request.json();
    
    if (!html) {
      return NextResponse.json(
        { error: 'HTML content is required' },
        { status: 400 }
      );
    }
    
    // For now, return a simple response
    // In production, you'd use Puppeteer or similar to generate PNG
    return NextResponse.json({ 
      message: 'Export endpoint ready',
      note: 'Use client-side html-to-image for now'
    });
  } catch (error) {
    console.error('Export failed:', error);
    return NextResponse.json(
      { error: 'Failed to export' },
      { status: 500 }
    );
  }
}
