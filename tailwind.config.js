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
        primary: {
          DEFAULT: "#365d56",
          50: "#f0f5f4",
          100: "#d9e5e3",
          200: "#b3ccc8",
          300: "#8db2ac",
          400: "#679991",
          500: "#365d56",  // Original primary
          600: "#2e4f49",
          700: "#25413c",
          800: "#1c332f",
          900: "#132522"
        },
        secondary: {
          DEFAULT: "#1C3905",
          light: "#2a5708"
        },
        tertiary: {
          DEFAULT: "#9FE870",
          light: "#b5ff86"
        },
        accent: "#E8F3F1",
        surface: "#FFFFFF",
        background: "#F8FAFB"
      },
      screens: {
        xs: "475px",
        bigxl: "1920px"
      },
      fontFamily: {
        montserrat: ['var(--font-montserrat)'],
        poppins: ['var(--font-poppins)'],
        kanit: ['var(--font-kanit)']
      },
      gridTemplateColumns: {
        userTable: "180px 250px 160px 100px ",
        orderTable: "190px 200px 150px 130px 30px 200px 100px 100px",
        presTable: "190px 200px 150px 130px 60px 100px 100px 100px",
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 0 20px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      }
    },
  },
  plugins: [],
};
