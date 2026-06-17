import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAF7F0",
        foreground: "#1A1A1A",
        gold: "#C9A84C",
        "earth-green": "#3B5E45",
        card: "#ffffff",
        "card-foreground": "#171717",
        popover: "#ffffff",
        "popover-foreground": "#171717",
        primary: "#171717",
        "primary-foreground": "#fafafa",
        secondary: "#f5f5f5",
        "secondary-foreground": "#171717",
        muted: "#f5f5f5",
        "muted-foreground": "#737373",
        accent: "#f5f5f5",
        "accent-foreground": "#171717",
        destructive: "#e54b4f",
        "destructive-foreground": "#fafafa",
        border: "#ebebeb",
        input: "#ebebeb",
        ring: "#171717",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        serif: ["var(--font-playfair-display)"],
      },
      borderRadius: {
        sm: "calc(var(--radius) - 4px)",
        md: "calc(var(--radius) - 2px)",
        lg: "var(--radius)",
        xl: "calc(var(--radius) + 4px)",
      },
      animation: {
        fadeIn: "fadeIn 1s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
