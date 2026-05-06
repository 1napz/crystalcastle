# CrystalCastle Reviewer Checklist / เช็คลิสต์สำหรับผู้ตรวจสอบ

## 🔧 Environment Setup / การตั้งค่า Environment
- [ ] `.env.local` contains valid `NEXT_PUBLIC_SUPABASE_URL` และ `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `GROQ_API_KEY` is present and valid
- [ ] `GEMINI_API_KEY` is set (fallback AI)
- [ ] At least one video key (`FAL_KEY` หรือ `MAGIC_HOUR_API_KEY`) is configured
- [ ] Run `npm run dev:mock` successfully (UI works without real APIs)

## 📊 Supabase / Supabase
- [ ] RLS policies are correctly applied
- [ ] `groq_logs` table exists and is accessible
- [ ] Supabase project URL and anon key match dashboard values

## 🤖 AI Providers / ผู้ให้บริการ AI
- [ ] Groq API responds without error (check `/api/groq`)
- [ ] Gemini fallback works if Groq fails
- [ ] Logs are visible in Supabase `groq_logs`

## 🎬 Video Generation / การสร้างวิดีโอ
- [ ] FAL or Magic Hour API key is active
- [ ] Video generation tested via `/api/video`

## 🚀 Deployment / การ Deploy
- [ ] Environment variables mirrored in Vercel project settings
- [ ] Functions logs checked for errors post-deploy
- [ ] Dark mode persistence verified via localStorage

---

✅ **Reviewers must confirm all items before approving PRs.**  
ผู้ตรวจสอบต้องยืนยันทุกข้อก่อนอนุมัติ PR