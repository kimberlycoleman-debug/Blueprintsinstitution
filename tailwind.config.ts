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
        // Blueprints brand — warm, hopeful, human
        bp: {
          white: '#FAFAF8',
          cream: '#F5F0E8',
          warm: '#EDE8DF',
          sand: '#D4C5A9',
          brown: '#8B7355',
          'brown-deep': '#5C4A2A',
          sage: '#7C9A7E',
          blue: '#4A7FA5',
          text: '#2C2416',
          muted: '#8B7D6B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        card: '16px',
        pill: '999px',
      },
      boxShadow: {
        warm: '0 1px 3px rgba(44, 36, 22, 0.04)',
        'warm-lg': '0 8px 16px rgba(44, 36, 22, 0.08)',
      },
    },
  },
  plugins: [],
}

export default config
