export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { user_prompt, category } = req.body;

  try {
    // ตรวจสอบว่ามี API key หรือไม่
    if (!process.env.GROQ_API_KEY) {
      // ถ้าไม่มี key ให้ใช้ fallback
      return res.status(200).json({ 
        enhanced_prompt: `${user_prompt} (AI-enhanced: เพิ่มแสงสวย มุม cinematic)` 
      });
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ 
          role: 'user', 
          content: `ช่วย Enhance prompt การทำวิดีโอแฟชั่นนี้ให้ดีขึ้น (เพิ่มแสง, การเคลื่อนกล้อง, อารมณ์) โดยคงความหมายเดิม: ${user_prompt}` 
        }],
        temperature: 0.7
      })
    });

    const data = await response.json();
    const enhanced = data.choices?.[0]?.message?.content || user_prompt;
    res.status(200).json({ enhanced_prompt: enhanced });
  } catch (error) {
    console.error('Prompt error:', error);
    res.status(200).json({ enhanced_prompt: user_prompt });
  }
}