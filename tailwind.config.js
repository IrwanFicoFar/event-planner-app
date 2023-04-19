/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "mid-lg": "960px",
      },
      spacing: {
        100: "28rem",
      },
      colors: {
        "@028090": "#028090",
        "@F46036": "#F46036",
        "@night": "#111111",
      },
      borderRadius: {
        "@nice": "8rem",
        "@yes": "3rem",
      },
    },
  },
  plugins: [],
};
