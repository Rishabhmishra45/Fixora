import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("fixora-theme") || "light"
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("theme-light", "theme-dark", "theme-midnight");
    root.classList.add(`theme-${theme}`);
    localStorage.setItem("fixora-theme", theme);
  }, [theme]);

  const toggleTheme = (mode) => {
    setTheme(mode);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
