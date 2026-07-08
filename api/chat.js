import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // השרת מקבל כעת את מערך ההודעות המלא (כל ההיסטוריה) מהאתר
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages are required and must be an array' });
    }

    // הגדרת האופי הבסיסי של הבוט (כרגע כללי, נשנה אותו בהמשך לפי העסק שלך)
    const systemMessage = {
      role: 'system',
      content: 'אתה עוזר דיגיטלי חכם באתר של Matt. ענה תמיד בעברית, בצורה אדיבה ויעילה.'
    };

    // אנחנו מחברים את האופי של הבוט יחד עם כל היסטוריית השיחה שנשלחה מהאתר
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