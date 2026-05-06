`markdown

📋 Pull Request Description

🔹 Purpose
<!-- อธิบายว่าทำไมถึงต้องเพิ่ม workflow นี้ -->

🔹 Changes
<!-- สรุปการเปลี่ยนแปลง เช่น เพิ่มไฟล์ .yml, ปรับ CI/CD -->

🔹 Impact
<!-- อธิบายผลกระทบต่อระบบ เช่น auto-merge, deploy, security -->

🔹 Testing
<!-- วิธีทดสอบ workflow เช่น run บน branch, ตรวจ logs -->

🔹 Linked Issues
Closes #ISSUE_ID

---

👀 Reviewer Checklist – CrystalCastle (PR เพิ่ม Workflow ใหม่)

🔹 Governance
- [ ] มี PR Description ครบถ้วน (Purpose, Changes, Impact, Testing, Linked Issues)
- [ ] มีการเชื่อมโยงกับ Issue (Closes #...)
- [ ] Reviewer ถูก assign ตาม CODEOWNERS
- [ ] มีการอธิบายว่า workflow ใหม่ใช้ทำอะไร

🔹 File & Repo Hygiene
- [ ] Workflow ถูกเพิ่มใน .github/workflows/ เท่านั้น
- [ ] ไม่มีการ commit ไฟล์ที่ไม่เกี่ยวข้อง เช่น .env.local, package-lock.json
- [ ] มีการอัปเดต docs/ หรือ README.md เพื่ออธิบาย workflow ใหม่

🔹 Workflow Quality
- [ ] ใช้ชื่อไฟล์และชื่อ workflow ที่สื่อความหมาย
- [ ] มีการกำหนด on: trigger ที่ถูกต้อง
- [ ] มีการกำหนด jobs: และ steps: ครบถ้วน
- [ ] ไม่มี hard-coded secrets → ใช้ GitHub Secrets แทน

🔹 Testing & Validation
- [ ] Workflow รันผ่านใน GitHub Actions (ไม่มี error)
- [ ] มีการทดสอบ workflow บน branch ก่อน merge เข้าสู่ main
- [ ] Reviewer ตรวจสอบว่า workflow ไม่กระทบ CI/CD pipeline เดิม

🔹 CI/CD & Deployment
- [ ] Workflow ใหม่ไม่ทำให้ Vercel deploy ล้มเหลว
- [ ] ถ้า quota Vercel เกิน → reviewer ต้องแจ้ง contributor ว่าต้องรอ reset หรือ upgrade plan
- [ ] Artifact checks ผ่านครบ
`

---