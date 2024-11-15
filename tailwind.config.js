/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F8EDEB',
        secondary: '#C473FF',
        accent: '#FB6F92',
      },
      fontFamily: {
        primary: ['Urbanist', 'sans-serif'],
      },
      fontSize: {
        subtitle1: '16px',
        subtitle2: '14px',
        body1: '16px',
        body2: '14px',
        caption: '12px',
        overline: '12px',
      },
    },
  },
  plugins: [],
}