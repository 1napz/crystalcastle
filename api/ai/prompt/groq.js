// /api/ai/prompt/groq.js
export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method!== 'POST') {
    return res.status(405).json({ error: 'Use POST' });
  }

  try {
    const { user_prompt, category } = req.body;

    if (!user_prompt) {
      return res.status(400).json({ error: 'ต้องส่ง user_prompt' });
    }

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({
        error: 'ยังไม่ได้ตั้ง GROQ_API_KEY ใน Vercel'
      });
    }

    const systemPrompt = `You are a fashion video prompt engineer.
Expand this into a detailed 5-second runway video prompt.
Category: ${category || 'fashion'}
Include: camera movement, lighting, fabric detail, model walk.
Output only the prompt, no quotes.`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: user_prompt }
        ],
        temperature: 0.8,
        max_tokens: 180
      })
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Groq error: ${err}`);
    }

    const data = await response.json();
    const enhanced = data.choices[0]?.message?.content?.trim();

    return res.status(200).json({
      success: true,
      original: user_prompt,
      enhanced_prompt: enhanced
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message,
      fallback: true
    });
  }
}