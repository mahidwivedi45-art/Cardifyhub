import { HfInference } from "@huggingface/inference";

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

    const hf = new HfInference(process.env.HF_TOKEN);

    const response = await hf.imageToImage({
      model: "dx8152/Qwen-Image-Edit-2509-Light_restoration",
      inputs: buffer,
      parameters: { prompt: "restore this old damaged photo, high quality, clear details" }
    });

    // Safe conversion check for Blob/ArrayBuffer/Buffer
    let resultBuffer;
    if (response instanceof Buffer) {
      resultBuffer = response;
    } else if (typeof response.arrayBuffer === 'function') {
      const arrayBuffer = await response.arrayBuffer();
      resultBuffer = Buffer.from(arrayBuffer);
    } else {
      // Fallback for blob/other formats
      resultBuffer = Buffer.from(await response.text());
    }

    const base64Result = resultBuffer.toString('base64');
    const outputUrl = `data:image/jpeg;base64,${base64Result}`;

    return res.status(200).json({ output: outputUrl });

  } catch (error) {
    console.error("Vercel Function Error:", error);
    return res.status(500).json({ error: error.message || "Restoration failed." });
  }
}
