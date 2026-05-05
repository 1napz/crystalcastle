`markdown

📋 Pull Request Description

🔹 Purpose
<!-- อธิบายว่าทำไมถึงต้องเปิด PR นี้ -->

🔹 Changes
<!-- สรุปการเปลี่ยนแปลงหลัก เช่น เพิ่มไฟล์, แก้ไข workflow -->

🔹 Impact
<!-- อธิบายผลกระทบต่อระบบ เช่น CI/CD, security, deployment -->

🔹 Testing
<!-- วิธีทดสอบ เช่น npm run test, integration test -->

🔹 Linked Issues
Closes #ISSUE_ID

---

👀 Reviewer Checklist – CrystalCastle (PR เพิ่มไฟล์ใหม่)

🔹 Governance
- [ ] มี PR Description ครบถ้วน (Purpose, Changes, Impact, Testing, Linked Issues)
- [ ] มีการเชื่อมโยงกับ Issue (Closes #...)
- [ ] Reviewer ถูก assign ตาม CODEOWNERS

🔹 File & Repo Hygiene
- [ ] ไฟล์ใหม่อยู่ในโครงสร้าง repo ที่ถูกต้อง
- [ ] ไม่มีการ commit ไฟล์ที่ไม่เกี่ยวข้อง เช่น .env.local, package-lock.json
- [ ] มีการอัปเดต docs/ หรือ README.md

🔹 Code Quality
- [ ] โค้ดอ่านง่าย
- [ ] ไม่มี hard-coded secrets
- [ ] ESLint/Prettier ผ่าน

🔹 Testing
- [ ] มี test coverage สำหรับไฟล์ใหม่
- [ ] Unit/Integration tests ผ่าน
- [ ] Manual test บน local ผ่าน

🔹 CI/CD & Deployment
- [ ] Workflow รันผ่านทั้งหมด
- [ ] ไม่มี error จาก Vercel deploy
- [ ] Artifact checks ผ่านครบ
`

---