
`markdown

🏰 CrystalCastle Repository Overview

📌 Purpose / วัตถุประสงค์
English:  
This document provides an overview of the CrystalCastle repository structure, governance rules, and artifact placement for contributors and reviewers.  
ไทย:  
เอกสารนี้อธิบายโครงสร้างไฟล์ของ CrystalCastle กฎการจัดการ และตำแหน่งของ artifacts สำหรับ contributor และ reviewer  

---

📂 Repository Structure / โครงสร้างไฟล์

`
crystalcastle/
├── README.md                  # Overview & quick links / ภาพรวมและลิงก์สำคัญ
├── CONTRIBUTING.md            # Contributor guidelines / แนวทางสำหรับผู้ร่วมพัฒนา
├── .gitignore                 # Ignore rules / กฎการละเว้นไฟล์
├── .env.example               # Environment variables template / ตัวอย่างไฟล์ environment
│
├── .github/
│   ├── workflows/             # CI/CD pipelines / ไฟล์ workflow สำหรับ CI/CD
│   │   ├── security-scan.yml
│   │   ├── vercel-deploy.yml
│   │   └── frontend-build.yml
│   └── instructions/          # Governance & reviewer docs / เอกสารกำกับดูแลและ reviewer
│       ├── ai.instructions.md
│       ├── api.instructions.md
│       ├── frontend.instructions.md
│       └── governance.md
│
├── docs/                      # Documentation artifacts / เอกสารประกอบ
│   ├── repo-overview.md
│   ├── knowledge-management-org.md
│   ├── knowledge-management-repo.md
│   ├── passkey-authentication.md
│   ├── environment-variables.md
│   └── telegram-alerts.md
│
├── tests/                     # Unit & integration tests / การทดสอบ
│   └── generate-videos.test.js
│
├── frontend/                  # UI/UX code / โค้ดส่วนติดต่อผู้ใช้
│   └── (React/Vue/Next.js files)
│
├── archive/                   # Deprecated artifacts / ไฟล์ที่เลิกใช้งานแล้ว
│   ├── old-workflows.md
│   └── legacy-api.md
`

---

✅ Governance Rules / กฎการจัดการ
English:  
- All PRs must update docs/ if APIs or workflows change.  
- Deprecated files must be moved to archive/.  
- Reviewer instructions must be placed in .github/instructions/.  
- Tests must cover critical APIs and workflows.  

ไทย:  
- ทุก PR ต้องอัปเดต docs/ หากมีการเปลี่ยน API หรือ workflow  
- ไฟล์ที่เลิกใช้งานต้องย้ายไปที่ archive/  
- เอกสารสำหรับ reviewer ต้องอยู่ใน .github/instructions/  
- การทดสอบต้องครอบคลุม API และ workflow ที่สำคัญ  

---

📎 Notes / หมายเหตุ
English:  
This structure enforces repo hygiene, reduces PR backlog, and ensures governance compliance.  
ไทย:  
โครงสร้างนี้ช่วยรักษาความเป็นระเบียบของ repo ลด PR backlog และทำให้การกำกับดูแลเป็นไปตามมาตรฐาน
`

---

📌 สรุป:  
ไฟล์นี้จะเป็น artifact กลางสำหรับ onboarding และ reviewer training → contributor และ reviewer เข้าใจโครงสร้าง CrystalCastle ได้ทันที  

คุณอยากให้ผมช่วยทำ diagram bilingual (tree view + explanation) เพิ่มเข้าไปในไฟล์นี้เลยไหมครับ จะได้เห็นภาพโครงสร้าง repo ชัดเจนขึ้น