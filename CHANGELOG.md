# 📜 Changelog – Crystal Castle

รูปแบบอ้างอิงจาก [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) และ [Semantic Versioning](https://semver.org/).

---

## [Unreleased]

### Added
- ยังไม่มีการเพิ่มฟีเจอร์ใหม่ในเวอร์ชันนี้

### Changed
- ยังไม่มีการเปลี่ยนแปลงในเวอร์ชันนี้

### Fixed
- ยังไม่มีการแก้ไขข้อบกพร่องในเวอร์ชันนี้

### Removed
- ยังไม่มีการลบฟีเจอร์ใด ๆ ในเวอร์ชันนี้

---

## [1.6.0] - 2026-04-28
... (ตามที่คุณมีอยู่แล้ว)

---

## [1.5.0] - 2026-04-26
... (ตามที่คุณมีอยู่แล้ว)

---

## [1.4.0] - Earlier
... (ตามที่คุณมีอยู่แล้ว)

---

## [1.0.0] - 2026-05-05
### 🚀 Added
- เปิดตัว **Studio UI** (`index.html`) เป็นหน้าแรกของ GitHub Pages
- ย้ายเนื้อหา `product.html` → `index.html`
- เพิ่มโครงสร้างโค้ดแบบ **modular** (`engines.js`, `supabase.js`, `ui.js`)
- เชื่อมโยงกับ **Supabase** สำหรับการบันทึก logs และ action
- รองรับหลาย video engines (FAL, Magic Hour, RunwayML, Pika, Nexa, Wavespeed)
- เพิ่ม **Documentation Hub (`doc/index.md`)**

### 🔒 Security & Privacy
- เพิ่ม **privacy.yml** และ **security.yml** สำหรับ CI/CD enforcement
- ห้าม commit `.env.local` หรือ API keys จริงลง GitHub
- ใช้ GitHub Secrets / Vercel Dashboard สำหรับ environment variables

### 🛠 Developer Experience
- เพิ่ม **Mock Mode** สำหรับการทดสอบใน dev environment
- เพิ่ม CI/CD workflow (`ci.yml`) → lint, test, build, privacy-check, security-scan

---

## 🔗 Compare Links
[Unreleased]: https://github.com/1napz/crystalcastle/compare/v1.6.0...HEAD  
[1.6.0]: https://github.com/1napz/crystalcastle/compare/v1.5.0...v1.6.0  
[1.5.0]: https://github.com/1napz/crystalcastle/compare/v1.4.0...v1.5.0  
[1.4.0]: https://github.com/1napz/crystalcastle/releases/tag/v1.4.0  
[1.0.0]: https://github.com/1napz/crystalcastle/releases/tag/v1.0.0