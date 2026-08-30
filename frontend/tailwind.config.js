/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: {
          purple: '#6C63FF',
          cyan: '#00D4FF',
          success: '#00C896',
        },
        primary: {
          50: '#f0f0ff',
          100: '#e1e0ff',
          200: '#c5c3ff',
          300: '#9d99ff',
          400: '#7d74ff',
          500: '#6C63FF',
          600: '#584ee8',
          700: '#463cb6',
          800: '#383091',
          900: '#2b2671',
          950: '#1b1747',
        },
        cyan: {
          50: '#e5faff',
          100: '#b8f2ff',
          200: '#8ae9ff',
          300: '#5cdfff',
          400: '#2ed6ff',
          500: '#00D4FF',
          600: '#00aacc',
          700: '#008099',
          800: '#005566',
          900: '#002b33',
        },
        dark: {
          950: '#0A0A0F',
          900: '#111118',
          850: '#161622',
          800: '#1A1A26',
          700: '#222233',
          600: '#333348',
          500: '#55556A',
          400: '#888899',
          300: '#AAAAAA',
          200: '#CCCCCC',
          100: '#E0E0E6',
        },
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.02em',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #6C63FF 0%, #00D4FF 100%)',
        'card-gradient': 'linear-gradient(180deg, rgba(17, 17, 24, 0.9) 0%, rgba(10, 10, 15, 0.95) 100%)',
        'glow-gradient': 'radial-gradient(circle, rgba(108, 99, 255, 0.15) 0%, transparent 70%)',
      },
      animation: {
        'page-slide': 'pageSlide 0.4s ease-out both',
        'fade-in': 'fadeIn 0.3s ease-out both',
        'slide-in': 'slideIn 0.3s ease-out both',
        'pulse-glow': 'pulseGlow 2s infinite ease-in-out',
        'pulse-subtle': 'pulseSubtle 2s infinite',
        shimmer: 'shimmer 1.5s infinite',
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        blob: 'blob 10s ease-in-out infinite',
      },
      keyframes: {
        pageSlide: {
          from: { opacity: 0, transform: 'translateY(12px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: 0, transform: 'translateY(6px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideIn: {
          from: { opacity: 0, transform: 'translateX(-12px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(108, 99, 255, 0.25)', borderColor: 'rgba(108, 99, 255, 0.6)' },
          '50%': { boxShadow: '0 0 30px rgba(0, 212, 255, 0.4)', borderColor: 'rgba(0, 212, 255, 0.8)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -40px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
      },
      backdropBlur: { xs: '2px' },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
