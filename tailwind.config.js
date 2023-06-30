/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'row': '0 1px 0px rgba(0,0,0,0.08)',
        'btn': '0 0px 2px rgba(0,0,0,0.6)'
      }
    },
  },
  plugins: [],
}