`markdown

🤖 AI Instructions — CrystalCastle

🧠 Scope
ครอบคลุม AI-related logic ทั้งหมด:
- Prompt engineering
- Caption generation
- Script generation
- Video/slideshow pipeline
- Automation workflows
- Model quota guardrails

🎯 Objective
สร้าง short-form content ที่มี conversion สูงสำหรับ Social Commerce:
- Platforms: TikTok, Shopee, Instagram Reels
- KPI:
  - CTR ≥ 5%
  - Watch time ≥ 10s
  - Conversion uplift ≥ 15%

Content ต้อง:
- ดึงดูดใน 3 วินาทีแรก
- กระชับและชัดเจน
- Optimized for CTR + Sales

🪄 Core Pipeline

Input
`json
{
  "imageUrl": "string",
  "productName": "optional",
  "targetAudience": "optional",
  "tone": "optional"
}
`

Processing
1. Validate input (image URL, productName)
2. Generate caption → script → storyboard
3. Render video/slideshow pipeline
4. Return output JSON

Output
`json
{
  "caption": "string",
  "script": "string",
  "videoUrl": "string",
  "metrics": {
    "estimatedCTR": "float",
    "estimatedWatchTime": "float"
  }
}
`

✅ Testing & Validation
- Run unit tests: npm run test:ai
- QA checklist:
  - Prompt returns valid caption ≤ 100 chars
  - Script matches productName
  - Video renders without error
  - Metrics object present in output

🛠 Troubleshooting
- Model timeout → ตรวจสอบ GPU quota
- Invalid prompt → ตรวจสอบ input JSON fields
- Quota exceeded → ตรวจสอบ API key limits
- Empty output → Debug pipeline logs

📋 Governance Notes
- Reviewer ต้องตรวจสอบว่า:
  - ไม่มี hardcoded secrets
  - Prompt engineering follows style guide
  - Test coverage ≥ 80%
- ใช้ ESLint + Prettier ตาม repo standard

🗓 Changelog
- 2026-05-06: เพิ่ม Output format + QA checklist
- 2026-05-05: Initial draft
`

---