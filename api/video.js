export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // คืนค่า Sample Video
    const sampleVideo = 'https://cdn.coverr.co/videos/coverr-fashion-model-walking-8175/1080p.mp4';
    
    return res.status(200).json({ 
      success: true,
      video_url: sampleVideo,
      message: 'Video demo mode (no actual AI generation)'
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}