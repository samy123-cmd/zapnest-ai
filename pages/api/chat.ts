// pages/api/chat.ts
import { OpenAI } from 'openai';
import { NextApiRequest, NextApiResponse } from 'next';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.7,
    });
    res.status(200).json({ 
      role: "assistant", 
      content: completion.choices[0]?.message?.content || "No response" 
    });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: "AI service unavailable" });
  }
}
