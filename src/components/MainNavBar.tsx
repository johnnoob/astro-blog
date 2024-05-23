import React, { useState, useEffect } from "react";
import { navLinks } from "@/constants/links";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FaRss, FaBars } from "react-icons/fa6";
import { ThemeModeSwitch } from "./ThemeModeSwitch.tsx";

type Theme = "light" | "dark" | "system";
const MainNavNar = () => {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setThemeState(isDarkMode ? "dark" : "light");
  }, []);

  useEffect(() => {
    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList[isDark ? "add" : "remove"]("dark");
  }, [theme]);

  const handleThemeChange = (e: boolean): void => {
    e ? setThemeState("dark") : setThemeState("light");
  };

  return (
    <nav
      className={`fixed w-full padding-x py-3 border-b-[1px] backdrop-filter backdrop-blur-sm bg-opacity-80 ${
        theme === "light" ? "bg-white" : "bg-black"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <a
            href="/"
            className="flex items-center space-x-1 text-primary font-bold"
          >
            <span>John's Script</span>
          </a>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center space-x-3 max-md:hidden">
            {navLinks.map((link) => (
              <div className="h-6 flex space-x-3" key={link.label}>
                <a
                  className="text-muted-foreground hover:text-foreground"
                  href={link.url}
                >
                  {link.label}
                </a>
                <Separator orientation="vertical" />
              </div>
            ))}
          </div>
          <Button className="max-md:hidden">
            <FaRss size={20} className="mr-1" />
            <span>訂閱RSS</span>
          </Button>
          <ThemeModeSwitch
            theme={theme}
            handleThemeChange={handleThemeChange}
          />
          <Button variant={"ghost"}>
            <FaBars className="md:hidden" size={20} />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default MainNavNar;
