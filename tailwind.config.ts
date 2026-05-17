import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: '#1a5f6f',
          deep: '#1a5f6f',
          50: '#f0f7f8',
          100: '#d9ebed',
          200: '#a8d5d8',
          300: '#7cbcc1',
          400: '#509ea4',
          500: '#358087',
          600: '#1a5f6f',
          700: '#164d5b',
          800: '#123e49',
          900: '#0c2b33'
        },
        seafoam: '#a8d5d8',
        sand: '#e8dcc4',
        cream: '#faf7f2',
        gold: {
          DEFAULT: '#c9a961',
          50: '#fbf6e9',
          100: '#f3e6b8',
          200: '#e8d28a',
          300: '#dabd5f',
          400: '#c9a961',
          500: '#b08e44',
          600: '#8e7237'
        }
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'Montserrat', 'system-ui', 'sans-serif']
      },
      letterSpacing: {
        widest: '0.25em',
        ultra: '0.35em'
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'shimmer': 'shimmer 2.5s linear infinite'
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(30px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        shimmer: { '0%': { backgroundPosition: '-1000px 0' }, '100%': { backgroundPosition: '1000px 0' } }
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(180deg, rgba(26,95,111,0.35) 0%, rgba(26,95,111,0.55) 100%)',
        'gradient-sand': 'linear-gradient(135deg, #faf7f2 0%, #e8dcc4 100%)'
      }
    }
  },
  plugins: []
};

export default config;
