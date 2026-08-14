import { Client } from "@gradio/client";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405.json({ error: 'Method not allowed' }));
  }

  try {
    // Us Space ka naam likhein jo aapne use kiya hai (e.g., username/space-name)
    const app = await Client.connect("dx8152/Qwen-Image-Edit-2509-Light_restoration", {
      hf_token: process.env.HF_TOKEN
    });

    // Frontend se aane wali image data ko predict function mein pass karein
    const result = await app.predict("/predict", {
      image: req.body.image, // Base64 ya image URL
    });

    return res.status(200).json({ output: result.data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
