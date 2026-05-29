/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        mecca: {
          black: "#0a0a0a",
          dark: "#111111",
          card: "#1a1a1a",
          border: "#2a2a2a",
          gold: "#d4a017",
          amber: "#f5a623",
          light: "#ffd700",
          text: "#e8e8e8",
          muted: "#888888",
        },
      },
      fontFamily: {
        display: ["Georgia", "serif"],
        body: ["system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #d4a017 0%, #ffd700 50%, #d4a017 100%)",
        "dark-gradient": "linear-gradient(180deg, #0a0a0a 0%, #111111 100%)",
      },
      animation: {
        "pulse-gold": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
