import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // surfaces
        cream: 'var(--bg-main)',     // page background
        sand: 'var(--bg-section)',   // alternating sections
        ivory: 'var(--card-bg)',     // cards
        // text
        ink: 'var(--text-primary)',
        muted: 'var(--text-secondary)',
        // brand accent (use sparingly)
        accent: 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        blush: 'var(--accent-light)',
        // decorative
        gold: 'var(--gold)',
        'gold-light': 'var(--gold-light)',
        // borders
        line: 'var(--border)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: { 'fade-up': 'fade-up 0.8s ease forwards' },
    },
  },
  plugins: [],
} satisfies Config;
