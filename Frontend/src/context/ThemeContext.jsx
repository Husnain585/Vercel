import { createContext, useContext, useState, useEffect } from "react";
import config from "../config/config"; // import your theme config

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  // Apply theme class to <html>
  useEffect(() => {
    document.documentElement.classList.remove(theme === "light" ? "dark" : "light");
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  // Theme data (from config.js)
  const themeConfig = config.theme[theme];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, themeConfig }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook
export const useTheme = () => useContext(ThemeContext);
export default ThemeContext;
