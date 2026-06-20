import React, { useEffect, useState, useRef } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ChevronRightIcon } from '@hugeicons/core-free-icons';
import { GithubIcon as Github } from './SocialIcons';
import { portfolioData } from '../data/portfolioData';
import { useApp } from './AppContext';
import MagneticButton from './MagneticButton';

function MathFunctionPlot() {
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollYRef = useRef(0);
  const phaseRef = useRef(0);
  const path1Ref = useRef(null);
  const path2Ref = useRef(null);
  const eqTextRef = useRef(null);
  const coordTextRef = useRef(null);
  const controlTextRef = useRef(null);
  const svgRef = useRef(null);
  
  const isStabilizingRef = useRef(false);
  const stabilizeTimeRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mouseRef.current = { x, y };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleImpulse = () => {
      isStabilizingRef.current = true;
      stabilizeTimeRef.current = 0;
    };
    window.addEventListener('hero-wave-impulse', handleImpulse);
    return () => window.removeEventListener('hero-wave-impulse', handleImpulse);
  }, []);

  // RequestAnimationFrame loop for high-performance direct DOM updates
  useEffect(() => {
    let animationId;
    const animate = () => {
      phaseRef.current += 0.025;

      const mouse = mouseRef.current;
      const scrollY = scrollYRef.current;
      const phase = phaseRef.current;

      // Base parameters fluctuate dynamically over time (biến thiên)
      const baseAmplitude = 65 + Math.sin(phase * 0.35) * 15;
      const baseFrequency = 0.016 + Math.cos(phase * 0.2) * 0.004;

      // Dynamic perturbation simulation for Control System Easter Egg
      let ampOffset = 0;
      let freqOffset = 0;
      if (isStabilizingRef.current) {
        stabilizeTimeRef.current += 0.016; // Increment elapsed time (assuming 60fps ~16.6ms)
        const t = stabilizeTimeRef.current;
        if (t > 4.5) {
          isStabilizingRef.current = false;
        } else {
          // Decaying oscillations represent an underdamped system dynamic response
          const envelope = Math.exp(-1.4 * t); // Exp decay
          const oscillation = Math.sin(14 * t); // Oscillatory frequency
          ampOffset = envelope * oscillation * 130; // Amplitude spike
          freqOffset = envelope * oscillation * 0.035; // Frequency spike
        }
      }

      const amplitude = Math.max(10, baseAmplitude + mouse.y * 20 + ampOffset);
      const frequency = Math.max(0.002, baseFrequency + mouse.x * 0.005 + freqOffset);
      const phaseShift = phase + scrollY * 0.012;

      // Draw primary wave
      const points = [];
      for (let x = 0; x <= 1200; x += 10) {
        const angle = x * frequency + phaseShift;
        const waveTerm = Math.sin(angle);
        const y = 300 + waveTerm * amplitude * Math.cos(x * 0.0015);
        points.push(`${x},${y}`);
      }
      if (path1Ref.current) {
        path1Ref.current.setAttribute('d', `M ${points.join(' L ')}`);
      }

      // Draw secondary wave
      const pointsHarmonic = [];
      for (let x = 0; x <= 1200; x += 10) {
        const angle = x * frequency * 1.5 + 1.2 + phaseShift * 0.75;
        const waveTerm = Math.cos(angle);
        const y = 300 + waveTerm * (amplitude * 0.45) * Math.sin(x * 0.001);
        pointsHarmonic.push(`${x},${y}`);
      }
      if (path2Ref.current) {
        path2Ref.current.setAttribute('d', `M ${pointsHarmonic.join(' L ')}`);
      }

      // Update text values directly
      if (eqTextRef.current) {
        eqTextRef.current.textContent = `y = ${amplitude.toFixed(1)} · sin(${frequency.toFixed(4)}x + ${phase.toFixed(2)}) · cos(0.0015x)`;
      }
      if (coordTextRef.current) {
        const mx = ((mouse.x + 1) * 600).toFixed(0);
        const my = ((mouse.y + 1) * 300).toFixed(0);
        coordTextRef.current.textContent = `x_coord = ${mx}px | y_coord = ${my}px`;
      }
      if (controlTextRef.current) {
        if (isStabilizingRef.current) {
          const t = stabilizeTimeRef.current;
          if (t < 1.2) {
            controlTextRef.current.textContent = `SYSTEM STATE: IMPULSE PERTURBATION (OVERSHOOT) | e(t) = ${(Math.exp(-1.4*t)*Math.sin(14*t)).toFixed(3)}`;
            controlTextRef.current.setAttribute('class', 'font-mono text-[8px] fill-amber-500/60 dark:fill-amber-400/60 font-semibold uppercase tracking-wider');
          } else if (t < 3.2) {
            controlTextRef.current.textContent = `SYSTEM STATE: CLOSED-LOOP STABILIZING (DAMPING) | e(t) = ${(Math.exp(-1.4*t)*Math.sin(14*t)).toFixed(3)}`;
            controlTextRef.current.setAttribute('class', 'font-mono text-[8px] fill-cyan-500/60 dark:fill-cyan-400/60 font-medium uppercase tracking-wider');
          } else {
            controlTextRef.current.textContent = 'SYSTEM STATE: CONVERGING TO STEADY STATE | e(t) -> 0';
            controlTextRef.current.setAttribute('class', 'font-mono text-[8px] fill-emerald-500/60 dark:fill-emerald-400/60 font-light uppercase tracking-wider');
          }
        } else {
          controlTextRef.current.textContent = 'SYSTEM STATE: ASYMPTOTICALLY STABLE (STEADY)';
          controlTextRef.current.setAttribute('class', 'font-mono text-[8px] fill-neutral-500/20 dark:fill-neutral-400/20 font-light uppercase tracking-wider');
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none">
      <svg 
        ref={svgRef} 
        viewBox="0 0 1200 600" 
        preserveAspectRatio="none"
        className="w-full h-full opacity-[0.06] dark:opacity-[0.14]"
      >
        {/* Ticks on borders */}
        {Array.from({ length: 24 }).map((_, i) => (
          <line key={`xt-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="6" className="stroke-neutral-900/20 dark:stroke-white/20" strokeWidth="1" />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={`yt-${i}`} x1="0" y1={i * 50} x2="6" y2={i * 50} className="stroke-neutral-900/20 dark:stroke-white/20" strokeWidth="1" />
        ))}

        {/* Major Grid Axes */}
        <line x1="600" y1="0" x2="600" y2="600" className="stroke-neutral-900/10 dark:stroke-white/10" strokeWidth="1" strokeDasharray="5 5" />
        <line x1="0" y1="300" x2="1200" y2="300" className="stroke-neutral-900/10 dark:stroke-white/10" strokeWidth="1" strokeDasharray="5 5" />
        
        {/* Primary math wave */}
        <path 
          ref={path1Ref}
          fill="none" 
          className="stroke-accent-violet transition-colors duration-300" 
          strokeWidth="2" 
        />
        {/* Secondary wave */}
        <path 
          ref={path2Ref}
          fill="none" 
          className="stroke-accent-cyan transition-colors duration-300" 
          strokeWidth="1.2" 
          strokeDasharray="4 4"
        />
        
        {/* Floating equation coordinates */}
        <text ref={eqTextRef} x="30" y="50" className="font-mono text-[9px] fill-neutral-500/50 dark:fill-neutral-400/50 font-light">
          y = 65.0 · sin(0.0160x + 0.00) · cos(0.0015x)
        </text>
        <text ref={coordTextRef} x="30" y="70" className="font-mono text-[9px] fill-neutral-500/50 dark:fill-neutral-400/50 font-light">
          x_coord = 600px | y_coord = 300px
        </text>
        <text ref={controlTextRef} x="30" y="90" className="font-mono text-[8px] fill-neutral-500/20 dark:fill-neutral-400/20 font-light uppercase tracking-wider">
          SYSTEM STATE: ASYMPTOTICALLY STABLE (STEADY)
        </text>
      </svg>
    </div>
  );
}

export default function HeroSection() {
  const { lang, geo } = useApp();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleHeroClick = (e) => {
    // Avoid triggering when clicking buttons, links or avatar group
    if (e.target.closest('button') || e.target.closest('a') || e.target.closest('.group') || e.target.closest('input') || e.target.closest('textarea')) {
      return;
    }
    // Dispatch custom event to trigger wave impulse
    window.dispatchEvent(new CustomEvent('hero-wave-impulse'));
  };

  return (
    <section
      id="hero"
      onClick={handleHeroClick}
      className="relative min-h-[100dvh] flex flex-col justify-center items-center py-32 overflow-hidden px-6 math-dots"
    >
      {/* Interactive Math Wave SVG background */}
      <MathFunctionPlot />

      {/* Visual Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-accent-violet/6 dark:bg-accent-violet/10 blur-[120px] pointer-events-none animate-pulse-slow z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] rounded-full bg-accent-cyan/4 dark:bg-accent-cyan/8 blur-[120px] pointer-events-none animate-pulse-slow z-0" style={{ animationDelay: '2.5s' }}></div>

      <div className="max-w-4xl mx-auto text-center z-10 flex flex-col items-center">
        {/* Avatar Image */}
        {portfolioData.profile.avatar && (
          <div
            className={`mb-10 transform transition-all duration-1000 ease-out-custom ${
              mounted ? 'scale-100 opacity-100 blur-0' : 'scale-90 opacity-0 blur-sm'
            }`}
          >
            <div className="relative group cursor-pointer">
              {/* Outer Glow Ring */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-accent-violet to-accent-cyan opacity-20 dark:opacity-40 blur-md group-hover:opacity-60 transition duration-700 group-hover:scale-105 animate-glow-pulse" />

              {/* Minimal double-border structure */}
              <div className="relative rounded-full p-1 bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] shadow-[0_12px_32px_rgba(0,0,0,0.05)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.4)]">
                <div className="rounded-full p-1 bg-white dark:bg-neutral-950 border border-neutral-100 dark:border-white/[0.02] overflow-hidden">
                  <img
                    src={portfolioData.profile.avatar}
                    alt={portfolioData.profile.fullName}
                    className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-full transition-transform duration-700 ease-out-custom group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mathematical/Technical coordinate tag */}
        <div
          style={{ transitionDelay: '75ms' }}
          className={`mb-6 transform transition-all duration-1000 ease-out-custom ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] text-[9px] text-neutral-500 dark:text-neutral-400 font-mono tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-violet animate-pulse"></span>
            {lang === 'vi' ? 'Hồ Sơ Năng Lực' : 'Portfolio'} | {geo.city} [{Math.abs(parseFloat(geo.lat)).toFixed(4)}°{parseFloat(geo.lat) >= 0 ? (lang === 'vi' ? 'B' : 'N') : 'S'}, {Math.abs(parseFloat(geo.lon)).toFixed(4)}°{parseFloat(geo.lon) >= 0 ? (lang === 'vi' ? 'Đ' : 'E') : 'W'}]
          </span>
        </div>

        {/* High-End Typographical Heading */}
        <h1
          style={{ transitionDelay: '200ms' }}
          className={`font-display font-extrabold text-5xl md:text-8xl tracking-tight leading-[0.9] text-neutral-900 dark:text-white transform transition-all duration-1000 ease-out-custom mb-8 ${
            mounted ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-12 opacity-0 blur-md'
          }`}
        >
          {lang === 'vi' ? (
            <>
              TƯ DUY LOGIC.<br />
              <span className="text-accent-violet font-sans italic font-normal text-neutral-400/80 dark:text-neutral-500">Phát Triển Web.</span>
            </>
          ) : (
            <>
              LOGICAL MIND.<br />
              <span className="text-accent-violet font-sans italic font-normal text-neutral-400/80 dark:text-neutral-500">Web Development.</span>
            </>
          )}
        </h1>

        {/* Subtitle / Bio */}
        <p
          style={{ transitionDelay: '350ms' }}
          className={`max-w-2xl text-neutral-600 dark:text-neutral-300 text-sm md:text-base leading-relaxed tracking-wide font-sans font-light mb-12 transform transition-all duration-1000 ease-out-custom ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          {lang === 'vi' ? 'Tôi là ' : "I am "}<strong className="text-neutral-900 dark:text-white font-medium">{portfolioData.profile.fullName}</strong>. {portfolioData.profile.bio[lang]}
        </p>

        {/* CTA Group */}
        <div
          style={{ transitionDelay: '500ms' }}
          className={`flex flex-col sm:flex-row items-center gap-6 transform transition-all duration-1000 ease-out-custom z-10 ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          <MagneticButton
            className="group px-6 py-3 rounded-full font-semibold text-[10px] tracking-widest uppercase flex items-center gap-4 cursor-pointer btn-glass-primary btn-shimmer"
            onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
          >
            {lang === 'vi' ? 'Xem Dự Án' : 'View Work'}
            <span className="w-6 h-6 rounded-full bg-white/15 dark:bg-black/10 flex items-center justify-center transition-all duration-300 ease-out-custom group-hover:translate-x-1 group-hover:bg-white/25 dark:group-hover:bg-black/20">
              <HugeiconsIcon icon={ChevronRightIcon} className="w-3.5 h-3.5 text-white dark:text-black" />
            </span>
          </MagneticButton>

          <a
            href={portfolioData.profile.github}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2.5 text-[10px] text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white font-semibold uppercase tracking-widest transition-colors duration-300"
          >
            <Github className="w-4 h-4 text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-950 group-hover:dark:text-white transition-colors duration-300" />
            {lang === 'vi' ? 'Hồ Sơ GitHub' : 'GitHub Profile'}
          </a>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <div
        style={{ transitionDelay: '650ms' }}
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 text-[8px] text-neutral-600 dark:text-neutral-400 tracking-[0.3em] uppercase transition-all duration-1000 ease-out-custom ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <span className="font-medium text-neutral-500 dark:text-neutral-400">{lang === 'vi' ? 'Cuộn Xuống' : 'Scroll Down'}</span>
        <div className="w-5 h-8 rounded-full border border-neutral-400 dark:border-neutral-600 flex justify-center p-1.5">
          <div className="w-1 h-1.5 rounded-full bg-neutral-600 dark:bg-neutral-300 animate-scroll-dot"></div>
        </div>
      </div>
    </section>
  );
}


