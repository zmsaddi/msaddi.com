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
        // Material You Color System
        primary: {
          DEFAULT: "#007AFF",
          light: "#4DA3FF",
          dark: "#0052CC",
        },
        secondary: {
          DEFAULT: "#CBA135",  // Golden accent
          light: "#E5C15A",
          dark: "#9E7E29",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          light: "#FAFAFA",
          container: "#F5F5F5",
        },
        text: {
          primary: "#1A1A1A",
          secondary: "#5A5A5A",
          disabled: "#9E9E9E",
        },
        outline: "#E5E7EB",
        divider: "#E0E0E0",
        success: "#16A34A",
        error: "#DC2626",
        warning: "#F59E0B",
        // Legacy colors (for backward compatibility)
        "metal-gray": "#5E5E5E",
        "metal-light": "#B0B0B0",
        "dark-base": "#23282A",
        "light-neutral": "#FAFAFA",
        "silver-accent": "#9FA3A7",
      },
      fontFamily: {
        // Material Design 3 Typography
        inter: ["var(--font-inter)", "sans-serif"],
        cairo: ["var(--font-cairo)", "sans-serif"],
        tajawal: ["var(--font-tajawal)", "sans-serif"],
        // Legacy (backward compatibility)
        heading: ["var(--font-inter)", "var(--font-cairo)", "sans-serif"],
        body: ["var(--font-inter)", "var(--font-tajawal)", "sans-serif"],
      },
      fontSize: {
        // Material 3 Type Scale
        "display-lg": ["57px", { lineHeight: "64px", letterSpacing: "-0.25px" }],
        "display-md": ["45px", { lineHeight: "52px", letterSpacing: "0px" }],
        "display-sm": ["36px", { lineHeight: "44px", letterSpacing: "0px" }],
        "headline-lg": ["32px", { lineHeight: "40px", letterSpacing: "0px" }],
        "headline-md": ["28px", { lineHeight: "36px", letterSpacing: "0px" }],
        "headline-sm": ["24px", { lineHeight: "32px", letterSpacing: "0px" }],
        "title-lg": ["22px", { lineHeight: "28px", letterSpacing: "0px" }],
        "title-md": ["16px", { lineHeight: "24px", letterSpacing: "0.15px" }],
        "body-lg": ["18px", { lineHeight: "28px", letterSpacing: "0.5px" }],
        "body-md": ["16px", { lineHeight: "24px", letterSpacing: "0.25px" }],
        "label-lg": ["14px", { lineHeight: "20px", letterSpacing: "0.1px" }],
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
      spacing: {
        // Material 3 Spacing Tokens
        'md-xs': '4px',
        'md-sm': '8px',
        'md-md': '16px',
        'md-lg': '24px',
        'md-xl': '32px',
        'md-2xl': '48px',
        'md-3xl': '64px',
        'md-4xl': '80px',
        'md-5xl': '120px',
      },
      borderRadius: {
        // Material 3 Corner Radius
        'md-xs': '4px',
        'md-sm': '8px',
        'md-md': '12px',
        'md-lg': '16px',
        'md-xl': '24px',
        'md-full': '1000px',
      },
      boxShadow: {
        // Material 3 Elevation Levels
        'elevation-0': 'none',
        'elevation-1': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'elevation-2': '0 2px 6px 2px rgba(0, 0, 0, 0.15)',
        'elevation-3': '0 4px 8px 3px rgba(0, 0, 0, 0.15)',
        'elevation-4': '0 6px 10px 4px rgba(0, 0, 0, 0.15)',
        'elevation-5': '0 8px 12px 6px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};

export default config;