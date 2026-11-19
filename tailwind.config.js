/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "ice-white": "#F4F8FA",
        "deep-teal": "#0F3D47",
        "soft-peach": "#F59E7B",
        primary: "#F4F8FA",
        secondary: "#FFFFFF",
        accent: "#F59E7B",
        "accent-pink": "#F59E7B",
        "accent-purple": "#0F3D47",
        "accent-blue": "#F59E7B",
        "glass-bg": "rgba(255, 255, 255, 0.85)",
        "glass-border": "rgba(15, 61, 71, 0.1)",
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
          "0%": { textShadow: "0 0 10px #F59E7B" },
          "100%": { textShadow: "0 0 20px #0F3D47" },
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
        "neon-gradient": "linear-gradient(135deg, #0F3D47, #F59E7B)",
      },
    },
  },
  plugins: [],
};
