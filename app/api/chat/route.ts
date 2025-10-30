import { NextResponse } from 'next/server';

// Model configurations for OpenRouter
const modelConfigs = {
  'gpt-oss-20b': {
    model: 'openai/gpt-oss-20b:free',
  },
  'gemma-3-27b': {
    model: 'google/gemma-3-27b-it:free',
  },
  'qwen-2.5-72b': {
    model: 'qwen/qwen-2.5-72b-instruct:free',
  },
  'nemotron-nano-12b-v2': {
    model: 'nvidia/nemotron-nano-12b-v2-vl:free',
  }
};

export async function POST(req: Request) {
  try {
    const { message, model = 'gpt-oss-20b' } = await req.json();

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Get model configuration
    const config = modelConfigs[model as keyof typeof modelConfigs] || modelConfigs['gpt-oss-20b'];
    
    // Call OpenRouter API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: config.model,
        messages: [
          {
            role: 'user',
            content: message,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenRouter API error:', errorData);
      throw new Error('Failed to get response from OpenRouter');
    }

    const data = await response.json();
    let aiResponse = data.choices?.[0]?.message?.content || 'No response generated';

    // Post-process the response to clean up formatting
    aiResponse = cleanResponse(aiResponse);

    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to process your request' },
      { status: 500 }
    );
  }
}

// Function to clean up AI response formatting
function cleanResponse(text: string): string {
  // Remove lines that start with `: ` (colon followed by space) - these are often explanatory notes
  // but keep them if they're part of a longer paragraph
  const lines = text.split('\n');
  const cleanedLines = lines.map(line => {
    // If line starts with `: ` and is standalone, convert to bullet point or remove colon
    if (line.trim().match(/^:\s+/)) {
      return line.replace(/^:\s+/, '- ');
    }
    return line;
  });
  
  return cleanedLines.join('\n');
}
