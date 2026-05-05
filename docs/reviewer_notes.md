# 📋 Reviewer Checklist (CrystalCastle)

## 🔹 Governance / Repo Hygiene
- [ ] **PR Template filled** → Purpose, Changes, Impact, Testing, Linked Issues ครบถ้วน  
- [ ] **Branch naming** → follows convention (`feature/`, `fix/`, `docs/`)  
- [ ] **Commit messages** → clear, scoped, no multiple topics in one commit  

---

## 🔹 Quality Assurance
- [ ] **CI/CD status** → ✅ Passed (lint, test, build, privacy, security)  
- [ ] **Coverage ≥ 80%** → check coverage report  
- [ ] **Artifacts uploaded** → reviewer can access coverage/test logs  

---

## 🔹 Security & Privacy
- [ ] **Privacy check passed** → no violations in `privacy.yml`  
- [ ] **CodeQL scan passed** → no critical/high vulnerabilities  

---

## 🔹 Technical Review
- [ ] **Code style** → consistent with ESLint/Prettier rules  
- [ ] **API/workflow changes** → covered by tests  
- [ ] **Backward compatibility** → no breaking changes  

---

## 🔹 Decision
- [ ] **Approve** → if all checklist items passed  
- [ ] **Request changes** → if CI/CD fail or checklist incomplete  
- [ ] **Close PR** → if stale, duplicate, or not relevant  

---

## 📝 ภาษาไทย (Thai Version)

### 🔹 การกำกับดูแล / Repo Hygiene
- [ ] **PR Template กรอกครบถ้วน** → จุดประสงค์, การเปลี่ยนแปลง, ผลกระทบ, การทดสอบ, Issue ที่เกี่ยวข้อง  
- [ ] **การตั้งชื่อ Branch** → ตาม convention (`feature/`, `fix/`, `docs/`)  
- [ ] **Commit messages** → ชัดเจน, ไม่รวมหลายเรื่องใน commit เดียว  

---

### 🔹 การตรวจสอบคุณภาพ
- [ ] **CI/CD status** → ✅ ผ่านทั้งหมด (lint, test, build, privacy, security)  
- [ ] **Coverage ≥ 80%** → ตรวจจาก coverage report  
- [ ] **Artifacts uploaded** → reviewer สามารถเข้าถึง coverage/test logs  

---

### 🔹 ความปลอดภัยและความเป็นส่วนตัว
- [ ] **Privacy check ผ่าน** → ไม่มีการละเมิด `privacy.yml`  
- [ ] **CodeQL scan ผ่าน** → ไม่มี critical/high vulnerabilities  

---

### 🔹 การตรวจสอบทางเทคนิค
- [ ] **Code style** → consistent ตาม ESLint/Prettier rules  
- [ ] **API/workflow changes** → มี test ครอบคลุม  
- [ ] **Backward compatibility** → ไม่ทำให้ระบบเดิมพัง  

---

### 🔹 การตัดสินใจ
- [ ] **Approve** → ถ้า checklist ผ่านทั้งหมด  
- [ ] **Request changes** → ถ้า CI/CD fail หรือ checklist ไม่ครบ  
- [ ] **Close PR** → ถ้า stale, duplicate, หรือไม่ relevant
