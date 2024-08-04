// utils
import { useTheme } from "./utils.ts";
import { useScrollDirection } from "../PostPage/utils.ts";
// constants
import { navLinks } from "@/constants/links";
// shadCN
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "../ui/card.tsx";
// type
import type { CollectionEntry } from "astro:content";
// react
import React, { useState, useRef } from "react";
// react icons
import { FaRss, FaBars } from "react-icons/fa6";
import { LuCalendarDays } from "react-icons/lu";
// reacr components
import { ThemeModeSwitch } from "./ThemeModeSwitch.tsx";
import Logo from "./Logo.tsx";
import Google from "../Auth/Google.tsx";
// nano store
import { useStore } from "@nanostores/react";
import { isSidebarOpenStore } from "@/store/isSidebarOpenStore.ts";

type User = {
  id: string;
  name: string;
  picture: string | undefined;
  email: string | undefined;
  identity: "guest" | "member" | "admin";
};

type Props = {
  rootPath: string;
  posts: CollectionEntry<"posts">[];
  user: User | undefined;
};

const MainNavNar = ({ rootPath, posts, user }: Props) => {
  const [theme, setThemeState] = useTheme();
  const isScrollDown = useScrollDirection();
  const isSidebarOpen = useStore(isSidebarOpenStore);
  const [targetCategory, setTargetCategory] = useState<string>("");
  const isMouseInNavbar = useRef<boolean>(false);

  const handleThemeChange = (e: boolean): void => {
    e ? setThemeState("dark") : setThemeState("light");
  };

  const categories = [...new Set(posts.map((post) => post.data.category))];
  const filteredPosts = posts
    .filter((post) => post.data.category === targetCategory)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    .slice(0, 3);

  const handleCategoryEnter = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setTargetCategory(e.currentTarget.getAttribute("data-category") as string);
    isMouseInNavbar.current = true;
  };

  const handleCategoryLeave = () => {
    isMouseInNavbar.current = false;
    setTimeout(() => {
      if (!isMouseInNavbar.current) {
        setTargetCategory("");
      }
    }, 100); // 延迟以确保鼠标不在 navbar 时重置 category
  };

  const handleNavbarEnter = () => {
    isMouseInNavbar.current = true;
  };

  const handleNavbarLeave = () => {
    isMouseInNavbar.current = false;
    setTimeout(() => {
      if (!isMouseInNavbar.current) {
        setTargetCategory("");
      }
    }, 100); // 延迟以确保鼠标不在 navbar 时重置 category
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed w-full border-b-[1px] backdrop-filter backdrop-blur-sm bg-opacity-80 z-10 transition-navbar ${
        theme === "light" ? "bg-white" : "bg-black"
      } ${isScrollDown ? "-translate-y-full" : "-translate-y-0"}`}
    >
      <div className="max-container h-[65px] py-3">
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
          <div className="flex items-center gap-2 text-sm">
            <div className="flex gap-2 items-center max-lg:hidden">
              {categories.map((category, index) => (
                <React.Fragment key={index}>
                  <div
                    className="flex items-center"
                    data-category={category}
                    onMouseEnter={handleCategoryEnter}
                    onMouseLeave={handleCategoryLeave}
                  >
                    <Button variant="link" className="p-0">
                      <a
                        href={`/blog?category=${category}`}
                        className={`${
                          targetCategory === category && "underline"
                        }`}
                      >
                        {category}
                      </a>
                    </Button>
                  </div>
                  <Separator orientation="vertical" className="h-6" />
                </React.Fragment>
              ))}
              {navLinks.map((link, index) => (
                <React.Fragment key={index}>
                  <div className="flex items-center" key={index}>
                    <Button
                      variant="link"
                      className={`p-0 ${
                        rootPath === link.url.split("/")[1] && "underline"
                      }`}
                    >
                      <a href={link.url}>{link.label}</a>
                    </Button>
                  </div>
                  <Separator orientation="vertical" className="h-6" />
                </React.Fragment>
              ))}
            </div>
            <Google user={user} />
            <Button className="max-lg:hidden" variant="ghost" size="icon">
              <FaRss size={20} />
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
      <div
        className={`py-3 flex justify-center items-start gap-5
        } ${targetCategory === "" && "hidden"}`}
        onMouseEnter={handleNavbarEnter}
        onMouseLeave={handleNavbarLeave}
      >
        {filteredPosts.map((post, index) => (
          <Card
            key={index}
            className="p-0 border-0 shadow-none w-[180px] bg-transparent"
          >
            <CardHeader className="p-0">
              <a href={`/blog/${post.slug}`}>
                <img
                  src={post.data.heroImage.src.src}
                  alt={post.data.heroImage.alt}
                  className="object-cover aspect-[16/10] rounded-md"
                />
              </a>
            </CardHeader>
            <CardContent className="px-0 py-2 grid gap-1 text-sm text-center">
              <a
                href={`/blog/${post.slug}`}
                className=" font-semibold line-clamp-2 hover:underline underline-offset-3"
              >
                {post.data.title}
              </a>
              <div className="flex gap-1 items-center text-muted-foreground mx-auto">
                <LuCalendarDays size={15} />
                <span>
                  {post.data.date.toLocaleDateString("zh-TW", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </nav>
  );
};

export default MainNavNar;
