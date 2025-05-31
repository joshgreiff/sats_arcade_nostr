/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // THIS line is critical
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
