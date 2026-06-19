import React, { useState, useEffect } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUpRightIcon, Sun01Icon, Moon01Icon } from '@hugeicons/core-free-icons';
import { GithubIcon as Github, LinkedinIcon as Linkedin, FacebookIcon as Facebook, YoutubeIcon as Youtube, InstagramIcon as Instagram } from './SocialIcons';
import { portfolioData } from '../data/portfolioData';
import { useApp } from './AppContext';

function MenuTerminal({ lang }) {
  const [lines, setLines] = useState([]);
  const [geo, setGeo] = useState({ city: 'TDTU', lat: '10.7725', lon: '106.6980' });
  const { theme } = useApp();

  useEffect(() => {
    // Fetch visitor's dynamic IP location details silently
    fetch('https://ipapi.co/json/')
      .then((res) => res.json())
      .then((data) => {
        if (data.city && data.latitude && data.longitude) {
          setGeo({
            city: data.city,
            lat: data.latitude.toFixed(4),
            lon: data.longitude.toFixed(4)
          });
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    const platform = window.navigator.platform;
    const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
    const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
    const iosPlatforms = ['iPhone', 'iPad', 'iPod'];
    let detectedOS = 'Unknown OS';

    if (macosPlatforms.indexOf(platform) !== -1) {
      detectedOS = 'macOS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
      detectedOS = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      detectedOS = 'Windows';
    } else if (/Android/.test(userAgent)) {
      detectedOS = 'Android';
    } else if (/Linux/.test(platform)) {
      detectedOS = 'Linux';
    }

    const hours = new Date().getHours();
    const greeting = lang === 'vi' 
      ? (hours < 12 ? 'Chào buổi sáng!' : hours < 18 ? 'Chào buổi chiều!' : 'Chào buổi tối!')
      : (hours < 12 ? 'Good morning!' : hours < 18 ? 'Good afternoon!' : 'Good evening!');
      
    const systemLogs = lang === 'vi' ? [
      `Khởi tạo phiên truy cập của khách...`,
      `Nền tảng: ${detectedOS} (PHÁT HIỆN HỆ ĐIỀU HÀNH)`,
      `Vị trí: ${geo.city} [${Math.abs(parseFloat(geo.lat)).toFixed(4)}°${parseFloat(geo.lat) >= 0 ? 'B' : 'Nam'}, ${Math.abs(parseFloat(geo.lon)).toFixed(4)}°${parseFloat(geo.lon) >= 0 ? 'Đ' : 'Tây'}]`,
      `Giờ hệ thống: ${new Date().toLocaleTimeString()}`,
      `Lời chào: "${greeting}"`,
      `Kết nối AI: Đã ghép cặp với Antigravity AI`,
      `Trạng thái: Hệ thống tối ưu.`
    ] : [
      `Initializing visitor session...`,
      `Platform: ${detectedOS} (OS_DETECTED)`,
      `Location: ${geo.city} [${Math.abs(parseFloat(geo.lat)).toFixed(4)}°${parseFloat(geo.lat) >= 0 ? 'N' : 'S'}, ${Math.abs(parseFloat(geo.lon)).toFixed(4)}°${parseFloat(geo.lon) >= 0 ? 'E' : 'W'}]`,
      `Local Time: ${new Date().toLocaleTimeString()}`,
      `Greeting: "${greeting}"`,
      `Pairing status: Connected to Antigravity AI`,
      `Status: System optimized.`
    ];

    setLines([]);
    let i = 0;
    const interval = setInterval(() => {
      if (i < systemLogs.length) {
        setLines((prev) => [...prev, systemLogs[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 400);
    return () => clearInterval(interval);
  }, [lang, geo]);

  return (
    <div className="font-mono text-[9px] md:text-[10px] leading-relaxed bg-white/80 dark:bg-neutral-950/80 text-neutral-700 dark:text-neutral-300 rounded-2xl p-5 border border-neutral-200 dark:border-neutral-900 shadow-[0_20px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.25)] h-full flex flex-col justify-start overflow-hidden backdrop-blur-md">
      {/* Terminal Window Header (macOS style dots) */}
      <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-neutral-100 dark:border-neutral-900">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#FF5F56]/80"></span>
          <span className="w-2 h-2 rounded-full bg-[#FFBD2E]/80"></span>
          <span className="w-2 h-2 rounded-full bg-[#27C93F]/80"></span>
        </div>
        <span className="text-neutral-400 dark:text-neutral-500 text-[8px] uppercase tracking-wider font-semibold">visitor-session.log</span>
      </div>
      <div className="space-y-2 flex-1 overflow-y-auto scrollbar-none pr-1">
        {lines.map((l, idx) => {
          // Highlight key elements to make the console look lively and premium
          const formattedLine = l
            .replace(/(PHÁT HIỆN HỆ ĐIỀU HÀNH|OS_DETECTED)/g, '<span class="text-neutral-400 dark:text-neutral-500 font-bold">$1</span>')
            .replace(/(Hệ thống tối ưu|System optimized)/g, '<span class="text-emerald-600 dark:text-emerald-400 font-semibold">$1</span>')
            .replace(/(Windows|macOS|iOS|Android|Linux)/g, '<span class="text-sky-600 dark:text-sky-400">$1</span>')
            .replace(/(Antigravity AI)/g, '<span class="text-accent-violet font-semibold">$1</span>');

          return (
            <div key={idx} className="transition-all duration-300 flex items-start gap-2">
              <span className="text-accent-violet flex-shrink-0">❯</span>
              <span dangerouslySetInnerHTML={{ __html: formattedLine }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function FloatingNavbar() {
  const { lang, toggleLang, theme, toggleTheme } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Keep navbar visible if full-screen menu overlay is active
      if (isOpen) {
        setVisible(true);
        return;
      }

      if (currentScrollY > lastScrollYRef.current && currentScrollY > 100) {
        // Scrolling down -> Hide navbar
        setVisible(false);
      } else {
        // Scrolling up -> Show navbar
        setVisible(true);
      }

      lastScrollYRef.current = currentScrollY;

      // Debounce: reveal navbar when scrolling stops
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setVisible(true);
      }, 250);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: lang === 'vi' ? "Khởi Đầu" : "Intro", href: "#hero" },
    { name: lang === 'vi' ? "Dự Án" : "Projects", href: "#projects" },
    { name: lang === 'vi' ? "Kỹ Năng" : "Skills", href: "#skills" },
    { name: lang === 'vi' ? "Hành Trình" : "Journey", href: "#experience" },
    { name: lang === 'vi' ? "Truyền Thông" : "Media", href: "#media" },
    { name: lang === 'vi' ? "Liên Hệ" : "Contact", href: "#contact" }
  ];

  return (
    <>
      {/* Main Floating pill header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out-custom mt-4 px-4 md:px-0 transform ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0 pointer-events-none'
      }`}>
        <div
          className={`mx-auto max-w-4xl transition-all duration-700 ease-out-custom rounded-full border border-black/[0.05] dark:border-white/[0.06] backdrop-blur-xl flex items-center justify-between pl-6 pr-3 py-2 ${
            scrolled 
              ? 'bg-white/80 dark:bg-neutral-950/80 shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] border-black/[0.1] dark:border-white/[0.1] scale-95' 
              : 'bg-white/10 dark:bg-black/30'
          }`}
        >
          {/* Logo / Initials */}
          <a href="#hero" className="flex items-center gap-2 transition-all duration-300 hover:opacity-80">
            <img 
              src="/asset/logo.png" 
              alt="Logo" 
              className="h-5 w-auto object-contain" 
            />
            <span className="font-mono text-[9px] tracking-widest text-neutral-800 dark:text-white uppercase font-bold">
              {portfolioData.profile.firstName}
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[9px] lg:text-[10px] text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white uppercase tracking-widest font-medium font-sans transition-all duration-300 whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Controls: Lang + Theme + Hamburger */}
          <div className="flex items-center gap-2">
            {/* Lang Toggle */}
            <button
              onClick={toggleLang}
              className="w-9 h-9 flex items-center justify-center rounded-full btn-glass-secondary btn-pressable cursor-pointer text-[9px] font-mono font-bold"
            >
              {lang === 'vi' ? 'EN' : 'VI'}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-full btn-glass-secondary btn-pressable cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <HugeiconsIcon icon={Sun01Icon} className="w-3.5 h-3.5" /> : <HugeiconsIcon icon={Moon01Icon} className="w-3.5 h-3.5" />}
            </button>

            {/* Hamburger / Terminal Toggle button */}
            <button
              onClick={toggleMenu}
              aria-label="Toggle Menu"
              className="w-9 h-9 flex items-center justify-center rounded-full btn-glass-secondary transition-all duration-300 ease-out-custom group relative active:scale-95 cursor-pointer"
            >
              <div className="w-5 h-4 flex items-center justify-center relative z-50">
                {/* Mobile: Hamburger lines */}
                <span className={`md:hidden w-4 h-0.5 bg-neutral-600 dark:bg-neutral-300 rounded transition-all duration-500 absolute ${isOpen ? 'rotate-45 top-2' : 'top-1'}`}></span>
                <span className={`md:hidden w-4 h-0.5 bg-neutral-600 dark:bg-neutral-300 rounded transition-all duration-300 absolute top-2 ${isOpen ? 'opacity-0 scale-x-0' : ''}`}></span>
                <span className={`md:hidden w-4 h-0.5 bg-neutral-600 dark:bg-neutral-300 rounded transition-all duration-500 absolute ${isOpen ? '-rotate-45 top-2' : 'top-3'}`}></span>
                
                {/* Desktop: Terminal Shell Toggle (>_) */}
                <span className={`hidden md:block font-mono text-[10px] font-bold tracking-tighter transition-all duration-500 ${isOpen ? 'text-red-500 scale-110' : 'text-neutral-600 dark:text-neutral-300'}`}>
                  {isOpen ? '✕' : '>_'}
                </span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Expanded Staggered Modal Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-3xl transition-all duration-700 ease-out-custom flex items-start lg:items-center justify-center overflow-y-auto py-24 lg:py-0 math-grid ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="w-full max-w-5xl px-6 md:px-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-20">
          {/* Navigation Links */}
          <nav className="flex flex-col gap-4 md:gap-6">
            {navLinks.map((link, idx) => (
              <div 
                key={link.name} 
                className="overflow-hidden py-1"
              >
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  style={{
                    transitionDelay: `${idx * 60}ms`
                  }}
                  className={`block font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-400 dark:text-neutral-500 hover:text-accent-violet hover:translate-x-3 transition-all duration-500 ease-out-custom transform ${
                    isOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                  }`}
                >
                  <span className="font-mono text-xs md:text-sm mr-4 text-neutral-400/40">0{idx + 1} //</span>
                  {link.name}
                </a>
              </div>
            ))}
          </nav>

          {/* Socials & Live Terminal panel */}
          <div 
            style={{ transitionDelay: '250ms' }}
            className={`flex-1 flex flex-col gap-6 border-t border-black/[0.08] dark:border-white/[0.08] lg:border-t-0 lg:border-l lg:pl-16 pt-8 lg:pt-0 transition-all duration-700 ease-out-custom transform ${
              isOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
          >
            {/* Contact details */}
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-[8px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-1 font-mono">
                    {lang === 'vi' ? "Email liên hệ" : "Direct Email"}
                  </p>
                  <a href={`mailto:${portfolioData.profile.email}`} className="text-xs md:text-sm font-mono text-neutral-600 dark:text-neutral-300 hover:text-accent-violet transition-colors duration-300 flex items-center gap-1 group w-max">
                    {portfolioData.profile.email}
                    <HugeiconsIcon icon={ArrowUpRightIcon} className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500 group-hover:text-accent-violet group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </a>
                </div>

                {portfolioData.profile.phone && (
                  <div>
                    <p className="text-[8px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-1 font-mono">
                      {lang === 'vi' ? "Số điện thoại" : "Phone Number"}
                    </p>
                    <a href={`tel:${portfolioData.profile.phone}`} className="text-xs md:text-sm font-mono text-neutral-600 dark:text-neutral-300 hover:text-accent-violet transition-colors duration-300 flex items-center gap-1 group w-max">
                      {portfolioData.profile.phone}
                      <HugeiconsIcon icon={ArrowUpRightIcon} className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500 group-hover:text-accent-violet group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                    </a>
                  </div>
                )}
              </div>

              <div>
                <p className="text-[8px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-2 font-mono">
                  {lang === 'vi' ? "Mạng xã hội" : "Socials"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {portfolioData.profile.github && (
                    <a href={portfolioData.profile.github} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-black/[0.02] dark:bg-white/[0.03] hover:bg-black/[0.05] dark:hover:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors duration-300 animate-btn-hover">
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {portfolioData.profile.linkedin && (
                    <a href={portfolioData.profile.linkedin} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-black/[0.02] dark:bg-white/[0.03] hover:bg-black/[0.05] dark:hover:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors duration-300 animate-btn-hover">
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {portfolioData.profile.facebook && (
                    <a href={portfolioData.profile.facebook} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-black/[0.02] dark:bg-white/[0.03] hover:bg-black/[0.05] dark:hover:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors duration-300 animate-btn-hover">
                      <Facebook className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {portfolioData.profile.youtube && (
                    <a href={portfolioData.profile.youtube} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-black/[0.02] dark:bg-white/[0.03] hover:bg-black/[0.05] dark:hover:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors duration-300 animate-btn-hover">
                      <Youtube className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {portfolioData.profile.instagram && (
                    <a href={portfolioData.profile.instagram} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-black/[0.02] dark:bg-white/[0.03] hover:bg-black/[0.05] dark:hover:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors duration-300 animate-btn-hover">
                      <Instagram className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Interactive Terminal Panel */}
            <div className="w-full h-[180px] lg:h-[220px]">
              <MenuTerminal lang={lang} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
