/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'sm': '0 1px 0px rgba(0,0,0,0.08)'
      }
    },
  },
  plugins: [],
}