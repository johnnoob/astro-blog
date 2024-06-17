// react
import { useState } from "react";
// react components
import TableOfContents from "./TableOfContents";
// utils
import { useHeadingObserver, useScrollDirection } from "./utils";
import { useTheme } from "../MainNavBar/utils";
// react icons
import { FaAngleRight, FaAngleDown } from "react-icons/fa6";
// type
import type { MarkdownHeading } from "astro";
// shadCN
import { Button } from "../ui/button";

type Props = {
  headings: MarkdownHeading[];
};

const TableOfContentsNavbar = ({ headings }: Props) => {
  const [theme, setThemeState] = useTheme();
  const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(false);
  const isScrollDown = useScrollDirection();
  const intersectHeadingId = useHeadingObserver(isScrollDown);

  return (
    <nav
      className={`fixed top-0 left-0 w-full text-sm backdrop-filter backdrop-blur-sm bg-opacity-80 border-b-[1px] z-10 lg:hidden transition-navbar ${
        theme === "light" ? "bg-white" : "bg-black"
      } ${isScrollDown ? "-translate-y-0" : "-translate-y-full"}`}
    >
      <div className="max-container py-2 flex items-center gap-3 h-[65px]">
        <Button
          variant="outline"
          className="font-normal"
          onClick={() => setIsNavbarOpen(!isNavbarOpen)}
        >
          <span>在此貼文</span>
          {isNavbarOpen ? (
            <FaAngleDown className="ml-2" />
          ) : (
            <FaAngleRight className="ml-2" />
          )}
        </Button>
        <span>{intersectHeadingId}</span>
      </div>
      <div className={`max-container pt-1 pb-2 ${!isNavbarOpen && "hidden"}`}>
        <TableOfContents
          headings={headings}
          intersectHeadingId={intersectHeadingId}
          setIsNavbarOpen={setIsNavbarOpen}
        />
      </div>
    </nav>
  );
};

export default TableOfContentsNavbar;
