/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        ruler: {
          DEFAULT: '#e74c3c',
          light: '#f5b7b1',
        },
        player: {
          DEFAULT: '#f39c12',
          light: '#fad7a0',
        },
        observer: {
          DEFAULT: '#3498db',
          light: '#aed6f1',
        },
        seeker: {
          DEFAULT: '#9b59b6',
          light: '#d7bde2',
        },
      },
    },
  },
  plugins: [],
}
