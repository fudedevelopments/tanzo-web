/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'sans-serif', 'Roboto'],
        'serif': ['Merriweather', 'serif'],
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
    function ({ addUtilities }) {
      addUtilities(
        {
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
