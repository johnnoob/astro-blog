import { useEffect } from "react";
import { useStore } from "@nanostores/react";
import { themeStore } from "@/store/contextStore";

type Theme = "light" | "dark";

export const useTheme = (): [Theme, (theme: Theme) => void] => {
  const $theme = useStore(themeStore);
  useEffect(() => {
    const isDark = $theme === "dark";
    document.documentElement.classList[isDark ? "add" : "remove"]("dark");
    localStorage.setItem("theme", $theme);
  }, [$theme]);
  const setThemeState = (theme: Theme) => {
    themeStore.set(theme);
  };

  return [$theme, setThemeState];
};
