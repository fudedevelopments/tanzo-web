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
      },
      keyframes: {
        bounceScroll: {
          '0%': { transform: 'translateX(0%)' },
          '25%': { transform: 'translateX(-10%)' },
          '50%': { transform: 'translateX(10%)' },
          '75%': { transform: 'translateX(-5%)' },
          '100%': { transform: 'translateX(0%)' }, // Smooth bounce back to original position
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
