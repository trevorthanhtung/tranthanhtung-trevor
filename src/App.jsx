import React, { useState, useEffect } from 'react';
import FloatingNavbar from './components/FloatingNavbar';
import HeroSection from './components/HeroSection';
import BentoGrid from './components/BentoGrid';
import SkillsMesh from './components/SkillsMesh';
import TechnicalMarquee from './components/TechnicalMarquee';
import ExperienceTimeline from './components/ExperienceTimeline';
import SocialMediaSection from './components/SocialMediaSection';
import ContactForm from './components/ContactForm';
import { AppProvider, useApp } from './components/AppContext';
import { portfolioData } from './data/portfolioData';

function AppContent() {
  const { theme, lang } = useApp();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Force scroll to top on fresh load/refresh and disable scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let animationFrameId;
    const updateGlow = () => {
      setGlowPos((prev) => {
        const dx = mousePos.x - prev.x;
        const dy = mousePos.y - prev.y;
        return {
          x: prev.x + dx * 0.07,
          y: prev.y + dy * 0.07,
        };
      });
      animationFrameId = requestAnimationFrame(updateGlow);
    };
    updateGlow();
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePos]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-background text-neutral-900 dark:text-neutral-100 font-sans select-none transition-colors duration-700 ease-out-custom">

      {/* Interactive mouse trailing glow sphere (Damped physics) */}
      <div
        style={{
          transform: `translate3d(${glowPos.x - 200}px, ${glowPos.y - 200}px, 0)`,
        }}
        className="fixed w-[400px] h-[400px] rounded-full bg-accent-violet/6 dark:bg-accent-violet/10 blur-[120px] pointer-events-none z-0 transition-all duration-700 hidden md:block"
      />

      {/* Dynamic Background Texture/Atmosphere (Fixed position) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft glowing mesh background orbs */}
        <div className="absolute top-0 right-[10%] w-[80vw] h-[80vw] md:w-[55vw] md:h-[55vw] rounded-full mesh-glow-1 animate-morph-liquid-1 opacity-40 dark:opacity-65 transition-opacity duration-700"></div>
        <div className="absolute bottom-0 left-[-10%] w-[90vw] h-[90vw] md:w-[65vw] md:h-[65vw] rounded-full mesh-glow-2 animate-morph-liquid-2 opacity-35 dark:opacity-45 transition-opacity duration-700"></div>
      </div>

      {/* Floating Menu */}
      <FloatingNavbar />

      {/* Main Content Layout */}
      <main className="relative z-10 mx-auto w-full">
        {/* Hero Section */}
        <HeroSection />

        {/* Bento Grid Projects */}
        <BentoGrid />

        {/* Skills Mesh */}
        <SkillsMesh />

        {/* Technical Marquee */}
        <TechnicalMarquee />

        {/* Experience Timeline */}
        <ExperienceTimeline />

        {/* Social Media Content Creation */}
        <SocialMediaSection />

        {/* Contact Form */}
        <ContactForm />
      </main>

      {/* Simple Premium Footer */}
      <footer className="relative z-10 py-16 border-t border-black/[0.04] dark:border-white/[0.05] bg-neutral-100/30 dark:bg-neutral-950/20 backdrop-blur-sm text-center px-4 transition-colors duration-700">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img
              src="/asset/logo.png"
              alt="Logo"
              className="h-8 w-auto opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500"
            />
            <div className="text-left text-neutral-400 dark:text-neutral-500 text-[10px] font-sans font-light leading-snug">
              <p className="font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-widest">{portfolioData.profile.fullName}</p>
              <p>© {new Date().getFullYear()}. {lang === 'vi' ? 'Thiết kế & Lập trình.' : 'Designed & Engineered.'}</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-neutral-400 dark:text-neutral-500 text-xs font-sans font-light">
            {portfolioData.profile.github && <a href={portfolioData.profile.github} target="_blank" rel="noreferrer" className="hover:text-neutral-950 dark:hover:text-white transition-colors duration-300">GitHub</a>}
            {portfolioData.profile.linkedin && <a href={portfolioData.profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-neutral-950 dark:hover:text-white transition-colors duration-300">LinkedIn</a>}
            {portfolioData.profile.facebook && <a href={portfolioData.profile.facebook} target="_blank" rel="noreferrer" className="hover:text-neutral-950 dark:hover:text-white transition-colors duration-300">Facebook</a>}
            {portfolioData.profile.youtube && <a href={portfolioData.profile.youtube} target="_blank" rel="noreferrer" className="hover:text-neutral-950 dark:hover:text-white transition-colors duration-300">YouTube</a>}
            {portfolioData.profile.tiktok && <a href={portfolioData.profile.tiktok} target="_blank" rel="noreferrer" className="hover:text-neutral-950 dark:hover:text-white transition-colors duration-300">TikTok</a>}
            {portfolioData.profile.instagram && <a href={portfolioData.profile.instagram} target="_blank" rel="noreferrer" className="hover:text-neutral-950 dark:hover:text-white transition-colors duration-300">Instagram</a>}
          </div>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 w-10 h-10 rounded-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] hover:border-accent-violet dark:hover:border-accent-violet text-neutral-800 dark:text-neutral-200 hover:text-accent-violet dark:hover:text-accent-violet hover:-translate-y-1 active:translate-y-0 transition-all duration-500 ease-out-custom shadow-lg cursor-pointer flex items-center justify-center ${
          showScrollTop ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
        </svg>
      </button>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
