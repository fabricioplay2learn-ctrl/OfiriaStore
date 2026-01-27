import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark Base
        'ceniza': '#1C1C1C',
        'carboncillo': '#2B2B2B',
        
        // Gold Palette
        'gold': {
          DEFAULT: '#D4AF37',
          'metallic': '#D4AF37',
          'champan': '#C5A059',
          'bright': '#E8C547',
          'dark': '#B8860B',
        },
        
        // Theme-aware colors (CSS variables)
        'bg-primary': 'var(--color-bg-primary)',
        'bg-secondary': 'var(--color-bg-secondary)',
        'bg-card': 'var(--color-bg-card)',
        'bg-elevated': 'var(--color-bg-elevated)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted': 'var(--color-text-muted)',
        'border-custom': 'var(--color-border)',
        'accent': 'var(--color-accent)',
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        outfit: ["var(--font-outfit)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gold-gradient": "linear-gradient(135deg, #D4AF37 0%, #C5A059 100%)",
      },
      boxShadow: {
        'gold': '0 4px 20px rgba(212, 175, 55, 0.3)',
        'gold-lg': '0 8px 32px rgba(212, 175, 55, 0.4)',
      },
    },
  },
  plugins: [],
};
export default config;
