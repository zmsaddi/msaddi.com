import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0078D7",
        "metal-gray": "#5E5E5E",
        "metal-light": "#B0B0B0",
        "dark-base": "#23282A",
        "light-neutral": "#E9E9E9",
        "silver-accent": "#9FA3A7",
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "sans-serif"],
        body: ["var(--font-roboto)", "sans-serif"],
      },
      animation: {
        "laser-beam": "laser 3s ease-in-out infinite",
        "metal-shine": "shine 3s ease-in-out infinite",
        "fade-up": "fadeUp 0.6s ease-out",
        "fade-in": "fadeIn 0.6s ease-out",
      },
      keyframes: {
        laser: {
          "0%, 100%": { opacity: "0", transform: "translateX(-100%)" },
          "50%": { opacity: "1", transform: "translateX(100%)" },
        },
        shine: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      screens: {
        '4k': '1920px',
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};

export default config;