/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "0px",
      md: "748px",
      lg: "1024px",
    },
    extend: {
      colors: {
        vibrantPurple: "#A100FF", // Primary bold color
        deepPurple: "#6A0DAD", // Dark background accent
        mutedLavender: "#D1A3FF", // For subtle text or accents
        brightCoral: "#FF6A6A", // For playful accents and highlights
        teal: "#00F9FF", // Playful and experimental accent
        darkBackground: "#181818", // Dark background for the app
        background: "#202020",
        lightBackground: "#4D4D4D",
        lightGrayText: "#E0E0E0", // Text on dark background
        whiteText: "#FFFFFF", // For bright text on darker backgrounds
        purpleGradientStart: "#6A0DAD", // Gradient start for buttons or backgrounds
        purpleGradientEnd: "#A100FF", // Gradient end for buttons or backgrounds
        lightGray: "#D1D1D1", // Lighter gray
        mediumGray: "#888888", // Medium gray
        shadowGray: "#B1B1B1", // Gray for subtle shadow effects
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"], // Use Poppins as primary font
      },
      backgroundImage: {
        "purple-gradient": "linear-gradient(to right, #6A0DAD, #A100FF)", // Custom gradient for backgrounds or buttons
      },
    },
  },
  plugins: [],
};
