import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#03010a",
        deep: "#0d0521",
        "nova-core": "#ff6b35",
        "nova-mid": "#c84bff",
        "nova-outer": "#ff2d8f",
        "nova-glow": "#7b2fff",
        "nova-ice": "#00d4ff",
        "text-white": "#f0eeff",
        "text-muted": "rgba(240,238,255,0.55)",
        "accent-primary": "#c84bff",
        "accent-secondary": "#ff6b35",
      },
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
        ethno: ["var(--font-ethno)", "sans-serif"],
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "float-mid": "float 6s ease-in-out infinite",
        "float-fast": "float 4s ease-in-out infinite",
        "marquee": "marquee 30s linear infinite",
        "twinkle": "twinkle 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
