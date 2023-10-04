/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'secondary':'#D80032',
        'primary':'#F9DEC9'
      }
    },
  },
  plugins: [],
  corePlugins:{
    preflight:false,
  },// to avoid overlapping of antd library STYLES
}