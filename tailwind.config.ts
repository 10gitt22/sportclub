import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#b0cfbd',
        primaryDarken: "#a0bdac",
        black: "#222",
        white: "#fff",
        borderDark: "#333",
        textGray: "#999"
      },
      fontSize: {
        h1: '6rem',
        h2: '5rem',
        h3: '3.1rem',
        l: "1.125rem",
        p: "1.5rem",
        xs: '1rem',
        descriptor: "1.25rem",
        button: "1.125rem",
      },
    },
  },
  plugins: [],
} satisfies Config;