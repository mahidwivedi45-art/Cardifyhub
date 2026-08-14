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

    // Base64 image ko blob ya buffer mein convert karein
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, 'base64');

    const hf = new HfInference(process.env.HF_TOKEN);

    // Direct Model Inference call
    const result = await hf.imageToImage({
      model: "dx8152/Qwen-Image-Edit-2509-Light_restoration",
      inputs: buffer,
      parameters: { prompt: "restore this old damaged photo, high quality, clear details" }
    });

    // Result ko base64 data URL mein convert karein
    const arrayBuffer = await result.arrayBuffer();
    const base64Result = Buffer.from(arrayBuffer).toString('base64');
    const mimeType = result.type || "image/jpeg";
    const outputUrl = `data:${mimeType};base64,${base64Result}`;

    return res.status(200).json({ output: outputUrl });

  } catch (error) {
    console.error("Vercel Function Error:", error);
    return res.status(500).json({ error: error.message || "Restoration failed." });
  }
}
