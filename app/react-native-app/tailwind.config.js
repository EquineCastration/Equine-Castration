module.exports = {
  content: [
    "./src/App.{js,jsx,ts,tsx}",
    "./src/screens/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      primary: {
        50: "#ffffff",
        75: "#f5f6ff",
        100: "#e7e8ed",
        200: "#cfd0da",
        300: "#b7b9c8",
        400: "#9fa1b5",
        500: "#6f7391",
        600: "#575b7e",
        700: "#3f446c",
        800: "#272c59",
        900: "#0f1547",
      },
      secondary: {
        100: "#D7EEFA",
        200: "#C2E6F8",
        300: "#AEDDF6",
        400: "#9AD5F4",
        500: "#86CCF1",
        600: "#72C4EF",
        700: "#5DBBED",
        800: "#49B3EA",
        900: "#35aae8",
      },
      kanaka: {
        100: "#FAEDCE",
        200: "#F8E4B5",
        300: "#F6DB9D",
        400: "#F4D284",
        500: "#F1C96B",
        600: "#EFC053",
        700: "#EDB73A",
        800: "#EAAE22",
        900: "#e8a509",
      },
      patra: {
        100: "#CEE7D4",
        200: "#B5DABF",
        300: "#9DCEAA",
        400: "#84C295",
        500: "#6BB67F",
        600: "#53AA6A",
        700: "#3A9D55",
        800: "#22913F",
        900: "#0e7d2b",
      },
    },
    extend: {},
  },
  plugins: [],
};
