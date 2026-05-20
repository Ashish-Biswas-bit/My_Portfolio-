/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0f0f23",
        secondary: "#1a1a3e",
        accent: "#00f5ff",
        "accent-pink": "#ff00ff",
        "accent-purple": "#7b2ff7",
        "accent-blue": "#00d4ff",
        "glass-bg": "rgba(255, 255, 255, 0.05)",
        "glass-border": "rgba(255, 255, 255, 0.1)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "glow-pulse": "glow-pulse 2s ease-in-out infinite alternate",
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "slide-up": "slide-up 0.6s ease-out",
        "fade-in": "fade-in 0.8s ease-out",
      },
      keyframes: {
        "glow-pulse": {
          "0%": { textShadow: "0 0 10px #00f5ff, 0 0 20px #00f5ff, 0 0 40px #00f5ff" },
          "100%": { textShadow: "0 0 20px #ff00ff, 0 0 40px #ff00ff, 0 0 80px #ff00ff" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(40px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "neon-gradient": "linear-gradient(135deg, #00f5ff, #7b2ff7, #ff00ff)",
      },
    },
  },
  plugins: [],
};
