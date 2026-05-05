`markdown

📌 Pull Request Template – CrystalCastle

📝 Summary
โปรดอธิบายว่า PR นี้ทำอะไร (Describe the purpose):
- ปัญหาที่แก้ไข / ฟีเจอร์ที่เพิ่ม
- เหตุผลที่ต้องทำการเปลี่ยนแปลงนี้

---

🔄 Changes
- รายการสิ่งที่เปลี่ยนแปลง (ไฟล์, configs, features)
- ใช้ bullet points เพื่อให้ reviewer อ่านง่าย

---

✅ Impact
- ผลกระทบต่อระบบ (CI/CD, Deployment, Security, Governance)
- มี Breaking Changes หรือไม่

---

🧪 Testing
วิธีตรวจสอบการทำงาน:
- [ ] Unit tests ผ่านทั้งหมด
- [ ] Integration tests ผ่าน
- [ ] Manual test บน local ผ่าน

---

📖 Documentation
- [ ] อัปเดต docs/ หรือ README.md ถ้ามีการเปลี่ยนแปลงที่เกี่ยวข้อง
- [ ] เพิ่มตัวอย่างการใช้งานใหม่ (ถ้ามี)

---

🔒 Security & CI/CD
- [ ] ตรวจสอบว่าไม่มี secret หรือ credential หลุดเข้ามา
- [ ] CI/CD checks ผ่านทั้งหมด (lint, build, test, security)

---

🔗 Linked Issues
- Closes #ISSUE_ID  
- Milestone: (ถ้ามี)

---

👥 Reviewers
- Reviewer ที่เกี่ยวข้อง (CODEOWNERS จะ assign อัตโนมัติ)
- ต้องมี reviewer อย่างน้อย 1 คนอนุมัติ

---

👀 Reviewer Notes
- จุดที่ reviewer ควรโฟกัสเป็นพิเศษ
- ข้อควรระวังหรือ dependency ที่เกี่ยวข้อง

---

🛡️ Notes
- ตรวจสอบว่า secrets ถูกจัดการผ่าน environment variables เท่านั้น
- ห้าม commit ไฟล์ .env.local
`

---

✅ จุดเด่นของเวอร์ชันนี้
- รวม Linked Issues → ใช้ Closes #... เพื่อปิด Issue อัตโนมัติ  
- มี Checklist ครบทั้ง CI/CD, Security, Docs, Testing  
- Reviewer มี section สำหรับ notes → governance ชัดเจน  
- Bilingual → contributor ไทย/อังกฤษเข้าใจตรงกัน  

---
