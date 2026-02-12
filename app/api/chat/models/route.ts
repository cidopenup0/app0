import { NextResponse } from 'next/server';

const models = [
  {
    id: 'google/gemma-3-4b-it:free',
    name: 'Gemma 3 4B',
    description: 'Fast and efficient model for everyday questions',
    provider: 'Google',
  },
  {
    id: 'google/gemma-3-12b-it:free',
    name: 'Gemma 3 12B',
    description: 'Balanced performance and quality for general use',
    provider: 'Google',
  },
  {
    id: 'google/gemma-3-27b-it:free',
    name: 'Gemma 3 27B',
    description: 'Powerful model for complex questions',
    provider: 'Google',
  },
  {
    id: 'meta-llama/llama-3.2-3b-instruct:free',
    name: 'Llama 3.2 3B',
    description: 'Lightweight and responsive for quick answers',
    provider: 'Meta',
  },
  {
    id: 'meta-llama/llama-3.3-70b-instruct:free',
    name: 'Llama 3.3 70B',
    description: 'Advanced reasoning and detailed responses',
    provider: 'Meta',
  },
  {
    id: 'openai/gpt-oss-20b:free',
    name: 'GPT OSS 20B',
    description: 'Open-source model with good general performance',
    provider: 'OpenAI',
  },
  {
    id: 'openai/gpt-oss-120b:free',
    name: 'GPT OSS 120B',
    description: 'Powerful open-source model for complex tasks',
    provider: 'OpenAI',
  },
];

export async function GET() {
  try {
    return NextResponse.json({
      models,
      total: models.length,
    });
  } catch (error) {
    console.error('Error fetching models:', error);
    return NextResponse.json(
      { error: 'Failed to fetch models' },
      { status: 500 }
    );
  }
}
