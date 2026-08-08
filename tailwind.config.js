/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#070A08",
        bgSoft: "#0D1310",
        card: "#131A16",
        accent: {
          lime: "#34D399", // emerald green (primary accent)
          violet: "#10B981", // deeper emerald (secondary accent)
        },
        muted: "#9CA3AF",
        border: "#1C2620",
      },
      fontFamily: {
        display: ["'Clash Display'", "sans-serif"],
        body: ["'General Sans'", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(212,255,63,0.35)",
        glowViolet: "0 0 40px -10px rgba(139,92,246,0.35)",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        glowPulse: "glowPulse 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: 0.6 },
          "50%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
