import { navLinks } from "@/constants/links";
import { useStore } from "@nanostores/react";
import { isSidebarOpenStore } from "@/store/isSidebarOpenStore";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { FaXmark } from "react-icons/fa6";

const Sidebar = () => {
  const isSidrbarOpen = useStore(isSidebarOpenStore);
  return (
    <section>
      <div
        className={`fixed top-0 left-0 h-screen w-full bg-black z-20 opacity-60 ${
          !isSidrbarOpen && "hidden"
        }`}
      />
      <div
        className={`fixed top-0 left-0 h-screen w-1/2 bg-background transition-all z-30 ${
          !isSidrbarOpen && "-translate-x-full"
        }`}
      >
        <Button
          variant="ghost"
          className="absolute top-4 right-3"
          onClick={() => {
            isSidebarOpenStore.set(!isSidrbarOpen);
          }}
        >
          <FaXmark size={25} />
        </Button>
        <Card className="border-none shadow-none pt-1">
          <CardHeader>
            <CardTitle>導覽列</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 text-lg">
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
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Sidebar;
