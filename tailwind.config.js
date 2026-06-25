/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050816',
        'background-secondary': '#0B1020',
        'accent-blue': '#3B82F6',
        'accent-purple': '#7C3AED',
        'accent-light-blue': '#38BDF8',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
