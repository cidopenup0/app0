import { NextResponse } from 'next/server';
import Replicate from 'replicate';

// Initialize Replicate
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN, // Use environment variable for authentication
});

export async function POST(req: Request) {
  try {
    // Parse the incoming request
    const { message } = await req.json();

    // Set up input for Replicate
    const input = {
      top_p: 0.9,
      prompt: `${message}`,
      min_tokens: 0,
      temperature: 0.6,
      prompt_template:
        "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\nYou are a helpful assistant<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n",
      presence_penalty: 1.15,
    };

    // Stream results from Replicate
    let output = '';
    for await (const event of replicate.stream('meta/meta-llama-3-70b-instruct', { input })) {
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
