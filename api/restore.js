export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Only POST requests are allowed"
    });
  }

  try {
    const { image } = req.body || {};

    if (!image) {
      return res.status(400).json({
        error: "Image is required"
      });
    }

    console.log("REPLICATE ENV CHECK:", {
  exists: !!process.env.REPLICATE_API_TOKEN,
  length: process.env.REPLICATE_API_TOKEN?.length || 0
});

if (!process.env.REPLICATE_API_TOKEN) {
  return res.status(500).json({
    error: "ENV_CHECK_FAILED"
  });
}
    const response = await fetch(
      "https://api.replicate.com/v1/predictions",
      {
        method: "POST",
        headers: {
          "Authorization":
            `Bearer ${process.env.REPLICATE_API_TOKEN}`,
          "Content-Type": "application/json",
          "Prefer": "wait"
        },
        body: JSON.stringify({
          version:
            "8aa841ec761ec12846e211d0ffca30b566cff98a078e7baf1a1d49dad5c88b37",
          input: {
            img: image,
            version: "v1.4",
            scale: 2
          }
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data?.detail || data?.error || "Replicate API error"
      });
    }

    return res.status(200).json({
      success: true,
      output: data.output
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: error.message || "Restoration failed"
    });
  }
}
