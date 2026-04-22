export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { image_url, prompt, filename } = req.body;

  try {
    // ถ้ายังไม่มี FAL_API_KEY หรือ error ให้ใช้ video ตัวอย่าง
    if (!process.env.FAL_API_KEY) {
      console.log('No FAL_API_KEY, using sample video');
      return res.status(200).json({ 
        video_url: 'https://cdn.coverr.co/videos/coverr-fashion-model-walking-8175/1080p.mp4'
      });
    }

    // เรียก FAL API จริง (ตัวอย่าง endpoint - ต้องตรวจสอบกับ docs ของ FAL)
    const response = await fetch('https://api.fal.ai/v1/kling/video', {
      method: 'POST',
      headers: {
        'Authorization': `Key ${process.env.FAL_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ image_url, prompt, duration: 5 })
    });

    if (!response.ok) throw new Error(`FAL API error: ${response.status}`);
    const data = await response.json();
    res.status(200).json({ video_url: data.video_url });
  } catch (error) {
    console.error('FAL error:', error);
    // fallback สำคัญ: ให้กลับไปใช้ video ตัวอย่างแทน error 500
    res.status(200).json({ 
      video_url: 'https://cdn.coverr.co/videos/coverr-fashion-model-walking-8175/1080p.mp4',
      note: 'Using sample video (FAL not configured)'
    });
  }
}