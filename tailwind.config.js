const themes = {
  white: ["#fff", "#fff", "#fff"],
  purple: ["#C98ECD", "#371939", "#000110"],
  blue: ["#00A8FF", "#371939", "#000110"],
};

const generateTheme = (theme) => ({
  primary: themes[theme][0],
  primaryDark: themes[theme][1],
  secondary: themes[theme][2],
});

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
      colors: generateTheme("purple"),
    },
  },
  plugins: [],
};
