/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#F5F0E8',
          50: '#FFFFFF',
          100: '#FAF7F2',
          200: '#F5F0E8',
          300: '#EFE7D8',
          400: '#E8E0D0',
        },
        charcoal: {
          DEFAULT: '#2C2C2C',
          50: '#F5F5F5',
          100: '#E5E5E5',
          200: '#CCCCCC',
          300: '#A3A3A3',
          400: '#6B6B6B',
          500: '#525252',
          600: '#404040',
          700: '#2C2C2C',
          800: '#1F1F1F',
          900: '#141414',
        },
        gold: {
          DEFAULT: '#8B6914',
          50: '#FAF4E6',
          100: '#F3E5C8',
          200: '#E6C98F',
          300: '#D6AA56',
          400: '#B8860B',
          500: '#8B6914',
          600: '#72540E',
          700: '#59400B',
          800: '#402D07',
          900: '#271B04',
        },
        warmbrown: {
          DEFAULT: '#5C4A32',
          50: '#F7F5F2',
          100: '#EBE5DC',
          200: '#D6C8B7',
          300: '#B8A48D',
          400: '#8A7359',
          500: '#5C4A32',
          600: '#483A27',
          700: '#34291C',
        },
        subtext: '#6B6B6B',
        warmborder: '#E8E0D0',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'DM Sans', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.02em',
      },
      backgroundImage: {
        'warm-texture': "radial-gradient(#8B6914 0.5px, transparent 0.5px), radial-gradient(#8B6914 0.5px, #F5F0E8 0.5px)",
      },
      boxShadow: {
        'warm-sm': '0 1px 3px rgba(44, 44, 44, 0.05), 0 1px 2px rgba(44, 44, 44, 0.03)',
        'warm-md': '0 4px 12px rgba(44, 44, 44, 0.06), 0 1px 4px rgba(44, 44, 44, 0.04)',
        'warm-lg': '0 10px 25px -5px rgba(44, 44, 44, 0.08), 0 8px 10px -6px rgba(44, 44, 44, 0.04)',
      },
      animation: {
        'page-slide': 'pageSlide 0.4s ease-out both',
        'fade-in': 'fadeIn 0.3s ease-out both',
        'slide-in': 'slideIn 0.3s ease-out both',
        'pulse-subtle': 'pulseSubtle 2s infinite',
        shimmer: 'shimmer 1.5s infinite',
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
        pulseSubtle: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
