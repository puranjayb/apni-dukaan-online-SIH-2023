/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        oldenburg: ["Oldenburg", "sans-serif"],
        notoSans: ["Noto Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
