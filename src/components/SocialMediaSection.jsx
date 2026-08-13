import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUpRightIcon } from '@hugeicons/core-free-icons';
import { YoutubeIcon as Youtube } from './SocialIcons';
import { useApp } from './AppContext';
import { portfolioData } from '../data/portfolioData';

export default function SocialMediaSection() {
  const { lang } = useApp();

  return (
    <section id="media" className="py-24 px-6 md:px-8 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="mb-14 text-left">
        <span className="inline-block px-3 py-1 rounded-full bg-[var(--color-paper-2)] border border-[var(--color-rule)] text-xs text-[var(--color-accent)] font-mono font-semibold uppercase mb-3">
          {lang === 'vi' ? "Truyền thông & Sáng tạo" : "Media & Content Creation"}
        </span>
        <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[var(--color-ink)] tracking-tight mb-4">
          {lang === 'vi' ? "SÁNG TẠO NỘI DUNG" : "CONTENT CREATION"}
        </h2>
        <p className="max-w-xl text-sm md:text-base text-[var(--color-ink-2)] font-body leading-relaxed">
          {lang === 'vi'
            ? "Chia sẻ trải nghiệm cuộc sống, khám phá ẩm thực và hành trình cá nhân qua các video vlog."
            : "Sharing daily life experiences, culinary discoveries, and personal vlogs."}
        </p>
      </div>

      {/* YouTube Channel Card */}
      <div className="hallmark-card p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[var(--color-rule)]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
              <Youtube className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-bold text-2xl text-[var(--color-ink)]">YouTube</h3>
              <p className="font-mono text-xs text-[var(--color-ink-3)]">@kat.thanhtungg</p>
            </div>
          </div>

          <a
            href={portfolioData.profile.youtube}
            target="_blank"
            rel="noreferrer"
            className="btn-hallmark-primary !py-2 !px-4 text-xs font-mono"
          >
            {lang === 'vi' ? 'Xem kênh' : 'Visit Channel'}
            <HugeiconsIcon icon={ArrowUpRightIcon} className="w-4 h-4" />
          </a>
        </div>

        <p className="text-sm text-[var(--color-ink-2)] font-body leading-relaxed mb-6">
          {lang === 'vi'
            ? 'Nơi tôi chia sẻ những trải nghiệm khám phá ẩm thực độc đáo, các món ăn ngon cùng những thước phim vlog xoay quanh cuộc sống thường ngày.'
            : 'My space for sharing exciting food reviews, culinary discoveries, and personal daily life vlogs.'}
        </p>

        <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--color-rule)]">
          {(lang === 'vi'
            ? ['Vlog đời thường', 'Review ẩm thực', 'Khám phá quán ngon']
            : ['Daily Life Vlogs', 'Food Reviews', 'Culinary Discoveries']
          ).map((topic) => (
            <span key={topic} className="px-3 py-1 rounded-md bg-[var(--color-paper-3)] border border-[var(--color-rule)] font-mono text-xs text-[var(--color-ink-2)]">
              {topic}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
