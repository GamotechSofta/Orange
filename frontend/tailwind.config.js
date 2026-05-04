/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        page: "#0B0F19",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(34, 197, 94, 0.2)",
        "glow-lg": "0 0 40px rgba(34, 197, 94, 0.25)",
        "glow-purple": "0 0 24px rgba(168, 85, 247, 0.35)",
        "glow-orange": "0 0 24px rgba(249, 115, 22, 0.25)",
      },
      animation: {
        "fade-in": "fade-in 0.7s ease-out forwards",
        "fade-in-slow": "fade-in 1s ease-out 0.15s forwards",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
