// utils
import { useTheme } from "./utils.ts";
import { useScrollDirection } from "../PostPage/utils.ts";
// constants
import { navLinks } from "@/constants/links";
// shadCN
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
// react icons
import { FaRss, FaBars } from "react-icons/fa6";
// reacr components
import { ThemeModeSwitch } from "./ThemeModeSwitch.tsx";
import Logo from "./Logo.tsx";
// nano store
import { useStore } from "@nanostores/react";
import { isSidebarOpenStore } from "@/store/isSidebarOpenStore.ts";
import { useEffect } from "react";

const MainNavNar = () => {
  const [theme, setThemeState] = useTheme();
  const isScrollDown = useScrollDirection();
  const isSidebarOpen = useStore(isSidebarOpenStore);

  const handleThemeChange = (e: boolean): void => {
    e ? setThemeState("dark") : setThemeState("light");
  };
  return (
    <nav
      id="main-navbar"
      className={`fixed w-full py-3 border-b-[1px] backdrop-filter backdrop-blur-sm bg-opacity-80 z-10 h-[65px] transition-navbar ${
        theme === "light" ? "bg-white" : "bg-black"
      } ${isScrollDown ? "-translate-y-full" : "-translate-y-0"}`}
    >
      <div className="max-container">
        <div className="flex items-center justify-between">
          <div>
            <a
              href="/"
              className="flex items-center space-x-2 text-primary font-bold"
            >
              <Logo size={30} />
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
            <Button
              id="sidebar-button"
              variant={"ghost"}
              className="lg:hidden"
              onClick={() => {
                isSidebarOpenStore.set(!isSidebarOpen);
              }}
            >
              <FaBars size={20} />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNavNar;
