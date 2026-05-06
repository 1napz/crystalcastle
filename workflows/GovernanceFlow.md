# CrystalCastle Governance Flow / กระบวนการกำกับดูแล CrystalCastle

This diagram illustrates the governance enforcement process for every PR.  
แผนภาพนี้แสดงกระบวนการบังคับใช้กฎระเบียบสำหรับทุก PR

---

## 📊 ASCII Flow Diagram / แผนภาพ ASCII

```plaintext
Contributor / ผู้ส่ง PR
       │
       ▼
Open Pull Request (PR) / เปิด PR
       │
       ▼
Auto-comment bot posts bilingual checklist / Bot แสดงเช็คลิสต์สองภาษา
       │
       ▼
Reviewer Checklist Enforcement / การบังคับใช้เช็คลิสต์ Reviewer
   ├── Verify `.vercelignore` exists
   ├── Confirm Copilot CLI setup
   ├── Test mock mode (`npm run dev:mock`)
   ├── Ensure `/api/` routes lightweight
   ├── Supabase RLS + `groq_logs` verified
   └── Vercel quota checked
       │
       ▼
CI/CD Workflow (GitHub Actions) / กระบวนการ CI/CD
   ├── Lint & Test
   ├── Build Project
   ├── Validate `.vercelignore`
   └── Deploy with `--archive=tgz`
       │
       ▼
Governance Enforcement / การบังคับใช้กฎระเบียบ
   ├── PR size limits checked
   ├── Branch naming rules enforced
   └── Minimum 2 reviewers required
       │
       ▼
Final Approval & Merge / อนุมัติและ Merge สุดท้าย ✅
       │
       ▼
Deploy to Vercel (Production) / Deploy ไปยัง Vercel (Production)