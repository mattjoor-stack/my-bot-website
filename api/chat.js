import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages are required and must be an array' });
    }

    // הנה השינוי: שינינו את ההנחיה של הבוט לענות באנגלית בלבד
    const systemMessage = {
      role: 'system',
      content: 'You are a smart digital assistant on Matt\'s website. Always respond in English, in a polite and helpful manner.'
    };

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [systemMessage, ...messages],
    });

    const reply = completion.choices[0].message.content;
    res.status(200).json({ reply });

  } catch (error) {
    console.error('OpenAI Error:', error);
    res.status(500).json({ error: 'Failed to fetch AI response' });
  }
}