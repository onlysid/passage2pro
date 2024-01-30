/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{js,jsx}"];
export const mode = "jit";
export const theme = {
  extend: {
    colors: {
      primary: "#121212",
      "logo": "#ffd700",
      secondary: "#e1dbc0",
      tertiary: "#fbbf35",
      "dark": "#1a1a1a",
      "black-100": "#080808",
      "black-200": "#090325",
      "white-100": "#f3f3f3",
    },
    boxShadow: {
      card: "0px 35px 120px -15px #211e35",
    },
    screens: {
      xs: "450px",
    },
    backgroundImage: {
      "hero-pattern": "url('/src/assets/herobg.jpg')",
    },
  },
};
export const plugins = [];