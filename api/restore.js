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

    // Base64 string ko buffer mein convert karein
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, 'base64');

    // Hugging Face ka official InferenceClient
    const client = new InferenceClient(process.env.HF_TOKEN);

    const resultBlob = await client.imageToImage({
      provider: "wavespeed",
      model: "dx8152/Qwen-Image-Edit-2509-Light_restoration",
      inputs: buffer,
      parameters: { 
        prompt: "restore this old damaged photo, high quality, clear details" 
      }
    });

    // Blob ko Base64 mein convert karke frontend par bhejna
    const arrayBuffer = await resultBlob.arrayBuffer();
    const resultBuffer = Buffer.from(arrayBuffer);
    const base64Result = resultBuffer.toString('base64');
    const mimeType = resultBlob.type || "image/jpeg";
    const outputUrl = `data:${mimeType};base64,${base64Result}`;

    return res.status(200).json({ output: outputUrl });

  } catch (error) {
    console.error("Vercel Function Error:", error);
    return res.status(500).json({ error: error.message || "Restoration failed." });
  }
}
