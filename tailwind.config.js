/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    screens: {
      'xxs': "150",
      'xs': "320px",
      'sm': "576px",
      'md': "768px",
      'lg': "1024px",
      'xl': "1280px",
      'xxl': "1536px"
    },

    extend: {},
  },
  plugins: [],
}

