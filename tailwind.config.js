/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kiwi: {
          light: '#bcfd49',
          DEFAULT: '#82cc00',
          dark: '#5a8e00',
        },
        panel: '#1e293b', // Slate 800
        dark: '#0f172a',  // Slate 900
        black: '#020617', // Slate 950
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      }
    },
  },
  plugins: [],
}