## 💎 Crystal Castle Lite v1.4

**เครื่องเจียระไน Lite** — อัปโหลดรูปสินค้า → AI เขียน Prompt → สร้างวิดีโอ → ได้แคปชันอัตโนมัติ

Live: https://crystalcastle-pi.vercel.app/index.html  
Mission Control: https://5-1napzs-projects.vercel.app (Realtime Status)

## 🚀 มีอะไรใหม่ใน v1.4
- ✅ **UI มือถือแก้แล้ว** – textarea ไม่บังปุ่มด้านล่าง
- ✅ **Gen Prompt ด้วย Groq (Llama 3.3 70B)** – เร็ว 2–3 วินาที
- ✅ **Generate Post อัตโนมัติ** – แคปชันภาษาไทย + hashtag พร้อมโพสต์
- ✅ **2 Engines**: FAL Kling (เร็วกว่า 1.8 เท่า) / Magic Hour (ทดลองฟรี)
- ✅ **ตั้งชื่อไฟล์อัตโนมัติ** – รูปแบบ `YYYYMMDD-Category-Brand`
- ✅ **Mission Control v1.0** – ดูสถานะแบบเรียลไทม์
- ✅ **Telegram Alerts** – แจ้งทันทีเมื่อ key หลุด, deploy ล้มเหลว, หรือ API error 500
- 🆕 **ย้ายไป Supabase v2** – ใช้ Publishable Key ปลอดภัย ใส่หน้าเว็บได้
- 🆕 **Realtime แทน Polling** – รับสถานะงานแบบทันที ไม่ต้องรีเฟรช

## 📖 วิธีใช้
### 1. เตรียมรูป
ตั้งชื่อไฟล์: `YYYYMMDD-Category-Brand.jpg` เช่น `20260422-Bag-Gucci.jpg`

### 2. เข้าเครื่องเจียระไน
1. อัปโหลดรูป → กด "✨ Gen Prompt"
2. AI จะสร้าง prompt วิดีโอให้ 5 แบบ
3. เลือก Engine → กด Generate

### 3. รับวิดีโอ + แคปชัน
ระบบจะสร้างวิดีโอ 5 วินาที และสร้างแคปชันให้อัตโนมัติ

## ⚙️ ติดตั้ง
### 1. Clone
```bash
git clone https://github.com/1napz/crystalcastle.git
cd crystalcastle
```

### 2. ตั้งค่า Environment Variables (บน Vercel)
ไปที่ Vercel → Settings → Environment Variables

| Variable | ใช้ทำอะไร |
| --- | --- |
| `GROQ_API_KEY` | สร้าง Prompt |
| `FAL_KEY` | เรียก FAL Kling |
| `MAGIC_HOUR_API_KEY` | เรียก Magic Hour |
| `NEXT_PUBLIC_SUPABASE_URL` | https://wqkreaoqkunjhlzzdimd.supabase.co |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | sb_publishable_... (Publishable Key) |
| `TELEGRAM_BOT` | ส่งแจ้งเตือน Telegram |
| `TELEGRAM_CHAT_ID` | ID ห้องแชต Telegram |

### 3. Deploy
```bash
vercel --prod
```

## 🗄️ Supabase คืออะไร
Supabase คือ Backend-as-a-Service แบบเดียวกับ Firebase แต่ใช้ PostgreSQL เป็นฐานข้อมูล

ในโปรเจกต์นี้ใช้ 4 ส่วนหลัก:
1. **Database** – ตาราง `filenames` และ `pika_jobs` เก็บ log และสถานะงาน
2. **Storage** – bucket ชื่อ `vaulted` เก็บรูปต้นฉบับ (ตั้งเป็น Public)
3. **Edge Functions** – `pika-generate` และ `pika-status` ทำหน้าที่เรียก Pika API โดยซ่อน secret ไว้ฝั่งเซิร์ฟเวอร์
4. **Realtime** – ฟังการเปลี่ยนแปลง (`postgres_changes`) บนตาราง `pika_jobs` แทนการเรียก API ซ้ำทุก 5 วินาที

### ตั้งค่า Supabase ครั้งแรก
1. สร้างโปรเจกต์ใหม่ → คัดลอก URL และ Publishable Key
2. เปิด SQL Editor แล้วรัน:
```sql
create table filenames (id bigserial primary key, name text, created_at timestamptz default now());
create table pika_jobs (id bigserial primary key, job_id text unique, status text default 'processing', video_url text, prompt text, created_at timestamptz default now());

alter table filenames enable row level security;
create policy "public all" on filenames for all using (true) with check (true);

alter table pika_jobs enable row level security;
create policy "public all" on pika_jobs for all using (true) with check (true);

alter publication supabase_realtime add table pika_jobs;
```
3. ไปที่ Storage → สร้าง bucket `vaulted` → ตั้งเป็น Public

## 📡 ระบบแจ้งเตือน
Webhook: `/api/webhook/github`
- แจ้งเมื่อ: workflow ล้มเหลว, deploy ไม่ผ่าน, API key ไม่ถูกต้อง, Magic Hour ตอบ 500
- ส่งเข้า Telegram: @crystalcastle_alert_bot

## 🗂 โครงสร้างโปรเจกต์
```
/
├── api/webhook/github.js    # แจ้งเตือน Telegram
├── index.html               # หน้าเครื่องเจียระไน
├── mission-control.html     # หน้า Mission Control
├── app.js                   # โค้ดหลัก
├── config.js                # CATEGORY_NAMES, HASHTAG_DB
├── supabase-client.js       # เชื่อมต่อ Supabase v2
└── style.css
```

## 🔒 ความปลอดภัย
- ห้าม commit ไฟล์ `config.js` หรือ `.env` – มีใน `.gitignore` แล้ว
- ใช้ Publishable Key แทน anon key เดิม เพราะออกแบบมาให้อยู่ฝั่ง client ได้อย่างปลอดภัย
- Key เก่าที่เคยหลุด (`eyJhbGci...`) ได้ revoke และลบโปรเจกต์เก่าทิ้งแล้ว
- เปิดใช้งาน GitHub Secret Scanning

## 📊 Mission Control
ตรวจสอบสถานะแบบเรียลไทม์: Gen Prompt, Generate Post, FAL Kling, Magic Hour, Upload

---
**Crystal Castle AI Factory · v1.4**  
อัปเดตล่าสุด: 22 เมษายน 2026
