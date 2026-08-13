import React, { useState } from 'react';
import { useApp } from './AppContext';
import { portfolioData } from '../data/portfolioData';

const skillCategories = [
  {
    id: 'ai',
    title: { vi: 'Phát triển Cộng tác AI', en: 'AI-Augmented Engineering' },
    code: 'AI_AUGMENTED',
    items: ['Antigravity', 'Codex', 'Kiro AI', 'ZCode', 'Prompt Engineering'],
    desc: {
      vi: 'Ứng dụng các mô hình ngôn ngữ lớn để lập trình nhanh chóng, tối ưu hóa năng suất và làm chủ quy trình phát triển.',
      en: 'Leveraging LLMs for rapid software prototyping, optimizing engineering workflows and programmatic logic.'
    }
  },
  {
    id: 'logic',
    title: { vi: 'Lập trình Cốt lõi & Logic', en: 'Core Programming & Logic' },
    code: 'CORE_LOGIC',
    items: ['Python', 'Tư duy Thuật toán', 'Toán học tính toán', 'Git & GitHub'],
    desc: {
      vi: 'Nền tảng tư duy toán học thuần túy, mô hình hóa giải thuật tính toán và thiết kế cấu trúc dữ liệu cơ sở.',
      en: 'Foundations of pure mathematical thinking, computational algorithm modeling, and core programming paradigms.'
    }
  },
  {
    id: 'stack',
    title: { vi: 'Công nghệ vận hành AI', en: 'AI-Enabled Tech Stack' },
    code: 'TECH_STACK',
    items: ['React & Vite', 'TypeScript', 'Tailwind CSS', 'IndexedDB (Dexie.js)', 'Supabase'],
    desc: {
      vi: 'Bộ công cụ phát triển ứng dụng Web hoàn chỉnh (PWA), tối ưu hóa trải nghiệm người dùng ngoại tuyến và trực tuyến.',
      en: 'Modern development stack optimized for Progressive Web Apps, local cache layers, and backend cloud syncing.'
    }
  },
  {
    id: 'support',
    title: { vi: 'Năng lực Bổ trợ', en: 'Supplemental Skills' },
    code: 'SUPPLEMENTAL',
    items: ['Aptis General B1', 'MOS Word & Excel'],
    desc: {
      vi: 'Khả năng giao tiếp kỹ thuật ngoại ngữ và ứng dụng văn phòng cơ bản hỗ trợ quản trị và lập kế hoạch.',
      en: 'English proficiency for technical communication alongside corporate documentation and database spreadsheets.'
    }
  }
];

export default function SkillsMesh() {
  const { lang } = useApp();
  const [activeCategory, setActiveCategory] = useState(skillCategories[0]);

  return (
    <section id="skills" className="py-24 px-6 md:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="mb-14 text-left">
        <span className="inline-block px-3 py-1 rounded-full bg-[var(--color-paper-2)] border border-[var(--color-rule)] text-xs text-[var(--color-accent)] font-mono font-semibold uppercase mb-3">
          {lang === 'vi' ? "Hệ thống Kỹ năng" : "Technical Capability Matrix"}
        </span>
        <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[var(--color-ink)] tracking-tight mb-4">
          {lang === 'vi' ? "NĂNG LỰC KỸ THUẬT" : "ENGINEERING MATRIX"}
        </h2>
        <p className="max-w-xl text-sm md:text-base text-[var(--color-ink-2)] font-body leading-relaxed">
          {lang === 'vi'
            ? "Tối ưu hóa năng suất phát triển bằng AI kết hợp chặt chẽ với tư duy toán học tính toán."
            : "Optimizing software throughput using AI pair-programming tied to mathematical reasoning."}
        </p>
      </div>

      {/* Grid Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {skillCategories.map((cat) => {
          const isSelected = activeCategory.id === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat)}
              className={`hallmark-card p-5 text-left cursor-pointer transition-all ${
                isSelected ? '!border-[var(--color-accent)] bg-[var(--color-paper-3)]' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-[var(--color-ink-3)] font-semibold">{cat.code}</span>
                <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-rule)]'}`} />
              </div>
              <h3 className="font-display font-bold text-lg text-[var(--color-ink)] mb-2">
                {cat.title[lang]}
              </h3>
              <p className="text-xs text-[var(--color-ink-2)] font-body line-clamp-2">
                {cat.desc[lang]}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Inspector */}
      <div className="hallmark-card p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-[var(--color-rule)]">
          <div>
            <span className="font-mono text-xs text-[var(--color-accent)] font-semibold uppercase">
              {activeCategory.code} INSPECTOR
            </span>
            <h3 className="font-display font-bold text-2xl text-[var(--color-ink)] mt-1">
              {activeCategory.title[lang]}
            </h3>
          </div>
          <span className="font-mono text-xs text-[var(--color-ink-3)]">
            {activeCategory.items.length} {lang === 'vi' ? 'công cụ/kỹ năng' : 'tools/skills'}
          </span>
        </div>

        <p className="text-sm text-[var(--color-ink-2)] font-body leading-relaxed mb-6">
          {activeCategory.desc[lang]}
        </p>

        <div className="flex flex-wrap gap-2.5">
          {activeCategory.items.map((item) => (
            <span
              key={item}
              className="px-3 py-1.5 rounded-lg bg-[var(--color-paper-3)] border border-[var(--color-rule)] font-mono text-xs text-[var(--color-ink)]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
