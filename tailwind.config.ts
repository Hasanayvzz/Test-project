import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // Dark mode için class stratejisi
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-blue": "linear-gradient(to bottom right, #eff6ff, #2349ca)",
        "gradient-purple": "linear-gradient(to bottom right, #faf5ff, #ede9fe)",
        "gradient-indigo": "linear-gradient(to bottom right, #eef2ff, #2349ca)",
      },
      colors: {
        bg: "rgba(var(--background))",
        textPrimary: "rgba(var(--textPrimary))",
        "text-color": "rgba(var(--text-color))",
        border: "rgba(var(--border))",
        card: "rgba(var(--card))",
        "copy-primary": "rgba(var(--copy-primary))",
        "copy-secondary": "rgba(var(--copy-secondary))",
        text: "rgba(var(--text))",
        "text-active": "rgba(var(--text-active))",

        indigo: {
          50: "#eef2ff",
          100: "#2349ca", // Custom indigo-100 rengi
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-in": "slideIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.3s ease-in-out",
        "spin-slow": "spin 3s linear infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        card: "var(--shadow-card)",
        "card-hover": "var(--shadow-card-hover)",
        "card-lg": "var(--shadow-card-lg)",
        "card-xl": "var(--shadow-card-xl)",

        "card-shadow": "var(--shadow-card-lg)",
        "dark-sm": "0 1px 2px 0 rgba(0, 0, 0, 0.3)",
        "dark-md":
          "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)",
        "dark-lg":
          "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)",
        "dark-xl":
          "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
        soft: "0 2px 8px rgba(0, 0, 0, 0.08)",
        "soft-lg": "0 4px 16px rgba(0, 0, 0, 0.1)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],

  safelist: [
    "bg-gradient-to-br",
    "bg-gradient-to-r",
    "bg-gradient-to-l",
    "bg-gradient-to-t",
    "bg-gradient-to-b",
    "from-blue-50",
    "to-indigo-100",
    "from-purple-50",
    "to-pink-100",
  ],
};

export default config;
