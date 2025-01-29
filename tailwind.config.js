/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       backgroundImage: {
        'mask-gradient': 'linear-gradient(to right, transparent, black, transparent)',
      },
      fontFamily: {
        'sans': [,'Inter', 'sans-serif', 'Roboto'],
        'serif': ['Merriweather', 'serif'],
        'popins': ['Popins', 'sans-serif'],
      },
      gridTemplateColumns: {
        '70/30': '70% 28%',
      }
      ,
     animation: {
       bounceScroll: 'bounceScroll 3s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        bounceScroll: {
          '0%': { transform: 'translateX(0%)' },
          '25%': { transform: 'translateX(-10%)' },
          '50%': { transform: 'translateX(10%)' },
          '75%': { transform: 'translateX(-5%)' },
          '100%': { transform: 'translateX(0%)' }, // Smooth bounce back to original position
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(-50%)' },
          '50%': { transform: 'translateY(-20px) translateX(-50%)' },
        },
        pulse: {
          '0%, 100%': { opacity: 0.4 },
          '50%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [
  require('tailwindcss-text-stroke'),
    function ({ addUtilities }) {
      addUtilities(
        {
          '.mask-gradient': {
          maskImage: 'linear-gradient(to right, transparent, black, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black, transparent)', // For WebKit-based browsers
        },
          '.scrollbar-hide': {
            '-ms-overflow-style': 'none', /* Internet Explorer 10+ */
            'scrollbar-width': 'none',    /* Firefox */
          },
          '.scrollbar-hide::-webkit-scrollbar': {
            display: 'none', /* Safari and Chrome */
          },
        },
        ['responsive', 'hover']
      )
    },
  ],
}
