// cta-generator.js - Call To Action Video Generator (Canvas + MediaRecorder)
// เพิ่มเอฟเฟกต์ Sway และ Rotate ให้กับรูปคน (หรือสินค้า)

(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const ctaBtn = document.getElementById('genCTABtn');
        if (!ctaBtn) {
            console.warn('ไม่พบปุ่ม genCTABtn');
            return;
        }

        window.generateCallToActionScene = async function() {
            if (typeof selectedFiles === 'undefined' || selectedFiles.length === 0) {
                alert('กรุณาอัปโหลดรูปสินค้าก่อน');
                return;
            }

            const productName = (typeof brandInput !== 'undefined' && brandInput) ? brandInput.value.trim() : 'สินค้า';
            const price = prompt('💰 กรอกราคาสินค้า (บาท)', '299');
            if (!price) return;
            
            const discount = prompt('🔥 ส่วนลด (%) (ถ้ามี, ไม่มีกดยกเลิก)', '');
            const discountPercent = discount ? parseInt(discount) : 0;
            const ctaText = prompt('📢 ข้อความ Call to Action', '⚡ สินค้าจำกัด! ⚡');

            const statusDiv = document.getElementById('statusText');
            const previewGridDiv = document.getElementById('previewGrid');
            const genFALBtn = document.getElementById('genFALBtn');
            const genHFBtn = document.getElementById('genHFBtn');
            const generateMainBtn = document.getElementById('generateBtn');

            if (statusDiv) {
                statusDiv.classList.remove('hidden');
                statusDiv.innerHTML = '🎬 กำลังสร้าง CTA Video (ขยับคนเล็กน้อย)...';
            }
            if (ctaBtn) ctaBtn.disabled = true;
            if (generateMainBtn) generateMainBtn.disabled = true;

            const durationMs = 8000;
            const startTime = performance.now();

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 1080;
            canvas.height = 1920;
            
            const stream = canvas.captureStream(30);
            const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
            const chunks = [];

            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunks.push(e.data);
            };

            recorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'video/mp4' });
                const videoUrl = URL.createObjectURL(blob);
                if (statusDiv) {
                    statusDiv.innerHTML = `
                        ✅ สร้าง CTA Video สำเร็จ! 
                        <a href="${videoUrl}" target="_blank" class="underline text-blue-400">▶ เปิดดู</a> | 
                        <a href="${videoUrl}" download="cta-${Date.now()}.mp4" class="underline text-purple-400">💾 ดาวน์โหลด</a>
                        <br><span class="text-xs">✨ มีเอฟเฟกต์ Sway + Rotate</span>
                    `;
                }
                if (previewGridDiv) {
                    const videoEl = document.createElement('video');
                    videoEl.src = videoUrl;
                    videoEl.controls = true;
                    videoEl.autoplay = true;
                    videoEl.loop = true;
                    videoEl.className = 'w-full rounded-xl mt-3 col-span-3';
                    previewGridDiv.innerHTML = '';
                    previewGridDiv.appendChild(videoEl);
                }
                if (typeof saveFilename === 'function') {
                    saveFilename(`cta-${productName}-${Date.now()}`);
                }
                if (ctaBtn) ctaBtn.disabled = false;
                if (generateMainBtn) generateMainBtn.disabled = false;
            };

            recorder.start();

            const productImg = new Image();
            productImg.src = selectedFiles[0].url;
            await productImg.decode();

            const drawFrame = (now) => {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / durationMs, 1);

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // ========== 1. พื้นหลัง ==========
                const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
                grad.addColorStop(0, '#ff6b6b');
                grad.addColorStop(1, '#ff4757');
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // ========== 2. รูปคน (Sway + Rotate) ==========
                const scale = 0.65 + progress * 0.3;      // ซูมตามเดิม
                const baseW = canvas.width * scale;
                const baseH = canvas.height * scale;
                
                // Sway: เอียงซ้าย-ขวา (12 องศา สูงสุด)
                const swayAngle = Math.sin(elapsed * 1.5) * 6;   // 6 องศา
                // Rotate: หมุนเบา ๆ (2 องศา)
                const rotateAngle = Math.sin(elapsed * 2.2) * 2;

                ctx.save();
                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.rotate((swayAngle + rotateAngle) * Math.PI / 180);
                ctx.drawImage(productImg, -baseW / 2, -baseH / 2, baseW, baseH);
                ctx.restore();

                // ========== 3. Overlay ด้านล่าง ==========
                const overlayGrad = ctx.createLinearGradient(0, canvas.height - 550, 0, canvas.height);
                overlayGrad.addColorStop(0, 'rgba(0,0,0,0)');
                overlayGrad.addColorStop(1, 'rgba(0,0,0,0.85)');
                ctx.fillStyle = overlayGrad;
                ctx.fillRect(0, canvas.height - 550, canvas.width, 550);

                // ========== 4. ชื่อสินค้า ==========
                const titleY = Math.min(150 + elapsed * 80, 220);
                ctx.font = 'bold 58px "Noto Sans Thai"';
                ctx.fillStyle = '#FFFFFF';
                ctx.shadowBlur = 12;
                const displayProduct = productName.length > 25 ? productName.slice(0, 22) + '...' : productName;
                ctx.fillText(displayProduct, 60, titleY);

                // ========== 5. ราคา (Bounce) ==========
                const bounce = Math.sin(elapsed * 14) * 8;
                ctx.font = 'bold 94px "Noto Sans Thai"';
                ctx.fillStyle = '#F9CA24';
                ctx.fillText(`฿${price}`, 70, 820 + bounce);

                // ========== 6. ส่วนลด (Blink) ==========
                if (discountPercent > 0 && Math.sin(elapsed * 18) > 0) {
                    ctx.font = 'bold 48px "Noto Sans Thai"';
                    ctx.fillStyle = '#FF4757';
                    ctx.fillText(`🔥 ลด ${discountPercent}% 🔥`, 150, 980);
                }

                // ========== 7. CTA กระพริบ ==========
                const ctaBlink = Math.sin(elapsed * 8) > 0;
                if (ctaBlink && elapsed > 2.5) {
                    ctx.font = 'bold 58px "Noto Sans Thai"';
                    ctx.fillStyle = '#FFEB3B';
                    ctx.fillText(ctaText, 100, 1440);
                }

                // ========== 8. กดเลย ==========
                ctx.font = 'bold 42px "Noto Sans Thai"';
                ctx.fillStyle = '#FFFFFF';
                ctx.fillText('👇 กดเลย 👇', canvas.width / 2 - 120, 1620);

                // ========== 9. โลโก้ ==========
                ctx.font = '28px "Noto Sans Thai"';
                ctx.fillStyle = 'rgba(255,255,255,0.7)';
                ctx.fillText('Crystal Castle AI', 50, canvas.height - 60);

                if (progress < 1) {
                    requestAnimationFrame(drawFrame);
                } else {
                    recorder.stop();
                }
            };

            requestAnimationFrame(drawFrame);
        };

        ctaBtn.addEventListener('click', () => {
            if (typeof window.generateCallToActionScene === 'function') {
                window.generateCallToActionScene();
            } else {
                console.error('generateCallToActionScene ไม่ถูกกำหนด');
            }
        });
    });
})();