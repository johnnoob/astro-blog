import { useState, useEffect } from "react";
// shadCN
import { navLinks } from "@/constants/links";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FaRss, FaBars } from "react-icons/fa6";
// components
import { ThemeModeSwitch } from "./ThemeModeSwitch.tsx";
import JSIcon from "@/icons/JSIcon.tsx";

type Theme = "light" | "dark";

const MainNavNar = () => {
  const storedTheme = localStorage.getItem("theme");
  const initialTheme: Theme = storedTheme === null ? "light" : "dark";
  const [theme, setThemeState] = useState<Theme>(initialTheme);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setThemeState(isDarkMode ? "dark" : "light");
  }, []);

  useEffect(() => {
    const isDark = theme === "dark";
    document.documentElement.classList[isDark ? "add" : "remove"]("dark");
  }, [theme]);

  const handleThemeChange = (e: boolean): void => {
    e ? setThemeState("dark") : setThemeState("light");
  };
  return (
    <nav
      id="main-navbar"
      className={`fixed w-full py-3 border-b-[1px] backdrop-filter backdrop-blur-sm bg-opacity-80 z-50 ${
        theme === "light" ? "bg-white" : "bg-black"
      }`}
    >
      <div className="max-container">
        <div className="flex items-center justify-between">
          <div>
            <a
              href="/"
              className="flex items-center space-x-2 text-primary font-bold"
            >
              <JSIcon size={35} theme={theme}></JSIcon>
              <span>John's Script</span>
            </a>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center space-x-3 max-lg:hidden">
              {navLinks.map((link) => (
                <div className="h-6 flex space-x-3" key={link.label}>
                  <a
                    className="text-foreground hover:text-muted-foreground"
                    href={link.url}
                  >
                    {link.label}
                  </a>
                  <Separator orientation="vertical" />
                </div>
              ))}
            </div>
            <Button className="max-lg:hidden">
              <FaRss size={20} className="mr-1" />
              <span>訂閱RSS</span>
            </Button>
            <ThemeModeSwitch
              theme={theme}
              handleThemeChange={handleThemeChange}
            />
            <Button variant={"ghost"} className="lg:hidden">
              <FaBars size={20} />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNavNar;
