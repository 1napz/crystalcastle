# 📌 Pull Request: Merge i18n.js → product.js

## 📝 Summary
- ย้าย Logic ทั้งหมดจาก `i18n.js` ไปไว้ที่ส่วนบนสุดของ `product.js`
- ลบการเรียก `<script src="i18n.js">` ออกจาก HTML
- รวม i18n และ Product Logic ไว้ในไฟล์เดียวเพื่อความง่ายในการ Maintain

---

## ✅ QA Checklist

### 🔴 Migration Steps
- [ ] คัดลอก Logic ทั้งหมดจาก `i18n.js` → วางใน `product.js`
- [ ] ตรวจสอบตัวแปรซ้ำ (`translations`, `currentLang`) → รวมเป็นตัวเดียว

### 🟠 HTML Integration
- [ ] ID/Selector ตรงกับ `product.html` (`langSelect`, `title`, `generateBtn`, `artifactLink`)
- [ ] ลบ `<script src="i18n.js">` ออกจาก HTML

### 🟡 Product Logic
- [ ] `generateProduct()` และ `saveToLocalStorage()` ทำงานได้ตามเดิม
- [ ] ชื่อไฟล์ที่ Gen ตรงกับ Format `YYYYMMDD-Category-Brand`

### 🟢 i18n Test
- [ ] ค่า Default เป็นภาษาไทย
- [ ] เปลี่ยนเป็น `en` → UI เป็นภาษาอังกฤษ
- [ ] กลับมาเลือก `th` → UI กลับเป็นภาษาไทย

### 🔵 Deployment
- [ ] Vercel Build ผ่าน
- [ ] Console ไม่มี Error เกี่ยวกับ i18n หรือ Selector

---

## 🚀 Next Steps
- QA Team ตรวจสอบภาษาและการ Generate Artifact
- Reviewer ยืนยัน Checklist ก่อน Approve