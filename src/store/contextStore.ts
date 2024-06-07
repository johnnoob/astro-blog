import { atom } from "nanostores";

// theme
type Theme = "light" | "dark";

const getThemePreference = (): Theme => {
  if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
    const theme = localStorage.getItem("theme");
    if (theme !== null && (theme === "light" || theme === "dark")) return theme;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};
const initialTheme: Theme = getThemePreference();
export const themeStore = atom<Theme>(initialTheme);
