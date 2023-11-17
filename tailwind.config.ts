import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        beige: "#fff0db"
      }
    },
  },
  plugins: [],
} satisfies Config;
