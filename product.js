// product.js — @snapzreview AI Video Studio (Full Functional Version)
const $ = (id) => document.getElementById(id);

// --- Elements ---
const fileInput = $('fileInput');
const uploadBtn = $('uploadBtn');
const previewGrid = $('previewGrid');
const filenameInput = $('filenameInput');
const categorySelect = $('categorySelect');
const brandInput = $('brandInput');
const promptInput = $('promptInput');
const postOutput = $('postOutput');
const statusText = $('statusText');

// --- State ---
let selectedFiles = [];

// --- UI Logic ---
function showStatus(message, type = 'info') {
    if (!statusText) return;
    const icons = { success: '🎉', error: '❌', loading: '⏳', info: 'ℹ️' };
    const colors = {
        success: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        error: 'text-red-700 bg-red-50 border-red-200',
        loading: 'text-violet-700 bg-violet-50 border-violet-200',
        info: 'text-slate-700 bg-slate-50 border-slate-200'
    };

    statusText.innerHTML = `
        <div class="flex items-center justify-center gap-2 px-4 py-2 rounded-xl ${colors[type]} border shadow-sm">
            <span>${icons[type]}</span>
            <span>${message}</span>
        </div>`;
    statusText.classList.remove('hidden');
    if (type !== 'loading') setTimeout(() => statusText.classList.add('hidden'), 3000);
}

// --- File & Preview Logic ---
function updateFilename() {
    const yyyymmdd = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const category = categorySelect?.value || 'Product';
    const brand = brandInput?.value.trim().replace(/\s+/g, '-') || 'Brand';
    filenameInput.value = `${yyyymmdd}-${category}-${brand}-${selectedFiles.length}img`;
}

function renderPreview() {
    if (!previewGrid) return;
    previewGrid.innerHTML = '';

    if (selectedFiles.length === 0) {
        previewGrid.innerHTML = `<div class="aspect-square border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-xs">ยังไม่มีรูป</div>`;
        updateFilename();
        return;
    }

    selectedFiles.forEach((fileObj, idx) => {
        const div = document.createElement('div');
        div.className = 'relative aspect-square rounded-xl overflow-hidden group';
        div.innerHTML = `
            <img src="${fileObj.url}" class="w-full h-full object-cover">
            <button onclick="removeFile(${idx})" class="absolute top-1 right-1 bg-black/50 text-white w-5 h-5 rounded-full text-xs opacity-0 group-hover:opacity-100 transition">×</button>
        `;
        previewGrid.appendChild(div);
    });
    updateFilename();
}

window.removeFile = (idx) => {
    URL.revokeObjectURL(selectedFiles[idx].url);
    selectedFiles.splice(idx, 1);
    renderPreview();
};

// --- Content Generation (Logic สำหรับสร้างแคปชั่น) ---
function generateContent(type) {
    const brand = brandInput.value || "สินค้าตัวนี้";
    const category = categorySelect.value;
    
    showStatus(`กำลังสร้าง ${type}...`, 'loading');

    setTimeout(() => {
        let result = "";
        if (type === 'prompt') {
            result = `Create a high-quality fashion photography of ${brand} ${category}, cinematic lighting, 8k resolution, minimalist background.`;
            promptInput.value = result;
        } else if (type === 'post') {
            result = `🔥ป้ายยา ${brand} ${category} ที่ต้องมี! \n✨ ดีไซน์สวย แมตช์ง่ายมาก \n📍 พิกัดในตะกร้าหน้าโปรไฟล์เลยครับ \n#Fashion #ShopeeVideo #ป้ายยา`;
            postOutput.value = result;
        }
        showStatus(`สร้าง ${type} สำเร็จ!`, 'success');
    }, 800);
}

// --- Copy System ---
function copyToClipboard(elementId) {
    const el = $(elementId);
    el.select();
    navigator.clipboard.writeText(el.value);
    showStatus('คัดลอกลง Clipboard แล้ว!', 'success');
}

// --- Event Listeners ---
uploadBtn?.addEventListener('click', () => fileInput.click());
fileInput?.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => selectedFiles.push({ file, url: URL.createObjectURL(file) }));
    renderPreview();
    showStatus(`เพิ่มรูปภาพสำเร็จ`, 'success');
});

$('genPromptBtn')?.addEventListener('click', () => generateContent('prompt'));
$('genPostBtn')?.addEventListener('click', () => generateContent('post'));
$('copyPromptBtn')?.addEventListener('click', () => copyToClipboard('promptInput'));
$('copyPostBtn')?.addEventListener('click', () => copyToClipboard('postOutput'));

// Initial Run
document.addEventListener('DOMContentLoaded', updateFilename);
