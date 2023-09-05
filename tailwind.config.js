/** @type {import('tailwindcss').Config} */

const primary = '#E30B13'
const white = '#FFF'
const black = '#000'

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [require('@tailwindcss/line-clamp')]
}
