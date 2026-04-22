export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { filename, prompt, brand, category } = req.body;

  try {
    if (!process.env.GROQ_API_KEY) {
      return res.status(200).json({ 
        post: `🔥 ${brand || 'สินค้า'} สวยโดนใจ! พร้อมส่งตรงจาก Crystal Castle\n\n#CrystalCastle #${category || 'แฟชั่น'} #AIvideo` 
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
          content: `เขียนแคปชั่น TikTok สั้น ๆ น่าสนใจ (1-2 ประโยค + hashtags 3-5 อัน) สำหรับวิดีโอแฟชั่นของแบรนด์ ${brand || 'สินค้า'} หมวด ${category || 'แฟชั่น'} โดยมี prompt ว่า: ${prompt}` 
        }],
        temperature: 0.7
      })
    });

    const data = await response.json();
    const post = data.choices?.[0]?.message?.content || `✨ ${brand} มาแรง! #CrystalCastle`;
    res.status(200).json({ post });
  } catch (error) {
    console.error('Post error:', error);
    res.status(200).json({ post: `✨ ${brand} สวยงามด้วย AI #CrystalCastle` });
  }
}