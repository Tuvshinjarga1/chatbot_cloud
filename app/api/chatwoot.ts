// pages/api/chatwoot.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const SYSTEM_PROMPT =
  "Чи туслах chatbot. Асуултад товч, ойлгомжтой хариул. Монгол хэл ашигла.";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const userInput = req.body.content;

    // ✅ AI API-д илгээж хариу авах (доорх AI-г 2-р хэсэгт тайлбарласан)
    const aiResponse = await generateAIResponse(userInput);

    return res.status(200).json({
      content: aiResponse,
    });
  } catch (error: any) {
    console.error("Webhook Error:", error);
    return res.status(500).json({ content: "Уучлаарай, алдаа гарлаа." });
  }
}

// ✅ AI хариу үүсгэх функц
async function generateAIResponse(userInput: string): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY; // эсвэл өөр LLM түлхүүр

  const payload = {
    model: "gpt-3.5-turbo", // эсвэл "openai/gpt-3.5-turbo"
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userInput },
    ],
  };

  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    payload,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.choices[0].message.content;
}
