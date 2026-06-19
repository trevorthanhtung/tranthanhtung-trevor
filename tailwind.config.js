/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: 'var(--bg-default)',
          card: 'var(--bg-card)',
          cardInner: 'var(--bg-card-inner)',
        },
        accent: {
          violet: 'oklch(65% 0.17 150)',  // Refined Emerald (recolors all accent-violet usages)
          cyan: 'oklch(75% 0.14 200)',    // Tech Cyan
          emerald: 'oklch(78% 0.16 160)', // Tech Emerald
          gold: 'oklch(80% 0.15 85)',     // Technical Gold
        }
      },
      fontFamily: {
        sans: ['"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
        display: ['"Bricolage Grotesque"', '"Be Vietnam Pro"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      transitionTimingFunction: {
        'out-custom': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-custom': 'cubic-bezier(0.76, 0, 0.24, 1)',
        'drawer': 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
      keyframes: {
        'scroll-dot': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.3' },
          '50%': { transform: 'translateY(4px)', opacity: '1' },
        }
      },
      animation: {
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'scroll-dot': 'scroll-dot 2s cubic-bezier(0.16, 1, 0.3, 1) infinite',
      }
    },
  },
  plugins: [],
}
