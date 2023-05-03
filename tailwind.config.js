/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f43b3b",
        secondary: "#00A265",
        background: "#191414",
        "background-light": "#191919",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
