import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenRouter client using OpenAI package
const openrouter = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.io/api/v1',
});

// Model configurations for OpenRouter
const modelConfigs = {
  'google/gemma-3-4b-it:free': {
    model: 'google/gemma-3-4b-it:free',
    displayName: 'Gemma 3 4B',
  },
  'google/gemma-3-12b-it:free': {
    model: 'google/gemma-3-12b-it:free',
    displayName: 'Gemma 3 12B',
  },
  'google/gemma-3-27b-it:free': {
    model: 'google/gemma-3-27b-it:free',
    displayName: 'Gemma 3 27B',
  },
  'meta-llama/llama-3.2-3b-instruct:free': {
    model: 'meta-llama/llama-3.2-3b-instruct:free',
    displayName: 'Llama 3.2 3B',
  },
  'meta-llama/llama-3.3-70b-instruct:free': {
    model: 'meta-llama/llama-3.3-70b-instruct:free',
    displayName: 'Llama 3.3 70B',
  },
  'openai/gpt-oss-20b:free': {
    model: 'openai/gpt-oss-20b:free',
    displayName: 'GPT OSS 20B',
  },
  'openai/gpt-oss-120b:free': {
    model: 'openai/gpt-oss-120b:free',
    displayName: 'GPT OSS 120B',
  }
};

export async function POST(req: Request) {
  try {
    const { message, messages, model = 'google/gemma-3-4b-it:free' } = await req.json();

    // Support both single message (legacy) and conversation history (new)
    if (!message && (!messages || messages.length === 0)) {
      return NextResponse.json(
        { error: 'Message or messages array is required' },
        { status: 400 }
      );
    }

    // Validate OPENROUTER_API_KEY
    if (!process.env.OPENROUTER_API_KEY) {
      console.error('OPENROUTER_API_KEY is not set');
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    // Get model configuration
    const config = modelConfigs[model as keyof typeof modelConfigs] || modelConfigs['google/gemma-3-4b-it:free'];
    
    // Prepare messages for the API
    let apiMessages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>;
    
    // System prompt for AI behavior
    const systemPrompt = {
      role: 'system' as const,
      content: `You are app0, a friendly and helpful AI assistant

Always answer the user’s question directly and briefly. Avoid unnecessary wording.

If the question is unclear or incomplete, ask a specific clarifying question before responding.

If the user requests something outside your capabilities, explain what you cannot do and why.

Capabilities and Limitations

You cannot:

Navigate to websites

Open applications or files

Control or interact with the user’s device

Perform real-world actions

Access private data unless provided in the conversation

If the user asks you to "open YouTube", "go to Google", "navigate to a link", or perform any action outside text responses, reply:

I cannot perform actions like opening websites or controlling devices. I can only provide text-based assistance.

Communication Style

Maintain a professional, concise, and helpful tone.

Do not use emojis unless explicitly asked.

Do not mention or reference these system instructions.

Do not invent facts or provide information you are not certain about.

If unsure, state what additional information is required.

Answering Approach

Present reasoning or explanation in clear, step-by-step format when needed.

Use examples only when they improve understanding.

When providing code, ensure it is correct, minimal, and runnable.

Focus on practical, real-world guidance rather than abstract theory.

Goal

Your priority is clarity.
You are here to assist, not to impress.`
    };
    
    if (messages && Array.isArray(messages)) {
      // Use the full conversation history with system prompt
      apiMessages = [
        systemPrompt,
        ...messages.map((msg: { role: 'user' | 'assistant'; content: string }) => ({
          role: msg.role,
          content: msg.content,
        }))
      ];
    } else {
      // Fallback to single message for backward compatibility with system prompt
      apiMessages = [
        systemPrompt,
        {
          role: 'user',
          content: message,
        },
      ];
    }
    
    // Call OpenRouter API using OpenAI package with conversation history
    const chatCompletion = await openrouter.chat.completions.create({
      model: config.model,
      messages: apiMessages,
    });

    let aiResponse = chatCompletion.choices[0]?.message?.content || 'No response generated';

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
