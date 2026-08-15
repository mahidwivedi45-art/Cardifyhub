import { InferenceClient } from "@huggingface/inference";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ error: 'Image data is required.' });
    }

    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, 'base64');

    const client = new InferenceClient(process.env.HF_TOKEN);

    const result = await client.imageToImage({
      provider: "hf-inference",
      model: "dx8152/Qwen-Image-Edit-2509-Light_restoration",
      inputs: buffer,
      parameters: { 
        prompt: "restore this old damaged photo, high quality, clear details" 
      }
    });

    // Safe conversion without relying on .arrayBuffer()
    let resultBuffer;
    if (result instanceof Buffer) {
      resultBuffer = result;
    } else if (typeof result.arrayBuffer === 'function') {
      const ab = await result.arrayBuffer();
      resultBuffer = Buffer.from(ab);
    } else if (result instanceof Uint8Array) {
      resultBuffer = Buffer.from(result);
    } else {
      // Fallback if it returns a blob or other format
      const arrayBuffer = await new Response(result).arrayBuffer();
      resultBuffer = Buffer.from(arrayBuffer);
    }

    const base64Result = resultBuffer.toString('base64');
    const outputUrl = `data:image/jpeg;base64,${base64Result}`;

    return res.status(200).json({ output: outputUrl });

  } catch (error) {
    console.error("Vercel Function Error:", error);
    return res.status(500).json({ error: error.message || "Restoration failed." });
  }
}
