import React, { useEffect, useRef, useState } from 'react';
import { useApp } from './AppContext';

const skillNodes = [
  {
    id: 'logic',
    nameVi: 'Lập trình Cốt lõi & Logic',
    nameEn: 'Core Programming & Logic',
    gridLabelVi: ['Lập trình', 'Cốt lõi & Logic'],
    gridLabelEn: ['Core Programming', '& Logic'],
    x: -4.5,
    y: 5.5,
    color: 'stroke-amber-500 fill-amber-500',
    colorHex: '#f59e0b',
    glowColor: 'bg-amber-500/10 dark:bg-amber-500/20',
    items: ['Python', 'Tư duy Thuật toán', 'Toán học tính toán', 'Mô hình hóa & Lý thuyết điều khiển', 'Git & GitHub'],
    itemsEn: ['Python', 'Algorithmic Logic', 'Computational Math', 'System Modeling & Control Theory', 'Git & GitHub'],
    descVi: 'Nền tảng tư duy toán học thuần túy, mô hình hóa giải thuật, lý thuyết phản hồi điều khiển hệ thống và cấu trúc dữ liệu cốt lõi.',
    descEn: 'Foundations of mathematical modeling, algorithmic paradigms, system feedback control theory, and core computer science structures.'
  },
  {
    id: 'ai',
    nameVi: 'Phát triển Cộng tác AI',
    nameEn: 'AI-Augmented Engineering',
    gridLabelVi: ['Phát triển', 'Cộng tác AI'],
    gridLabelEn: ['AI-Augmented', 'Engineering'],
    x: 3.5,
    y: 7.0,
    color: 'stroke-emerald-500 fill-emerald-500',
    colorHex: '#10b981',
    glowColor: 'bg-emerald-500/10 dark:bg-emerald-500/20',
    items: ['Antigravity', 'Codex', 'Kiro AI', 'ZCode', 'Prompt Engineering'],
    itemsEn: ['Antigravity', 'Codex', 'Kiro AI', 'ZCode', 'Prompt Engineering'],
    descVi: 'Ứng dụng các mô hình ngôn ngữ lớn để lập trình nhanh chóng, tối ưu hóa năng suất và làm chủ quy trình phát triển.',
    descEn: 'Leveraging LLMs for rapid software prototyping, optimizing engineering workflows and programmatic logic.'
  },
  {
    id: 'stack',
    nameVi: 'Công nghệ vận hành qua AI',
    nameEn: 'AI-Enabled Tech Stack',
    gridLabelVi: ['Công nghệ', 'Vận hành AI'],
    gridLabelEn: ['AI-Enabled', 'Tech Stack'],
    x: 7.5,
    y: -2.0,
    color: 'stroke-cyan-500 fill-cyan-500',
    colorHex: '#06b6d4',
    glowColor: 'bg-cyan-500/10 dark:bg-cyan-500/20',
    items: ['React & Vite', 'TypeScript', 'Tailwind CSS', 'IndexedDB (Dexie.js)', 'Firebase Cloud'],
    itemsEn: ['React & Vite', 'TypeScript', 'Tailwind CSS', 'IndexedDB (Dexie.js)', 'Firebase Cloud'],
    descVi: 'Bộ công cụ phát triển ứng dụng Web hoàn chỉnh (PWA), tối ưu hóa trải nghiệm người dùng ngoại tuyến và trực tuyến.',
    descEn: 'Modern development stack optimized for Progressive Web Apps, local cache layers, and backend cloud syncing.'
  },
  {
    id: 'support',
    nameVi: 'Năng lực Bổ trợ',
    nameEn: 'Supplemental Skills',
    gridLabelVi: ['Năng lực', 'Bổ trợ'],
    gridLabelEn: ['Supplemental', 'Skills'],
    x: -6.5,
    y: -5.5,
    color: 'stroke-purple-500 fill-purple-500',
    colorHex: '#a855f7',
    glowColor: 'bg-purple-500/10 dark:bg-purple-500/20',
    items: ['Aptis General B1', 'MOS Word & Excel'],
    itemsEn: ['Aptis General B1', 'MOS Word & Excel'],
    descVi: 'Khả năng giao tiếp kỹ thuật ngoại ngữ và ứng dụng văn phòng cơ bản hỗ trợ quản trị và lập kế hoạch.',
    descEn: 'English proficiency for technical communication alongside corporate documentation and database spreadsheets.'
  }
];

export default function SkillsMesh() {
  const { lang } = useApp();
  const [inView, setInView] = useState(false);
  const [selectedNode, setSelectedNode] = useState(skillNodes[1]); // Default to AI
  const [hoveredNode, setHoveredNode] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const W = 600;
  const H = 500;
  const toSvgX = (x) => 300 + x * 25; // x range [-10, 10] -> [50, 550]
  const toSvgY = (y) => 250 - y * 20; // y range [-10, 10] -> [50, 450]

  const activeNode = hoveredNode || selectedNode;

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="py-32 px-6 md:px-8 max-w-6xl mx-auto overflow-hidden math-dots"
    >
      {/* Section Header */}
      <div className="mb-20 text-center">
        <span className="inline-block px-3 py-1 rounded-full bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] text-[9px] text-accent-cyan font-semibold tracking-wider uppercase mb-4 font-mono">
          {lang === 'vi' ? "Hệ tọa độ năng lực" : "Skills Coordinate System"}
        </span>
        <h2 className="font-display font-black text-4xl md:text-6xl text-neutral-900 dark:text-white tracking-tight leading-none mb-6">
          {lang === 'vi' ? (
            <>
              BẢN ĐỒ TỌA ĐỘ <br />
              <span className="font-sans italic font-normal text-neutral-400 dark:text-neutral-500">Kỹ Năng.</span>
            </>
          ) : (
            <>
              SKILLS COORDINATE <br />
              <span className="font-sans italic font-normal text-neutral-400 dark:text-neutral-500">Mapping.</span>
            </>
          )}
        </h2>
        <p className="max-w-md mx-auto text-xs md:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed font-sans font-light">
          {lang === 'vi'
            ? "Mô hình trực quan hóa các kỹ năng trên mặt phẳng Cartesian biểu diễn tỷ lệ giữa lý thuyết toán học logic và năng lực lập trình thực tiễn."
            : "A visual Cartesian plane plotting technical capabilities, mapping mathematical reasoning against practical software engineering stacks."}
        </p>
      </div>

      {/* Grid of Interactive Plotter & Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Interactive SVG Graph */}
        <div
          style={{ transitionDelay: '100ms' }}
          className={`lg:col-span-7 transform transition-all duration-1000 ease-out-custom ${
            inView ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-16 opacity-0 blur-md'
          }`}
        >
          <div className="blueprint-card h-full">
            <div className="blueprint-inner p-4 md:p-6 h-full flex flex-col justify-center relative overflow-hidden bg-white/40 dark:bg-neutral-950/45 backdrop-blur-md">
              <div className="absolute top-4 right-4 font-mono text-[7px] text-neutral-400 dark:text-neutral-600 pointer-events-none select-none">
                [PLOT_PLANE_2D // CARTESIAN]
              </div>

              {/* Responsive SVG Container */}
              <div className="w-full aspect-[6/5] relative">
                <svg 
                  viewBox={`0 0 ${W} ${H}`}
                  className="w-full h-full text-neutral-400 select-none overflow-visible"
                >
                  {/* Grid Lines */}
                  {Array.from({ length: 21 }).map((_, i) => {
                    const xVal = -10 + i;
                    const xPos = toSvgX(xVal);
                    return (
                      <line 
                        key={`x-grid-${i}`}
                        x1={xPos}
                        y1={30}
                        x2={xPos}
                        y2={470}
                        className="stroke-neutral-900/[0.04] dark:stroke-white/[0.04]"
                        strokeWidth={xVal === 0 ? "0" : "1"}
                      />
                    );
                  })}
                  {Array.from({ length: 21 }).map((_, i) => {
                    const yVal = -10 + i;
                    const yPos = toSvgY(yVal);
                    return (
                      <line 
                        key={`y-grid-${i}`}
                        x1={30}
                        y1={yPos}
                        x2={570}
                        y2={yPos}
                        className="stroke-neutral-900/[0.04] dark:stroke-white/[0.04]"
                        strokeWidth={yVal === 0 ? "0" : "1"}
                      />
                    );
                  })}

                  {/* X and Y Axes */}
                  <line x1="30" y1="250" x2="570" y2="250" className="stroke-neutral-900/30 dark:stroke-white/30" strokeWidth="1.5" />
                  <line x1="300" y1="30" x2="300" y2="470" className="stroke-neutral-900/30 dark:stroke-white/30" strokeWidth="1.5" />

                  {/* Axes Endpoints Labels */}
                  <text x="575" y="253" className="font-mono text-[7px] fill-neutral-400 dark:fill-neutral-500 font-bold" textAnchor="start">
                    {lang === 'vi' ? 'THỰC HÀNH (X+)' : 'PRACTICAL (X+)'}
                  </text>
                  <text x="25" y="253" className="font-mono text-[7px] fill-neutral-400 dark:fill-neutral-500 font-bold" textAnchor="end">
                    {lang === 'vi' ? 'LÝ THUYẾT (X-)' : 'LOGIC (X-)'}
                  </text>
                  <text x="300" y="22" className="font-mono text-[7px] fill-neutral-400 dark:fill-neutral-500 font-bold" textAnchor="middle">
                    {lang === 'vi' ? 'TOÁN HỌC / THUẬT TOÁN (Y+)' : 'MATHS / ALGORITHMS (Y+)'}
                  </text>
                  <text x="300" y="482" className="font-mono text-[7px] fill-neutral-400 dark:fill-neutral-500 font-bold" textAnchor="middle">
                    {lang === 'vi' ? 'KỸ NĂNG BỔ TRỢ (Y-)' : 'SUPPLEMENTAL (Y-)'}
                  </text>

                  {/* Origin Indicator */}
                  <circle cx="300" cy="250" r="3" className="fill-neutral-400/40" />

                  {/* Live Projection Lines for Active Node */}
                  {activeNode && (
                    <g className="transition-all duration-300">
                      {/* Projection to X-Axis */}
                      <line 
                        x1={toSvgX(activeNode.x)}
                        y1={toSvgY(activeNode.y)}
                        x2={toSvgX(activeNode.x)}
                        y2={250}
                        className="stroke-neutral-400/50 dark:stroke-neutral-500/50"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                      />
                      {/* Projection to Y-Axis */}
                      <line 
                        x1={toSvgX(activeNode.x)}
                        y1={toSvgY(activeNode.y)}
                        x2={300}
                        y2={toSvgY(activeNode.y)}
                        className="stroke-neutral-400/50 dark:stroke-neutral-500/50"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                      />

                      {/* X intercept marker */}
                      <circle cx={toSvgX(activeNode.x)} cy="250" r="2.5" className="fill-accent-cyan" />
                      <text x={toSvgX(activeNode.x)} y={activeNode.y >= 0 ? 262 : 242} className="font-mono text-[8px] fill-accent-cyan font-bold" textAnchor="middle">
                        x = {activeNode.x.toFixed(1)}
                      </text>

                      {/* Y intercept marker */}
                      <circle cx="300" cy={toSvgY(activeNode.y)} r="2.5" className="fill-accent-cyan" />
                      <text x={activeNode.x >= 0 ? 288 : 312} y={toSvgY(activeNode.y) + 3} className="font-mono text-[8px] fill-accent-cyan font-bold" textAnchor={activeNode.x >= 0 ? 'end' : 'start'}>
                        y = {activeNode.y.toFixed(1)}
                      </text>
                    </g>
                  )}

                  {/* Skill Nodes */}
                  {skillNodes.map((node) => {
                    const cx = toSvgX(node.x);
                    const cy = toSvgY(node.y);
                    const isSelected = selectedNode.id === node.id;
                    const isActive = activeNode.id === node.id;

                    return (
                      <g 
                        key={node.id}
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredNode(node)}
                        onMouseLeave={() => setHoveredNode(null)}
                        onClick={() => setSelectedNode(node)}
                      >
                        {/* Hover radius helper */}
                        <circle cx={cx} cy={cy} r="25" className="fill-transparent" />

                        {/* Outer Glow Circle */}
                        <circle 
                          cx={cx} 
                          cy={cy} 
                          r={isSelected ? "14" : "8"} 
                          fill="none" 
                          stroke={node.colorHex}
                          strokeWidth="1" 
                          className={`opacity-30 dark:opacity-40 transition-all duration-300 ${
                            isActive ? 'scale-125 opacity-60 animate-ping-slow' : ''
                          }`}
                          style={{ transformOrigin: `${cx}px ${cy}px` }}
                        />

                        {/* Primary Node Circle */}
                        <circle 
                          cx={cx} 
                          cy={cy} 
                          r={isSelected ? "7" : "5"} 
                          className={`transition-all duration-300 ${node.color} ${
                            isActive ? 'scale-110 shadow-lg' : 'opacity-85'
                          }`}
                          style={{ transformOrigin: `${cx}px ${cy}px` }}
                        />

                        {/* Node Center White Core */}
                        <circle cx={cx} cy={cy} r="2" className="fill-white dark:fill-neutral-900" />

                        {/* Text Label */}
                        <text 
                          x={cx} 
                          y={cy - (isSelected ? 18 : 14)} 
                          className={`font-mono text-[7px] font-bold text-center transition-all duration-300 ${
                            isActive 
                              ? 'fill-neutral-900 dark:fill-white text-[8px] font-extrabold' 
                              : 'fill-neutral-500/70 dark:fill-neutral-400/70'
                          }`}
                          textAnchor="middle"
                        >
                          {(lang === 'vi' ? node.gridLabelVi : node.gridLabelEn).map((line, idx) => (
                            <tspan key={idx} x={cx} dy={idx === 0 ? 0 : 8}>
                              {line}
                            </tspan>
                          ))}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

            </div>
          </div>
        </div>

        {/* Right Column: Node Inspector */}
        <div
          style={{ transitionDelay: '250ms' }}
          className={`lg:col-span-5 transform transition-all duration-1000 ease-out-custom ${
            inView ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-16 opacity-0 blur-md'
          }`}
        >
          <div className="blueprint-card h-full">
            <div className="blueprint-inner p-6 md:p-8 flex flex-col justify-between h-full bg-white/40 dark:bg-neutral-950/45 backdrop-blur-md">
              <div>
                {/* Heading Coordinate Details */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/[0.04] dark:border-white/[0.04]">
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-2.5 h-2.5 rounded-full animate-pulse"
                      style={{ backgroundColor: activeNode.colorHex }}
                    />
                    <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                      Coordinate Inspector
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-accent-cyan font-bold">
                    P({activeNode.x.toFixed(1)}, {activeNode.y.toFixed(1)})
                  </span>
                </div>

                {/* Selected Node Name */}
                <h3 className="font-display font-bold text-2xl text-neutral-900 dark:text-white tracking-tight mb-4">
                  {lang === 'vi' ? activeNode.nameVi : activeNode.nameEn}
                </h3>

                {/* Subsystem Description */}
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-sans font-light mb-6">
                  {lang === 'vi' ? activeNode.descVi : activeNode.descEn}
                </p>

                {/* Skills Bullet Stack */}
                <h4 className="font-mono text-[9px] text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
                  {lang === 'vi' ? 'Danh sách công cụ & lý thuyết:' : 'Tools & methodologies:'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(lang === 'vi' ? activeNode.items : activeNode.itemsEn).map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.06] text-neutral-700 dark:text-neutral-300 font-mono text-[10px] select-none"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Dynamic Footer Details */}
              <div className="mt-8 pt-4 border-t border-black/[0.04] dark:border-white/[0.04] flex items-center justify-between text-[8px] uppercase tracking-wider font-mono text-neutral-400 dark:text-neutral-500">
                <span>Node ID: {activeNode.id}</span>
                <span>STATUS: {activeNode.y >= 0 ? 'LOGIC_PASS' : 'OPERATIONAL'}</span>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
