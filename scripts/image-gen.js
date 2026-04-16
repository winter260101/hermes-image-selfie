import { fal } from '@fal-ai/client';
import { parsePrompt } from './prompt-parse.js';

const REFERENCE_IMAGE_URL =
  'https://cdn.jsdelivr.net/gh/winter260101/hermes-image-selfie@main/grok-ref-img.jpeg';

const generateImage = async (userPrompt) => {
  const { mode, apiPrompt } = parsePrompt(userPrompt);

  fal.config({ credentials: process.env.FAL_KEY });

  const result = await fal.subscribe('xai/grok-imagine-image/edit', {
    input: {
      image_url: REFERENCE_IMAGE_URL,
      prompt: apiPrompt,
      num_images: 1,
      output_format: 'jpeg',
    },
  });

  const imageUrl = result.data.images[0].url;

  return {
    success: true,
    mode,
    markdown: `![generated image](${imageUrl})`,
    url: imageUrl,
  };
};

const main = async () => {
  const userPrompt = process.argv.slice(2).join(' ').trim();

  if (!userPrompt) {
    console.log(JSON.stringify({ success: false, error: 'No prompt provided' }));
    process.exit(1);
  }

  if (!process.env.FAL_KEY) {
    console.log(JSON.stringify({ success: false, error: 'FAL_KEY environment variable is not set' }));
    process.exit(1);
  }

  try {
    const result = await generateImage(userPrompt);
    console.log(JSON.stringify(result));
  } catch (err) {
    console.log(JSON.stringify({ success: false, error: err.message }));
    process.exit(1);
  }
};

main();
