import { Client } from "@gradio/client";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ error: 'Image data is required' });
    }

    // Hugging Face Space se connect karein
    const app = await Client.connect("dx8152/Qwen-Image-Edit-2509-Light_restoration", {
      hf_token: process.env.HF_TOKEN
    });

    // Model predict function call karein
    const result = await app.predict("/predict", {
      image: image,
    });

    return res.status(200).json({ output: result.data });
  } catch (error) {
    console.error("Vercel Function Error:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}
