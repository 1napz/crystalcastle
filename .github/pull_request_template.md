# Pull Request Template

## 📌 Summary
- Describe the purpose of this PR
- Link related issues or discussions

---

## ✅ Reviewer Checklist (Auto-Enforced)
Reviewers must confirm all items before approving:

- [ ] `.env.local` contains valid Supabase keys (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
- [ ] `GROQ_API_KEY` and `GEMINI_API_KEY` are set
- [ ] At least one video key (`FAL_KEY` or `MAGIC_HOUR_API_KEY`) is configured
- [ ] `npm run dev:mock` runs successfully
- [ ] Supabase RLS policies and `groq_logs` table verified
- [ ] Vercel environment variables mirror `.env.local`
- [ ] Functions logs checked post-deploy

---

## 📝 Notes
- Add screenshots or logs if relevant
- Mention any governance enforcement changes
- Confirm reviewer checklist compliance

---

⚠️ **PRs missing checklist confirmation will not be merged.**