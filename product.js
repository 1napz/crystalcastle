// product.js — @snapzreview AI Video Studio (เวอร์ชันสมบูรณ์)

const $ = (id) => document.getElementById(id);

// DOM Elements
const fileInput = $('#fileInput');
const uploadBtn = $('#uploadBtn');
const previewGrid = $('#previewGrid');
const filenameInput = $('#filenameInput');
const promptInput = $('#promptInput');
const genPromptBtn = $('#genPromptBtn');
const genIntroBtn = $('#genIntroBtn');
const genCTABtn = $('#genCTABtn');
const genThumbnailBtn = $('#genThumbnailBtn');
const statusText = $('#statusText');
const categorySelect = $('#categorySelect');
const brandInput = $('#brandInput');
const dateInput = $('#dateInput');
const copyPromptBtn = $('#copyPromptBtn');
const undoPromptBtn = $('#undoPromptBtn');
const genPostBtn = $('#genPostBtn');
const postOutput = $('#postOutput');
const copyPostBtn = $('#copyPostBtn');
const generateBtn = $('#generateBtn');
const videoEngineSelect = $('#videoEngineSelect');
const engineInfo = $('#engineInfo');

// State
let selectedFiles = [];
let lastUploadedFile = null;
let lastUploadedUrl = null;
let videoAbortController = null;
let promptAbortController = null;
let postAbortController = null;
let promptHistory = [];

// ========== Toast ==========
function showToast(msg, type = 'info') {
  const toast = document.createElement('div');
  const colors = { info: 'bg-blue-600', error: 'bg-red-600', success: 'bg-green-600' };
  toast.className = `fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl text-white text-sm shadow-lg ${colors[type]}`;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// ========== Status ==========
function showStatus(message, type = 'info') {
  if (!statusText) return;
  
  let icon = '';
  let colorClass = '';
  
  switch (type) {
    case 'success':
      icon = '🎉';
      colorClass = 'text-emerald-700 bg-emerald-50 border border-emerald-200';
      break;
    case 'error':
      icon = '❌';
      colorClass = 'text-red-700 bg-red-50 border border-red-200';
      break;
    case 'loading':
      icon = '⏳';
      colorClass = 'text-violet-700 bg-violet-50 border border-violet-200';
      break;
    default:
      icon = 'ℹ️';
      colorClass = 'text-slate-700 bg-slate-50 border border-slate-200';
  }
  
  statusText.innerHTML = `
    <div class="flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl ${colorClass} shadow-sm text-sm font-medium">
      <span>${icon}</span>
      <span>${message}</span>
    </div>
  `;
  statusText.classList.remove('hidden');
  
  if (type !== 'loading') {
    setTimeout(() => statusText.classList.add('hidden'), 9500);
  }
}

// ========== Utility ==========
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function checkDuplicateName(name) {
  const saved = JSON.parse(localStorage.getItem('filenames') || '[]');
  return saved.includes(name);
}

function saveFilename(name) {
  const saved = JSON.parse(localStorage.getItem('filenames') || '[]');
  if (!saved.includes(name)) {
    saved.push(name);
    localStorage.setItem('filenames', JSON.stringify(saved));
  }
}

function updateFilename() {
  const now = new Date();
  const yyyymmdd = now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, '0') +
    String(now.getDate()).padStart(2, '0');
  if (dateInput) dateInput.value = yyyymmdd;
  const category = categorySelect?.value || 'Product';
  const brand = (brandInput?.value.trim().replace(/\s+/g, '') || 'Brand').slice(0, 20);
  const count = selectedFiles.length;
  filenameInput.value = `${yyyymmdd}-${category}-${brand}-${count}img`;
}

// ========== Render Preview ==========
function renderPreview() {
  if (!previewGrid) return;
  
  previewGrid.querySelectorAll('img').forEach(img => {
    if (img.src && img.src.startsWith('blob:')) URL.revokeObjectURL(img.src);
  });
  previewGrid.innerHTML = '';
  
  if (selectedFiles.length === 0) {
    const emptyDiv = document.createElement('div');
    emptyDiv.className = 'aspect-square rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 bg-slate-50';
    emptyDiv.innerHTML = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 16l4-4 4-4 4 4M12 12v-2M12 8v-2M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/></svg><span class="text-[11px] mt-1">ยังไม่มีรูป</span>`;
    previewGrid.appendChild(emptyDiv);
    updateFilename();
    return;
  }
  
  selectedFiles.forEach((fileObj, idx) => {
    const wrap = document.createElement('div');
    wrap.className = 'relative aspect-square bg-slate-100 rounded-xl overflow-hidden group';
    const img = document.createElement('img');
    img.src = fileObj.url;
    img.alt = 'Product image';
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

// ========== Upload ==========
uploadBtn?.addEventListener('click', () => fileInput.click());

fileInput?.addEventListener('change', (e) => {
  const files = Array.from(e.target.files || []);
  if (selectedFiles.length + files.length > 10) {
    showToast('อัปโหลดได้สูงสุด 10 รูป', 'error');
    return;
  }
  files.forEach(f => {
    if (!f.type.startsWith('image/')) {
      showToast('กรุณาเลือกไฟล์รูปภาพเท่านั้น', 'error');
      return;
    }
    if (f.size > 6 * 1024 * 1024) {
      showToast('ไฟล์ต้องไม่เกิน 6MB', 'error');
      return;
    }
    selectedFiles.push({ url: URL.createObjectURL(f), file: f });
  });
  fileInput.value = '';
  renderPreview();
});

// ========== Generate Video ==========
async function generateVideo() {
  if (videoAbortController) videoAbortController.abort();
  videoAbortController = new AbortController();
  
  if (selectedFiles.length === 0) {
    showStatus('กรุณาอัปโหลดรูปสินค้าก่อน', 'error');
    return;
  }
  if (!promptInput.value.trim()) {
    showStatus('กรุณาใส่ Prompt ก่อนสร้างวิดีโอ', 'error');
    return;
  }
  
  const customFilename = filenameInput?.value.trim() || `video-${Date.now()}`;
  if (checkDuplicateName(customFilename)) {
    if (!confirm(`ชื่อ ${customFilename} เคยใช้แล้ว จะสร้างทับไหม?`)) return;
  }
  
  generateBtn.disabled = true;
  showStatus('📤 กำลังอัปโหลดรูปสินค้า...', 'loading');
  
  try {
    const file = selectedFiles[0].file;
    let imageUrl;
    
    if (lastUploadedFile === file && lastUploadedUrl) {
      imageUrl = lastUploadedUrl;
      showStatus('📦 ใช้รูปที่อัปโหลดแล้ว', 'info');
    } else {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('filename', customFilename);
      
      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        signal: videoAbortController.signal,
      });
      if (!uploadRes.ok) throw new Error('อัปโหลดรูปไม่สำเร็จ');
      const data = await uploadRes.json();
      imageUrl = data.url;
      lastUploadedFile = file;
      lastUploadedUrl = imageUrl;
    }
    
    const selectedEngine = videoEngineSelect?.value || 'fal';
    showStatus(`⚡ กำลังสร้างวิดีโอด้วย ${selectedEngine}...`, 'loading');
    
    const genRes = await fetch('/api/generate-video', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        image_url: imageUrl,
        prompt: promptInput.value.trim(),
        filename: customFilename,
        engine: selectedEngine,
      }),
      signal: videoAbortController.signal,
    });
    
    const data = await genRes.json();
    if (!genRes.ok) throw new Error(data.error || 'สร้างวิดีโอไม่สำเร็จ');
    
    const videoUrl = data.videoUrl || data.taskId;
    if (!videoUrl) throw new Error('ไม่ได้รับลิงก์วิดีโอ');
    
    showStatus(`🎉 สร้างวิดีโอสำเร็จแล้ว!`, 'success');
    saveFilename(customFilename);
    
  } catch (err) {
    if (err.name === 'AbortError') {
      showStatus('⏹️ ยกเลิกการสร้างแล้ว', 'info');
    } else {
      showStatus(`❌ เกิดข้อผิดพลาด: ${err.message}`, 'error');
    }
  } finally {
    generateBtn.disabled = false;
    videoAbortController = null;
  }
}

// ========== Event Listeners ==========
generateBtn?.addEventListener('click', debounce(generateVideo, 800));

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderPreview();
  updateFilename();
  console.log('✅ product.js โหลดสำเร็จ');
});