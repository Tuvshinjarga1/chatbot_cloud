// app/api/chatwoot/route.ts
import { NextRequest } from "next/server";
import axios from "axios";

const SYSTEM_PROMPT =
  "Чи туслах chatbot. Хэрэглэгчийн асуултад товч, ойлгомжтой, монгол хэлээр хариул.";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userMessage = body.content;

    const aiResponse = await generateAIResponse(userMessage);

    return new Response(JSON.stringify({ content: aiResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Webhook алдаа:", err);
    return new Response(
      JSON.stringify({ content: "Алдаа гарлаа. Дахин оролдоно уу." }),
      { status: 500 }
    );
  }
}

async function generateAIResponse(userInput: string): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;

  const payload = {
    model: "gpt-3.5-turbo",
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
