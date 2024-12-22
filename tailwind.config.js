/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#009688",
        secondaryColor: "#00796B",
      },
    },
  },
  plugins: [require("daisyui")],
};
