import { useState, useEffect } from "react";

type Theme = "light" | "dark";

export const useTheme = (): [Theme, (theme: Theme) => void] => {
  const getThemePreference = (): Theme => {
    if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
      const theme = localStorage.getItem("theme");
      if (theme !== null && (theme === "light" || theme === "dark"))
        return theme;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };
  const initialTheme: Theme = getThemePreference();
  const [theme, setThemeState] = useState<Theme>(initialTheme);
  useEffect(() => {
    const isDark = theme === "dark";
    document.documentElement.classList[isDark ? "add" : "remove"]("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return [theme, setThemeState];
};
