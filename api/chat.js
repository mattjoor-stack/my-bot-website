import { OpenAI } from 'openai';

export default async function handler(req, res) {
    // 1. הגנה: מאפשרים רק לקוד מהאתר שלנו לשלוח הודעות (בשיטת POST)
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // 2. קריאת ההודעה שהמשתמש הקליד בצ'אט
        const { message } = req.body;

        // 3. התחברות ל-OpenAI באמצעות המפתח הסודי מהכספת של Vercel
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        // 4. שליחת השאלה לבינה המלאכותית וקבלת תשובה
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini', // מודל מהיר וזול שמתאים בול לצ'אט
            messages: [{ role: 'user', content: message }],
        });

        // 5. החזרת התשובה החכמה חזרה לדפדפן של הגולש
        const reply = response.choices[0].message.content;
        return res.status(200).json({ reply });

    } catch (error) {
        // 6. תוכנית הגיבוי: אם משהו נכשל (למשל בעיית חיבור), נחזיר שגיאה מסודרת
        console.error(error);
        return res.status(500).json({ reply: 'תודה על הודעתך! המערכת כרגע בבנייה, בקרוב אענה לך בצורה חכמה.' });
    }
}