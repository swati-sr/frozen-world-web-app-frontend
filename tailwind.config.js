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
        yellow: "#ffb524",
        white: "#fff",
        red: "#ff736a",
        green: "#98c869",
        darkGreen: "#058203",
        darkText: "#45595b",
        purple: "#C8A1E0",
        footer: "#333",
        baseOne: "rgba(255, 69, 0, 0.4)",
        bright: "rgb(255, 69, 0)",
        primary: "#000",
        secondary: "#808080",
        baseTwo: "rgba(128, 128, 128, 0.3)",
        formOne: "rgba(255, 255, 255, 0.5)",
        formTwo: "rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
