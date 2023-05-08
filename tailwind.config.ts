import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#222",
        borderDark: "#333",
      },
      fontSize: {
        p: "20px",
        button: "20px"
      }
    },
  },
  plugins: [],
} satisfies Config;
