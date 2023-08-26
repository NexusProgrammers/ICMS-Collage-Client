import { createContext, useContext, useEffect, useState } from "react";
import Cookie from "js-cookie";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = Cookie.get("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      Cookie.set("theme", "dark", {
        expires: 365,
        sameSite: "Strict",
        secure: true,
      });
    } else {
      Cookie.remove("theme");
    }
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
