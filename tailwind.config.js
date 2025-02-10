/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#365d56",
        secondary:"#1C3905",
        tertiary:"#9FE870"
      },
      screens: {
        xs: "475px",
        bigxl: "1920px"
      },
      fontFamily: {
        // 'tt-hoves': ['"TT Hoves"', 'sans-serif'],
      },
      gridTemplateColumns: {
        userTable: "180px 250px 160px 100px ",
        orderTable: "190px 200px 150px 130px 30px 200px 100px 100px",
        presTable: "190px 200px 150px 130px 60px 100px 100px 100px",
      }
    },
  },
  plugins: [],
};
