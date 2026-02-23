import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const audioFile = formData.get('audio') as File;

    if (!audioFile) {
      return NextResponse.json({ error: 'No audio file provided' }, { status: 400 });
    }
    if (!process.env.GROQ_API_KEY) {
      console.error('GROQ_API_KEY is not set');
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }
    const arrayBuffer = await audioFile.arrayBuffer();
    const base64Audio = Buffer.from(arrayBuffer).toString('base64');
    const groqFormData = new FormData();
    groqFormData.append('file', audioFile);
    groqFormData.append('model', 'whisper-large-v3-turbo');
    groqFormData.append('response_format', 'text');

    const response = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: groqFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Groq API error:', errorText);
      throw new Error(`Groq API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const transcription = await response.text();

    return NextResponse.json({ text: transcription });

  } catch (error) {
    console.error('Speech-to-text error:', error);
    
    return NextResponse.json({ 
      error: 'Failed to transcribe audio', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}