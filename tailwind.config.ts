import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4fb',
          100: '#dce5f4',
          200: '#bfcfeb',
          300: '#97b1dd',
          400: '#688ece',
          500: '#355290',
          600: '#2d4579',
          700: '#263763',
          800: '#222f54',
          900: '#1f2947',
        },
        secondary: {
          50: '#f0f3f7',
          100: '#dce2eb',
          200: '#bcc7d9',
          300: '#94a4be',
          400: '#67799d',
          500: '#2d4579',
          600: '#263a66',
          700: '#203054',
          800: '#1d2947',
          900: '#1b243c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
}
