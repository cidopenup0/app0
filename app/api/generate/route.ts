import { NextResponse } from 'next/server';
import Replicate from 'replicate';
import { writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'path';

const replicate = new Replicate();

// Model mappings
const modelMappings = {
  'flux-schnell': 'black-forest-labs/flux-schnell',
  'flux-dev': 'black-forest-labs/flux-dev',
  'stable-diffusion-xl': 'stability-ai/sdxl:7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc',
  'imagen-4-fast': 'google/imagen-4-fast',
  'photon': 'luma/photon'
} as const;

export async function POST(req: Request) {
  try {
    const { prompt, model = 'flux-schnell' } = await req.json();

    // Get the actual model path from mapping
    const modelPath = modelMappings[model as keyof typeof modelMappings] || modelMappings['flux-schnell'];

    // Run the Replicate model
    const output = await replicate.run(modelPath as any, {
      input: {
        prompt: prompt,
      },
    });

    // Define output path
    const timestamp = new Date().getTime();
    const directoryPath = resolve('./public/images');
    const filePath = resolve(directoryPath, `output_${timestamp}.webp`);

    // Ensure the directory exists
    await mkdir(directoryPath, { recursive: true });

    // Write output files to disk
    for (const [index, item] of Object.entries(output)) {
      await writeFile(filePath, item);
    }

    // Respond with the output URL(s)
    const response = NextResponse.json({
      message: 'Image(s) generated successfully',
      image: `/images/output_${timestamp}.webp`,
    });
    response.headers.set('Cache-Control', 'no-store');
    return response;
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
}
