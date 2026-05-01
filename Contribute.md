# Contributor Onboarding – Crystal Castle (Advanced Mode)

## ✅ Checklist
1. **Clone Repo**
   - Run `./setup.sh` (อ่าน config จาก `setup-config/clone.yml`)
   - ถ้ามีไฟล์ `Performance.md.gpg` → จะถูกถอดรหัสอัตโนมัติ

2. **Create Branch**
   - ใช้ชื่อ branch ตาม pattern: `feature/<short-description>` หรือ `fix/<short-description>`

3. **Make Changes**
   - ปรับปรุงโค้ด, docs, หรือ config ตามที่ต้องการ
   - ตรวจสอบว่าไม่มี unsafe link หรือ secret รั่ว

4. **Run Local Validation**
   - `npm run lint`
   - `npm run test`
   - ตรวจสอบ schema ด้วย `yamllint` หรือ `jsonschema`

5. **Commit & Push**
   - ใช้ commit message ที่ชัดเจน เช่น `feat: add video logging`
   - Push ไปยัง branch ของคุณ

6. **Open Pull Request**
   - Target → `main`
   - ต้องมี review จาก **@1napz** และ **@supabase**

7. **CI/CD Validation**
   - Workflow จะรัน build, lint, tests, security scan
   - ถ้าไม่ผ่าน → PR จะถูก block

8. **Merge**
   - เมื่อผ่านทุก validation และ review → merge เข้าสู่ `main`

---

## 🔎 Visual Flow

```mermaid
flowchart TD
    A[Clone Repo via setup.sh] --> B[Create Feature Branch]
    B --> C[Make Changes]
    C --> D[Run Local Validation]
    D --> E[Commit & Push]
    E --> F[Open Pull Request]
    F --> G[CI/CD Workflow Validation]
    G --> H{Validation Passed?}
    H -->|Yes| I[Review by Owners]
    H -->|No| J[Fix Issues & Retry]
    I --> K{Approved by 1napz + Supabase?}
    K -->|Yes| L[Merge to Main]
    K -->|No| M[Wait for Review]
    L --> N[Release Workflow Triggered]