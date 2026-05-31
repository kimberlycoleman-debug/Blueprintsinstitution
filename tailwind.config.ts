import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bp: {
          white: '#FAFAF8',
          cream: '#F5F0E8',
          warm: '#EDE8DF',
          sand: '#D4C5A9',
          brown: '#8B7355',
          'brown-deep': '#5C4A2A',
          gold: '#C4923A',
          'gold-light': '#F0D9B5',
          sage: '#7C9A7E',
          blue: '#4A7FA5',
          dark: '#1A120B',
          text: '#2C2416',
          muted: '#8B7D6B',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        card: '16px',
        'card-lg': '24px',
        pill: '999px',
      },
      boxShadow: {
        warm: '0 1px 3px rgba(44, 36, 22, 0.04)',
        'warm-md': '0 4px 12px rgba(44, 36, 22, 0.08)',
        'warm-lg': '0 8px 24px rgba(44, 36, 22, 0.12)',
        'warm-xl': '0 20px 60px rgba(44, 36, 22, 0.15)',
        'gold-glow': '0 0 30px rgba(196, 146, 58, 0.2)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-up-delay': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards',
        'fade-up-delay-2': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards',
        'fade-in': 'fade-in 1s ease forwards',
        shimmer: 'shimmer 3s linear infinite',
        float: 'float 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
