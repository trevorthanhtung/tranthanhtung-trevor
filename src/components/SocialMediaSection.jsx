import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUpRightIcon } from '@hugeicons/core-free-icons';
import { YoutubeIcon as Youtube } from './SocialIcons';
import { useApp } from './AppContext';
import { portfolioData } from '../data/portfolioData';

export default function SocialMediaSection() {
  const { lang } = useApp();

  return (
    <section id="media" className="w-full bg-[var(--color-paper-2)] border-b-[3px] border-[var(--color-rule)]">
      
      {/* S1 Left Margin Numbered */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row border-b-[3px] border-[var(--color-rule)]">
        <div className="lg:w-1/4 p-6 lg:p-12 lg:border-r-[3px] border-[var(--color-rule)] flex items-start">
          <span className="font-mono text-2xl font-black text-[var(--color-ink)]">03 /</span>
        </div>
        <div className="lg:w-3/4 p-6 lg:p-12">
          <h2 className="font-display text-5xl md:text-7xl font-extrabold uppercase tracking-tighter text-[var(--color-ink)] mb-6">
            {lang === 'vi' ? 'Truyền thông' : 'Media'}
          </h2>
          <p className="font-mono text-lg max-w-2xl text-[var(--color-ink-2)]">
            {lang === 'vi' ? 'Sáng tạo nội dung, review ẩm thực và vlog trải nghiệm.' : 'Content creation, food reviews, and lifestyle vlogs.'}
          </p>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto p-6 lg:p-12">
        <div className="brutal-card p-6 md:p-10 bg-[var(--color-paper)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 pb-6 border-b-[3px] border-[var(--color-rule)]">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 brutal-border flex items-center justify-center bg-[var(--color-paper-2)] text-red-600 shrink-0">
                <Youtube className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-display font-black text-3xl uppercase text-[var(--color-ink)]">YouTube Channel</h3>
                <p className="font-mono text-sm font-bold text-[var(--color-ink-3)]">@kat.thanhtungg</p>
              </div>
            </div>

            <a
              href={portfolioData.profile.youtube}
              target="_blank"
              rel="noreferrer"
              className="btn-brutal-primary !py-3 !px-6 text-sm"
            >
              {lang === 'vi' ? 'Khám phá kênh' : 'Visit Channel'}
              <HugeiconsIcon icon={ArrowUpRightIcon} className="w-5 h-5 ml-2" />
            </a>
          </div>

          <p className="font-body text-lg text-[var(--color-ink-2)] leading-relaxed mb-8">
            {lang === 'vi'
              ? 'Nơi tôi chia sẻ những trải nghiệm khám phá ẩm thực độc đáo, các món ăn ngon cùng những thước phim vlog xoay quanh cuộc sống thường ngày.'
              : 'My dedicated space for sharing exciting food reviews, culinary discoveries, and personal daily life vlogs.'}
          </p>

          <div className="flex flex-wrap gap-3 pt-6 border-t-[3px] border-[var(--color-rule)]">
            {(lang === 'vi'
              ? ['Vlog đời thường', 'Review ẩm thực', 'Khám phá quán ngon']
              : ['Daily Life Vlogs', 'Food Reviews', 'Culinary Discoveries']
            ).map((topic) => (
              <span key={topic} className="font-mono text-xs font-bold uppercase tracking-widest px-4 py-2 border-2 border-[var(--color-ink)] text-[var(--color-ink)] bg-[var(--color-paper-2)]">
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

