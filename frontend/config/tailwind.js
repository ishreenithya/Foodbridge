/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Open Sans', 'Inter', 'sans-serif'],
      },
      colors: {
        primary: '#3366cc',
        gold: '#FFD700',
        bronze: '#CD7F32',
      },
    },
  },
  plugins: [],
}
