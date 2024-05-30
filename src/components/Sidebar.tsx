import { navLinks } from "@/constants/links";
import { useStore } from "@nanostores/react";
import { isSidebarOpenStore } from "@/store/isSidebarOpenStore";
import { themeStore } from "@/store/contextStore";
import Logo from "./MainNavBar/Logo";
import { useEffect } from "react";

const Sidebar = () => {
  const isSidrbarOpen = useStore(isSidebarOpenStore);
  const theme = useStore(themeStore);
  useEffect(() => {
    if (isSidrbarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isSidrbarOpen]);
  return (
    <section id="sidebar">
      <div
        className={`fixed top-[65px] left-0 h-screen w-full transition-all z-30 backdrop-filter backdrop-blur-sm bg-opacity-80 ${
          !isSidrbarOpen && "-translate-x-full"
        } ${theme === "light" ? "bg-white" : "bg-black"}`}
      >
        <div className="grid place-content-center">
          <div className="flex flex-col items-center border-none shadow-none w-fit mx-auto">
            <div className="py-6">
              <Logo size={80} />
            </div>
            <div>
              <div className="flex flex-col items-center gap-3 text-lg">
                {navLinks.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    onClick={() => {
                      isSidebarOpenStore.set(false);
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
