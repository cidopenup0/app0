import { NextResponse } from 'next/server';
import Replicate from 'replicate';
import { writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'path';

const replicate = new Replicate();

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // Run the Replicate model
    const output = await replicate.run('black-forest-labs/flux-schnell', {
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
