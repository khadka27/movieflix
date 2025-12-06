/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#141414", // Netflix-like dark background
        surface: "#181818",
        primary: "#e50914", // Netflix Red
        secondary: "#ffffff",
        charcoal: "#0f0f0f",
        "grey-text": "#b3b3b3",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-to-b":
          "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
        "gradient-fade":
          "linear-gradient(to top, #141414 0%, transparent 100%)",
      },
    },
  },
  plugins: [],
};
