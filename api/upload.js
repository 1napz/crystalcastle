export default async function handler(req, res) {
  // อนุญาต CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // แม้จะไม่มี Supabase จริง ให้ return URL ตัวอย่างไปก่อน (ไม่ error 500)
  const fakeImageUrl = `https://picsum.photos/id/1/800/600?random=${Date.now()}`;
  
  return res.status(200).json({ 
    url: fakeImageUrl,
    note: 'This is a demo image. Configure Supabase or Cloudinary for production.'
  });
}