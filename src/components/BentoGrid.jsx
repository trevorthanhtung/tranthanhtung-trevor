import React, { useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUpRightIcon } from '@hugeicons/core-free-icons';
import { GithubIcon as Github } from './SocialIcons';
import { portfolioData } from '../data/portfolioData';
import { useApp } from './AppContext';

function CodeTerminal({ lang }) {
  const [logs, setLogs] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const logsContainerRef = useRef(null);
  const inputRef = useRef(null);

  const initialLogs = [
    { type: 'info', text: lang === 'vi' ? 'Nhấp vào đây hoặc gõ lệnh bên dưới để tương tác.' : 'Click here or type commands below to interact.' },
    { type: 'info', text: lang === 'vi' ? 'Gõ "help" để xem danh sách các lệnh khả dụng.' : 'Type "help" to view available commands.' },
    { type: 'cmd', text: 'help' }
  ];

  const scrollToBottom = () => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    // Initial logs setup
    setLogs([
      { type: 'success', text: 'Vite dev server running at http://localhost:3000' },
      ...initialLogs
    ]);
  }, [lang]);

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  const handleCommand = (cmdText) => {
    const trimmed = cmdText.trim().toLowerCase();
    if (!trimmed) return;

    const newLogs = [...logs, { type: 'cmd', text: trimmed }];

    if (trimmed === 'help') {
      newLogs.push(
        { type: 'info', text: lang === 'vi' ? 'Danh sách lệnh khả dụng:' : 'Available commands:' },
        { type: 'success', text: '  help    - ' + (lang === 'vi' ? 'Hiển thị danh sách này' : 'Display this command list') },
        { type: 'success', text: '  sync    - ' + (lang === 'vi' ? 'Đồng bộ hóa đám mây Supabase' : 'Trigger Supabase cloud database sync') },
        { type: 'success', text: '  offline - ' + (lang === 'vi' ? 'Mô phỏng ghi đè ngoại tuyến IndexedDB (Dexie)' : 'Simulate offline IndexedDB (Dexie) writes') },
        { type: 'success', text: '  cipher  - ' + (lang === 'vi' ? 'Mã hóa AES-256 phía khách hàng (Crypto-JS)' : 'Run client-side AES-256 encryption') },
        { type: 'success', text: '  project - ' + (lang === 'vi' ? 'Thông số kỹ thuật dự án KAT Journey' : 'Print technical specs of KAT Journey') },
        { type: 'success', text: '  clear   - ' + (lang === 'vi' ? 'Xóa nhật ký terminal' : 'Clear the terminal screen') },
        { type: 'success', text: '  exit    - ' + (lang === 'vi' ? 'Đặt lại trạng thái ban đầu' : 'Reset terminal to initial state') }
      );
    } else if (trimmed === 'sync') {
      newLogs.push(
        { type: 'info', text: lang === 'vi' ? 'Đang kiểm tra kết nối mạng... [ONLINE]' : 'Checking connection status... [ONLINE]' },
        { type: 'info', text: lang === 'vi' ? 'Đang đồng bộ 2 mục nhật ký chưa lưu...' : 'Syncing 2 pending logs to cloud...' },
        { type: 'info', text: '  syncing: journal_da_lat.dat -> supabase/journals/v32' },
        { type: 'info', text: '  syncing: expense_june.dat -> supabase/expenses/d98' },
        { type: 'success', text: lang === 'vi' ? 'Đồng bộ hoàn tất! Dữ liệu đám mây Supabase đã khớp.' : 'Sync completed! Supabase cloud database state synchronized.' }
      );
    } else if (trimmed === 'offline') {
      newLogs.push(
        { type: 'info', text: lang === 'vi' ? 'Mô phỏng mất kết nối mạng...' : 'Simulating network adapter disconnection...' },
        { type: 'info', text: lang === 'vi' ? 'Đang ghi đè dữ liệu trực tiếp vào bộ nhớ IndexedDB...' : 'Intercepting write: writing directly to local IndexedDB...' },
        { type: 'info', text: '  localDB -> write index #184 (status: PENDING_SYNC)' },
        { type: 'success', text: lang === 'vi' ? 'Đã lưu ngoại tuyến bằng Dexie.js. Sẵn sàng tự động đồng bộ khi online.' : 'Offline save complete (Dexie.js). Data will auto-sync when connection is restored.' }
      );
    } else if (trimmed === 'cipher') {
      newLogs.push(
        { type: 'info', text: lang === 'vi' ? 'Đang thiết lập kênh mã hóa AES-256...' : 'Setting up AES-256 encryption pipeline...' },
        { type: 'info', text: lang === 'vi' ? 'Đang dẫn xuất khóa giải mã cục bộ từ SHA-256...' : 'Deriving key: SHA-256 of user secret...' },
        { type: 'info', text: '  plain text: "Chuyến đi Đà Lạt..."' },
        { type: 'success', text: '  cipher text: u2fsdgvkx182a9...89cb18 (encrypted)' },
        { type: 'success', text: lang === 'vi' ? 'Mã hóa cục bộ hoàn tất. Supabase chỉ lưu trữ payload đã mã hóa.' : 'Client-side encryption verified. Only encrypted blobs reach Supabase servers.' }
      );
    } else if (trimmed === 'project') {
      newLogs.push(
        { type: 'info', text: '--- KAT JOURNEY TECH SPEC ---' },
        { type: 'success', text: '  Framework: React 19 + Vite' },
        { type: 'success', text: '  Stack: TypeScript, HTML5, Tailwind CSS' },
        { type: 'success', text: '  Offline DB: Dexie.js (IndexedDB wrapper)' },
        { type: 'success', text: '  Cloud DB: Supabase (PostgreSQL)' },
        { type: 'success', text: '  Encryption: CryptoJS AES-256' }
      );
    } else if (trimmed === 'clear') {
      setLogs([]);
      setInputValue('');
      return;
    } else if (trimmed === 'exit') {
      setLogs([
        { type: 'success', text: 'Terminal reset. Active session restarted.' },
        ...initialLogs
      ]);
      setInputValue('');
      return;
    } else {
      newLogs.push({
        type: 'info',
        text: lang === 'vi' 
          ? `Lệnh không hợp lệ: "${trimmed}". Gõ "help" để trợ giúp.` 
          : `Unknown command: "${trimmed}". Type "help" for a list of commands.`
      });
    }

    setLogs(newLogs);
    setInputValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(inputValue);
    }
  };

  return (
    <div 
      onClick={() => inputRef.current?.focus()}
      className="font-mono text-[9px] md:text-[10px] leading-relaxed bg-neutral-100 dark:bg-neutral-950 text-neutral-600 dark:text-neutral-300 rounded-2xl p-4 border border-black/[0.06] dark:border-white/[0.08] shadow-inner h-full flex flex-col justify-start overflow-hidden min-h-[260px] cursor-text"
    >
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-black/5 dark:border-white/5">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/60"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/60"></span>
          <span className="ml-1.5 text-neutral-500 text-[9px]">katjourney-dev-logs</span>
        </div>
        <span className="text-[8px] text-accent-cyan/80 animate-pulse font-semibold">INTERACTIVE</span>
      </div>

      {/* Logs container */}
      <div 
        ref={logsContainerRef}
        className="flex-1 overflow-y-auto space-y-2 mb-3 max-h-[170px] pr-1"
      >
        {logs.map((log, idx) => (
          <div key={idx} className="transition-all duration-300">
            {log.type === 'cmd' && <span className="text-accent-cyan">$ {log.text}</span>}
            {log.type === 'info' && <span className="text-neutral-500 dark:text-neutral-400">ℹ {log.text}</span>}
            {log.type === 'success' && <span className="text-accent-emerald">✔ {log.text}</span>}
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="flex items-center gap-1 border-t border-black/5 dark:border-white/5 pt-2">
        <span className="text-accent-cyan">$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-neutral-800 dark:text-neutral-100 font-mono text-[9px] md:text-[10px] p-0"
          placeholder={lang === 'vi' ? "Gõ lệnh ở đây..." : "Type command here..."}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </div>

      {/* Quick Click Commands */}
      <div className="flex flex-wrap gap-1.5 mt-2 pt-2 border-t border-black/[0.04] dark:border-white/[0.04]">
        {['help', 'sync', 'offline', 'cipher', 'project'].map((cmd) => (
          <button
            key={cmd}
            onClick={(e) => {
              e.stopPropagation();
              handleCommand(cmd);
            }}
            className="px-2 py-0.5 rounded bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.05] hover:bg-accent-cyan/15 hover:border-accent-cyan/30 text-[8px] text-neutral-500 dark:text-neutral-400 hover:text-accent-cyan cursor-pointer transition-all duration-300 uppercase font-bold"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function BentoGrid() {
  const { lang } = useApp();
  const [inView, setInView] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -100px 0px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const project = portfolioData.projects[0];

  return (
    <section 
      id="projects" 
      ref={containerRef}
      className="py-32 px-6 md:px-8 max-w-6xl mx-auto overflow-hidden math-grid"
    >
      {/* Section Header */}
      <div className="mb-20 text-left">
        <span className="inline-block px-3 py-1 rounded-full bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] text-[9px] text-accent-violet font-semibold tracking-wider uppercase mb-4">
          {lang === 'vi' ? "Dự án tiêu biểu" : "Featured Project"}
        </span>
        <h2 className="font-display font-black text-4xl md:text-6xl text-neutral-900 dark:text-white tracking-tight leading-none mb-6">
          {lang === 'vi' ? (
            <>
              DỰ ÁN <br />
              <span className="font-sans italic font-normal text-neutral-400 dark:text-neutral-500">Tiêu Biểu.</span>
            </>
          ) : (
            <>
              FEATURED <br />
              <span className="font-sans italic font-normal text-neutral-400 dark:text-neutral-500">Project.</span>
            </>
          )}
        </h2>
        <p className="max-w-md text-xs md:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed font-sans font-light">
          {lang === 'vi'
            ? "Mô tả chi tiết và quy trình vận hành kỹ thuật của Progressive Web App (PWA)."
            : "Detailed description and the engineering pipeline of my Progressive Web App (PWA)."}
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Description & Blueprint */}
        <div
          style={{ transitionDelay: '100ms' }}
          className={`lg:col-span-7 transform transition-all duration-1000 ease-out-custom ${
            inView ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-16 opacity-0 blur-md'
          }`}
        >
          <div className="blueprint-card h-full">
            <div className="blueprint-inner p-8 md:p-10 h-full flex flex-col justify-between relative overflow-hidden">
              
              {/* Technical Grid Coordinates Background */}
              <div className="absolute top-4 right-4 font-mono text-[7px] text-neutral-400 dark:text-neutral-600 pointer-events-none select-none">
                [GRID_POS_X_12 // Y_07]
              </div>

              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[9px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-semibold font-mono">
                    {project.category[lang]}
                  </span>

                  {/* Tech demo buttons */}
                  <div className="flex items-center gap-3">
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub Repository"
                      className="w-8 h-8 rounded-full bg-black/[0.03] hover:bg-black/[0.06] dark:bg-white/[0.04] dark:hover:bg-white/[0.08] border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors duration-300"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Live Demo"
                      className="w-8 h-8 rounded-full bg-neutral-950 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 flex items-center justify-center text-white dark:text-black transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                      <HugeiconsIcon icon={ArrowUpRightIcon} className="w-4 h-4 transition-transform duration-300" />
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="p-1 rounded-2xl bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/5 shadow-sm">
                    <img 
                      src="/asset/katjourney.png" 
                      alt="KAT Journey Logo" 
                      className="w-12 h-12 object-contain rounded-xl" 
                    />
                  </div>
                  <h3 className="font-display font-bold text-3xl md:text-4xl text-neutral-900 dark:text-white tracking-tight">
                    {project.title}
                  </h3>
                </div>

                <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans font-light mb-8">
                  {project.description[lang]}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.06] text-[8px] md:text-[9px] text-neutral-500 dark:text-neutral-400 font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* Right Column: Code Terminal & Features */}
        <div
          style={{ transitionDelay: '250ms' }}
          className={`lg:col-span-5 flex flex-col gap-6 transform transition-all duration-1000 ease-out-custom ${
            inView ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-16 opacity-0 blur-md'
          }`}
        >
          {/* Simulated Development Logs */}
          <div className="flex-1">
            <CodeTerminal lang={lang} />
          </div>

          {/* Core Feature Summary */}
          <div className="blueprint-card">
            <div className="blueprint-inner p-6 md:p-8 flex flex-col justify-between">
              <div>
                <h4 className="font-display font-bold text-sm text-neutral-900 dark:text-white tracking-tight mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-violet"></span>
                  {lang === 'vi' ? "Chi tiết vận hành" : "Operational details"}
                </h4>
                <ul className="space-y-3">
                  {project.features[lang].slice(0, 2).map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-500 dark:text-neutral-400 font-sans font-light">
                      <span className="w-1 h-1 rounded-full bg-accent-cyan mt-1.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-black/[0.04] dark:border-white/[0.04]">
                <p className="text-[8px] uppercase tracking-wider text-neutral-400 dark:text-neutral-500 font-mono">
                  {lang === 'vi' ? `Trạng thái: ${project.status.vi}` : `Status: ${project.status.en}`}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
