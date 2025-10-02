import { NextResponse } from 'next/server';
import Replicate from 'replicate';

// Initialize Replicate
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN, // Use environment variable for authentication
});

// Model configurations
const modelConfigs = {
  'llama-3-70b': {
    model: 'meta/meta-llama-3-70b-instruct',
    input: {
      top_p: 0.9,
      min_tokens: 0,
      temperature: 0.6,
      prompt_template: "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\nYou are a helpful assistant<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n",
      presence_penalty: 1.15,
    }
  },
  'gpt-5-nano': {
    // Note: This is a placeholder - replace with actual model when available
    model: 'meta/meta-llama-3-70b-instruct', // Using llama as fallback
    input: {
      top_p: 0.95,
      min_tokens: 0,
      temperature: 0.7,
      prompt_template: "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\nYou are GPT-5 Nano, a compact but powerful AI assistant. Be concise and helpful.<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n",
      presence_penalty: 1.1,
    }
  },
  'deepseek-r1': {
    // Note: This is a placeholder - replace with actual model when available  
    model: 'meta/meta-llama-3-70b-instruct', // Using llama as fallback
    input: {
      top_p: 0.85,
      min_tokens: 0,
      temperature: 0.5,
      prompt_template: "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\nYou are DeepSeek R1, an advanced AI model with strong reasoning capabilities. Think step by step and provide detailed analysis.<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n",
      presence_penalty: 1.2,
    }
  },
  'kimi-k2-instruct': {
    // Note: This is a placeholder - replace with actual model when available
    model: 'meta/meta-llama-3-70b-instruct', // Using llama as fallback
    input: {
      top_p: 0.9,
      min_tokens: 0,
      temperature: 0.6,
      prompt_template: "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\nYou are Kimi K2, an instruction-tuned AI assistant. Follow instructions carefully and provide accurate responses.<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n",
      presence_penalty: 1.15,
    }
  }
};

export async function POST(req: Request) {
  try {
    // Parse the incoming request
    const { message, model = 'llama-3-70b' } = await req.json();

    // Get model configuration
    const config = modelConfigs[model as keyof typeof modelConfigs] || modelConfigs['llama-3-70b'];
    
    // Set up input for Replicate
    const input = {
      ...config.input,
      prompt: message,
    };

    // Stream results from Replicate
    let output = '';
    for await (const event of replicate.stream(config.model as `${string}/${string}`, { input })) {
      output += event; // Accumulate the streamed output
    }

    // Return the final response
    return NextResponse.json({ response: output });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to process your request' },
      { status: 500 }
    );
  }
}
