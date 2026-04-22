export default async function handler(req, res) {
  const { user_prompt } = req.body;
  const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${process.env.GROQ_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'llama3-70b-8192',
      messages: [{role:'system',content:'แต่ง prompt แฟชั่นรันเวย์ให้ละเอียด'},{role:'user',content:user_prompt}]
    })
  });
  const d = await r.json();
  res.json({ enhanced_prompt: d.choices[0].message.content });
}