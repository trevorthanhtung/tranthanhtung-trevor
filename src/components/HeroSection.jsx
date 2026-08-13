import React from 'react';
import { useApp } from './AppContext';

export default function HeroSection() {
  const { lang } = useApp();

  return (
    <section id="hero" className="w-full min-h-[90vh] flex flex-col justify-center bg-[var(--color-paper)] border-b-[3px] border-[var(--color-rule)] px-6 py-24 relative overflow-hidden">
      
      {/* Background Decorative Grid - brutalist dots */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20" 
           style={{ backgroundImage: 'radial-gradient(var(--color-ink) 2px, transparent 2px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="max-w-7xl mx-auto w-full z-10">

        {/* Manifesto Display */}
        <h1 className="manifesto-header font-display text-[var(--color-ink)]">
          {lang === 'vi' ? (
            <>
              TƯ DUY <em className="block-accent">LOGIC.</em><br />
              KỸ NGHỆ<br />
              PHẦN MỀM.
            </>
          ) : (
            <>
              LOGICAL <em className="block-accent">THINKING.</em><br />
              SOFTWARE<br />
              ENGINEERING.
            </>
          )}
        </h1>

        {/* Claim / Subtext */}
        <div className="mt-16 w-full max-w-3xl border-l-4 border-[var(--color-accent)] pl-8">
          <p className="text-xl md:text-3xl font-body font-medium text-[var(--color-ink-2)]">
            {lang === 'vi' ? 
              'Tôi là sinh viên ngành Toán Ứng Dụng. Tôi xây dựng các ứng dụng thực dụng bằng tư duy giải thuật chặt chẽ, từ chối sự phức tạp thừa thãi.' 
              : 
              'Applied Mathematics student. I build utilitarian applications using rigorous algorithmic thinking, rejecting unnecessary complexity.'}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-20 flex flex-col sm:flex-row gap-6">
          <a href="#projects" className="btn-brutal-primary !text-lg !px-10 !py-5">
            {lang === 'vi' ? 'Khám phá dự án' : 'Explore Projects'}
          </a>
          <a href="https://github.com/trevorthanhtung" target="_blank" rel="noreferrer" className="btn-brutal-outline !text-lg !px-10 !py-5">
            GitHub
          </a>
        </div>

      </div>
    </section>
  );
}
