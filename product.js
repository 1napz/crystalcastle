// product.js — @snapzreview AI Video Studio
const $ = (id) => document.getElementById(id);

// --- DOM Elements ---
const fileInput = $('fileInput');
const uploadBtn = $('uploadBtn');
const previewGrid = $('previewGrid');
const filenameInput = $('filenameInput');
const categorySelect = $('categorySelect');
const brandInput = $('brandInput');
const dateInput = $('dateInput');
const statusText = $('statusText');

// --- Global Variables ---
let selectedFiles = [];

// --- Utility Functions ---
function debounce(fn, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

function showStatus(message, type = 'info') {
    if (!statusText) return;
    let icon = '';
    let colorClass = '';

    switch (type) {
        case 'success':
            icon = '🎉';
            colorClass = 'text-emerald-700 bg-emerald-50 border-emerald-200';
            break;
        case 'error':
            icon = '❌';
            colorClass = 'text-red-700 bg-red-50 border-red-200';
            break;
        case 'loading':
            icon = '⏳';
            colorClass = 'text-violet-700 bg-violet-50 border-violet-200';
            break;
        default:
            icon = 'ℹ️';
            colorClass = 'text-slate-700 bg-slate-50 border-slate-200';
    }

    statusText.innerHTML = `
        <div class="flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl ${colorClass} shadow-sm text-sm font-medium border">
            <span>${icon}</span>
            <span>${message}</span>
        </div>`;
    
    statusText.classList.remove('hidden');
    if (type !== 'loading') {
        setTimeout(() => statusText.classList.add('hidden'), 3500);
    }
}

// --- Logic Functions ---
function updateFilename() {
    const now = new Date();
    const yyyymmdd = now.getFullYear().toString() + 
                     String(now.getMonth() + 1).padStart(2, '0') + 
                     String(now.getDate()).padStart(2, '0');
    
    if (dateInput) dateInput.value = yyyymmdd;
    
    const category = categorySelect?.value || 'Product';
    const brand = brandInput?.value.trim().replace(/\s+/g, "-") || 'Brand';
    const count = selectedFiles.length;
    
    filenameInput.value = `${yyyymmdd}-${category}-${brand}-${count}img`;
}

function renderPreview() {
    if (!previewGrid) return;

    // ล้าง Memory ของ ObjectURL เก่า
    previewGrid.querySelectorAll('img').forEach(img => {
        if (img.src.startsWith('blob:')) URL.revokeObjectURL(img.src);
    });
    previewGrid.innerHTML = '';

    if (selectedFiles.length === 0) {
        const emptyDiv = document.createElement('div');
        emptyDiv.className = 'aspect-square rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 bg-slate-50';
        emptyDiv.innerHTML = `
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M4 16l4-4 4 4M12 12v-2M12 8v-2M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/>
            </svg>
            <span class="text-[11px] mt-1">ยังไม่มีรูป</span>`;
        previewGrid.appendChild(emptyDiv);
        updateFilename();
        return;
    }

    selectedFiles.forEach((fileObj, idx) => {
        const wrap = document.createElement('div');
        wrap.className = 'relative aspect-square bg-slate-100 rounded-xl overflow-hidden group';
        
        const img = document.createElement('img');
        img.src = fileObj.url;
        img.className = 'w-full h-full object-cover';
        
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'absolute top-1 right-1 w-5 h-5 bg-black/60 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition';
        btn.textContent = '×';
        btn.onclick = () => {
            URL.revokeObjectURL(fileObj.url);
            selectedFiles.splice(idx, 1);
            renderPreview();
        };

        wrap.appendChild(img);
        wrap.appendChild(btn);
        previewGrid.appendChild(wrap);
    });
    updateFilename();
}

// --- Event Listeners (ส่วนที่ทำให้ระบบทำงานได้จริง) ---

// คลิกปุ่ม Upload ให้ไปกด input file
uploadBtn?.addEventListener('click', () => fileInput.click());

// เมื่อเลือกไฟล์
fileInput?.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
        files.forEach(file => {
            selectedFiles.push({
                file: file,
                url: URL.createObjectURL(file)
            });
        });
        renderPreview();
        showStatus(`เพิ่มรูปภาพ ${files.length} รูปเรียบร้อย`, 'success');
    }
    fileInput.value = ''; // Reset เพื่อให้เลือกไฟล์เดิมซ้ำได้
});

// อัปเดตชื่อไฟล์แบบ Real-time เมื่อพิมพ์ชื่อแบรนด์หรือเปลี่ยนหมวดหมู่
brandInput?.addEventListener('input', debounce(() => updateFilename(), 300));
categorySelect?.addEventListener('change', () => updateFilename());

// เริ่มต้นหน้าจอ
document.addEventListener('DOMContentLoaded', () => {
    updateFilename();
    renderPreview();
});
