import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Comic Neue', 'cursive'],
        serif: ['Playpen Sans', 'cursive'],
        hand: ['Playpen Sans', 'cursive'],
        body: ['Comic Neue', 'cursive'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sharpie: {
          blue: "hsl(var(--sharpie-blue))",
          red: "hsl(var(--sharpie-red))",
          yellow: "hsl(var(--sharpie-yellow))",
          green: "hsl(var(--sharpie-green))",
          orange: "hsl(var(--sharpie-orange))",
          grey: "hsl(var(--sharpie-grey))",
          light: "hsl(var(--sharpie-light))",
        },
        // Keep legacy color references working
        warm: {
          mustard: "hsl(var(--sharpie-yellow))",
          tan: "hsl(var(--sharpie-light))",
          terracotta: "hsl(var(--sharpie-orange))",
          cream: "hsl(var(--background))",
        },
        dark: {
          chocolate: "hsl(var(--foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "wobble-slow": {
          "0%, 100%": { transform: "rotate(-0.5deg)" },
          "50%": { transform: "rotate(0.5deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "wobble-slow": "wobble-slow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
