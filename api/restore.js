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

    // Direct Hugging Face Inference API fetch call
    const response = await fetch(
      "https://api-inference.huggingface.co/models/dx8152/Qwen-Image-Edit-2509-Light_restoration",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: image, // Direct base64 string pass karein
          parameters: { prompt: "restore this old damaged photo, high quality, clear details" }
        })
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`HF API Error: ${errText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const resultBuffer = Buffer.from(arrayBuffer);
    const base64Result = resultBuffer.toString('base64');
    const outputUrl = `data:image/jpeg;base64,${base64Result}`;

    return res.status(200).json({ output: outputUrl });

  } catch (error) {
    console.error("Vercel Function Error:", error);
    return res.status(500).json({ error: error.message || "Restoration failed." });
  }
}
