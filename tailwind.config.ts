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
        frenchLilac: "#F0CBF0",
        sanJuan: "#15496A",
      },
    },
  },
  plugins: [],
};
