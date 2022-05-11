const themes = {
  normal: ["#C98ECD", "#fff", "#000110"],
  white: ["#fff", "#fff", "#fff"],
  purple: ["#C98ECD", "#371939", "#000110"],
  blue: ["#00A8FF", "#371939", "#000110"],
  test: ["#371939", "#C98ECD", "#000110"],
  biege: ["#f5f3f4", "#C98ECD", "#000110"],
};

const generateTheme = (theme) => ({
  background: themes[theme][0],
  cards: themes[theme][1],
  textPrimary: themes[theme][2],
  // secondary: themes[theme][2],
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
      colors: generateTheme("normal"),
      fontFamily: {
        krausehouse1: ["Headline"],
        krausehouse2: ["SK_Cuber"],
      },
    },
  },
  plugins: [],
};
