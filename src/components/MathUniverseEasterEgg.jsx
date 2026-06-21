import React, { useEffect, useRef, useState } from 'react';
import { useApp } from './AppContext';
import { HugeiconsIcon } from '@hugeicons/react';
import { Cancel01Icon } from '@hugeicons/core-free-icons';

export default function MathUniverseEasterEgg({ onClose }) {
  const { lang } = useApp();
  const canvasRef = useRef(null);
  const [terminalText, setTerminalText] = useState([]);
  const [decryptionProgress, setDecryptionProgress] = useState(0);
  const [mouse, setMouse] = useState({ x: null, y: null });

  // 1. Simulated decryption terminal typewriter logs
  useEffect(() => {
    setTerminalText([]);
    setDecryptionProgress(0);
    const secretLogs = lang === 'vi' ? [
      "ĐANG THIẾT LẬP KẾT NỐI AN TOÀN...",
      "ĐANG GIẢI MÃ LÕI TOÁN HỌC LOGIC...",
      "TÌM THẤY TỌA ĐỘ BÍ MẬT: [23°06'N, 20°05'E] // 23/06/2005",
      "XÁC MINH DANH TÍNH CHỦ SỞ HỮU...",
      ">> Trần Thanh Tùng (Sophomore @ TDTU)",
      ">> Chuyên ngành: Toán Ứng Dụng (Applied Mathematics)",
      ">> Phân vùng phát triển: Kỹ nghệ hỗ trợ bởi AI (AI-Augmented Developer)",
      "ĐANG ĐỒNG BỘ LLM CORES...",
      ">> Codex Core: HOẠT ĐỘNG",
      ">> Antigravity Engine: HOẠT ĐỘNG",
      ">> Kiro AI & ZCode Co-processors: ĐÃ GHÉP CẶP",
      "KẾT QUẢ PHÂN TÍCH: Tư duy thuật toán đạt ngưỡng 10/10.",
      "EASTER EGG ĐÃ ĐƯỢC GIẢI MÃ THÀNH CÔNG! Chào mừng bạn đến với Vũ trụ Toán học."
    ] : [
      "ESTABLISHING SECURE CONNECTION...",
      "DECRYPTING LOGICAL MATHEMATICAL CORE...",
      "FOUND SECRET COORDINATES: [23°06'N, 20°05'E] // Jun 23, 2005",
      "VERIFYING OWNER IDENTITY...",
      ">> Tran Thanh Tung (Sophomore @ TDTU)",
      ">> Major: Applied Mathematics",
      ">> Pipeline: AI-Augmented Software Engineering",
      "SYNCING LLM CORES...",
      ">> Codex Core: ACTIVE",
      ">> Antigravity Engine: ACTIVE",
      ">> Kiro AI & ZCode Co-processors: PAIRED",
      "ANALYSIS RESULT: Algorithmic Logic index at 10/10.",
      "EASTER EGG DECRYPTED! Welcome to the Math Universe."
    ];

    let currentLogIdx = 0;
    const logInterval = setInterval(() => {
      if (currentLogIdx < secretLogs.length) {
        setTerminalText((prev) => [...prev, secretLogs[currentLogIdx]]);
        setDecryptionProgress((prev) => Math.min(100, Math.floor(((currentLogIdx + 1) / secretLogs.length) * 100)));
        currentLogIdx++;
      } else {
        clearInterval(logInterval);
      }
    }, 350);

    return () => clearInterval(logInterval);
  }, [lang]);

  // 2. Interactive Canvas Particles logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Math symbols set
    const mathSymbols = [
      '∑', '∫', 'π', 'θ', 'λ', '∞', '√', '∂', '∇', 'dx', 'dy', 'lim', 'log', 
      'f(x)', 'e^iπ', 'A=πr²', '∇×E', '∫e^-x²', '≈', '≠', '∈', '∀', '∃', '⊆'
    ];

    // Create particles
    const particleCount = Math.min(80, Math.floor((width * height) / 18000));
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        symbol: mathSymbols[Math.floor(Math.random() * mathSymbols.length)],
        fontSize: Math.floor(Math.random() * 8) + 12,
        color: i % 2 === 0 ? '65% 0.17 150' : '75% 0.14 200', // Emerald or Cyan (OKLCH mapping)
        opacity: Math.random() * 0.4 + 0.3,
        size: 15
      });
    }

    // Animation Loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const lineOpacity = (1 - dist / 120) * 0.15;
            // Draw matching accent color lines
            ctx.strokeStyle = `oklch(65% 0.17 150 / ${lineOpacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Interactive mouse gravity attraction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            const force = (200 - dist) / 1200; // soft pull
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;

            // Speed limit
            const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
            if (speed > 2.5) {
              p.vx = (p.vx / speed) * 2.5;
              p.vy = (p.vy / speed) * 2.5;
            }
          }
        }

        // Apply light drag to stabilize speed
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Bounce borders
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Render symbol text
        ctx.save();
        ctx.fillStyle = `oklch(${p.color} / ${p.opacity})`;
        ctx.font = `bold ${p.fontSize}px font-sans`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.symbol, p.x, p.y);
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mouse]);

  const handleMouseMove = (e) => {
    setMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setMouse({ x: null, y: null });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="fixed inset-0 z-[100] bg-neutral-950/92 backdrop-blur-2xl flex flex-col items-center justify-center p-6 select-none font-mono"
    >
      {/* Background Particle Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Floating coordinates dashboard decorative border lines */}
      <div className="absolute top-6 left-6 font-mono text-[8px] text-neutral-500 tracking-widest hidden md:block">
        [SYS_CORE: DECRYPT_OK] // PORT_GEO: [23°06'N, 20°05'E]
      </div>
      <div className="absolute top-6 right-6 font-mono text-[8px] text-neutral-500 tracking-widest hidden md:block">
        AI_MESH_SYNC: 100% // FPS: 60
      </div>

      {/* Main decryption logger panel */}
      <div className="relative z-10 w-full max-w-2xl blueprint-card">
        <div className="blueprint-inner bg-neutral-900/90 border border-white/10 p-6 md:p-8 flex flex-col justify-between min-h-[400px] shadow-2xl relative">
          
          {/* Header Info */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-violet animate-ping"></span>
              <span className="text-[10px] tracking-widest text-neutral-400 font-bold uppercase">
                {lang === 'vi' ? 'Giải mã Hệ thống' : 'System Decryption Core'}
              </span>
            </div>
            {/* Decryption status bar */}
            <div className="flex items-center gap-3">
              <span className="text-[9px] text-accent-cyan font-mono">{decryptionProgress}%</span>
              <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
                <div 
                  className="h-full bg-accent-violet transition-all duration-300 ease-out-custom"
                  style={{ width: `${decryptionProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Decryption Message stream logs */}
          <div className="flex-1 space-y-2.5 overflow-y-auto max-h-[220px] pr-2 text-xs leading-relaxed text-neutral-300 scrollbar-thin">
            {terminalText.map((log, idx) => (
              <div key={idx} className="flex items-start gap-2.5 transition-all duration-500">
                <span className="text-accent-cyan shrink-0">❯</span>
                <span className={log && log.startsWith && log.startsWith('>>') ? 'text-accent-emerald' : ''}>
                  {log}
                </span>
              </div>
            ))}
            {decryptionProgress < 100 && (
              <div className="animate-pulse text-accent-violet flex items-center gap-1.5 text-[10px]">
                <span>■</span>
                <span className="tracking-widest">{lang === 'vi' ? 'ĐANG GIẢI MÃ...' : 'DECRYPTING...'}</span>
              </div>
            )}
          </div>

          {/* Close Action footer */}
          <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
            <div className="text-[8px] text-neutral-500 uppercase tracking-widest">
              {lang === 'vi' ? 'Nhấp chuột để kéo hạt toán học' : 'Hover to attract math particles'}
            </div>
            <button
              onClick={onClose}
              className="group px-5 py-2 rounded-full btn-glass-secondary btn-pressable cursor-pointer flex items-center gap-2 text-[9px] tracking-widest uppercase hover:border-red-500/50 hover:text-red-500 dark:hover:text-red-400 font-bold"
            >
              {lang === 'vi' ? 'Đóng' : 'Close'}
              <HugeiconsIcon icon={Cancel01Icon} className="w-3.5 h-3.5 group-hover:text-red-500 transition-colors" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
