export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        text: "var(--text)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        card: "var(--card)",
        border: "var(--border)"
      }
    }
  },
  plugins: []
};
