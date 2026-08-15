export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ error: 'Image data is required.' });
    }

    // Direct Wavespeed router endpoint
    const response = await fetch(
      "https://router.huggingface.co/wavespeed/api/v3/wavespeed-ai/qwen-image/edit-plus-lora",
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: image, // Yeh already base64 data URL hai
          parameters: {
            prompt: "restore this old damaged photo, high quality, clear details",
          }
        })
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`API Error: ${errText}`);
    }

    const result = await response.json();
    
    // Agar API direct image ya URL ya base64 return karti hai uske hisab se output bhejein
    const outputUrl = result.output || result.image || (typeof result === 'string' ? result : null);

    return res.status(200).json({ output: outputUrl || result });

  } catch (error) {
    console.error("Vercel Function Error:", error);
    return res.status(500).json({ error: error.message || "Restoration failed." });
  }
}
