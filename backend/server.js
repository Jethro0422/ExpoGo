import { GoogleGenAI } from "@google/genai";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "20mb" }));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "VisionAI Backend Running",
  });
});

app.post("/analyze", async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "No image received.",
      });
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
          text: `
You are VisionAI.

Analyze the uploaded image.

Return ONLY this format.

Object:
Category:
Confidence:
Description:
Recommendation:

Rules:
- Confidence should be 0-100%.
- Description must be 2-3 sentences only.
- Recommendation must be one sentence.
- Do not use markdown.
- Do not add introductions or conclusions.
`,
        },
      ],
    });

    res.json({
      success: true,
      result: response.text,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
