/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // or 'media' if you prefer the user's system preference
  theme: {
    extend: {
      colors: {
        darkBar: "#1F2937",
        darkBody: "#1a1a1a",
        darkElement: "#becada",

        lightBar: "#2f3d51",
        lightBody: "#fefefe",
        lightCard: "#f2f2f2",
        lightElement: "#e6e6e6",
      },
    },
  },
  plugins: [],
};
