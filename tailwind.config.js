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
        baseOne: "rgba(255, 69, 0, 0.4)",
        bright: "rgb(255, 69, 0)",
        primary: "black",
        secondary: "rgb(128, 128, 128)",
        baseTwo: "rgba(128, 128, 128, 0.3)",
        formOne: "rgba(255, 255, 255, 0.5)",
        formTwo: "rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
