// api/video.js - ใช้ fallback sample video
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Return sample video (ไม่ error 404 หรือ 500)
  return res.status(200).json({ 
    video_url: 'https://cdn.coverr.co/videos/coverr-fashion-model-walking-8175/1080p.mp4',
    note: 'Sample video - Configure FAL API key for real generation.'
  });
}