import { GoogleGenAI } from "@google/genai";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "25mb" }));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "VisionAI Backend Running 🚀",
  });
});

app.post("/analyze", async (req, res) => {
  try {
    const { image, mode } = req.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "No image received.",
      });
    }

    let prompt = "";

    switch (mode) {
      case "academic":
        prompt = `
You are VisionAI.

Analyze this image for educational purposes.

Return ONLY this format.

Object:
Category:
Confidence:
Description:
Recommendation:

Rules:
- Confidence must be 0-100%.
- Description should only be 2-3 sentences.
- Recommendation should only be one sentence.
- No markdown.
- No bullet points.
`;
        break;

      case "safety":
        prompt = `
You are VisionAI.

Analyze this image for safety hazards.

Return ONLY this format.

Hazards:
Risk Level:
Description:
Recommendation:

Rules:
- Risk Level should be Low, Medium or High.
- Description should only be 2-3 sentences.
- Recommendation should only be one sentence.
- No markdown.
`;
        break;

      case "inventory":
        prompt = `
You are VisionAI.

Analyze this image like an inventory management system.

Return ONLY this format.

Detected Objects:
Estimated Quantity:
Condition:
Recommendation:

Rules:
- Count visible objects.
- Describe their condition.
- Recommendation should be one sentence.
- No markdown.
`;
        break;

      default:
        prompt = `
Describe this image briefly.
`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: image,
          },
        },
        {
          text: prompt,
        },
      ],
    });

    const result = response.text || "VisionAI could not analyze the image.";

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Gemini Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
