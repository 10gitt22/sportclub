import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: 'bg-teal-500',
        black: "#222",
        borderDark: "#333",
      },
      fontSize: {
        p: "18px",
        button: "18px",
        h1: '90px',
        h2: '80px'
      }
    },
  },
  plugins: [],
} satisfies Config;
