// react
import { useState, useEffect, useRef } from "react";
// utils
import { buildToc } from "./utils";
// react components
import TableOfContentsHeading from "./TableOfContentsHeading";
// type
import type { MarkdownHeading } from "astro";
// shadCN
import { ScrollArea } from "../ui/scroll-area";

type Prop = {
  headings: MarkdownHeading[];
};

const TableOfContents = ({ headings }: Prop) => {
  const toc = buildToc(headings);
  const [intersectHeadingId, setIntersectHeadingId] = useState<string>("");
  const prevScrollY = useRef<number>(0);
  const isScrollDown = useRef<boolean>(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > prevScrollY.current) {
        isScrollDown.current = true;
      } else if (window.scrollY <= prevScrollY.current) {
        isScrollDown.current = false;
      }
      prevScrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    const headings = document.querySelectorAll(
      ".prose h1, .prose h2, .prose h3"
    );
    const firstHeadingId = headings[0].id;

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const target = entry.target;
        if (entry.isIntersecting) {
          setIntersectHeadingId(target.id);
        } else {
          if (target.id === firstHeadingId && !isScrollDown.current) {
            setIntersectHeadingId("");
          }
        }
      });
    };
    // IntersectionObserver 選項
    const options: IntersectionObserverInit = {
      root: null, // 預設為視口
      rootMargin: "0px 0px -70% 0px",
      threshold: 1, // 當目標元素 10% 可見時觸發回調
    };
    // 創建 IntersectionObserver 實例
    const observer: IntersectionObserver = new IntersectionObserver(
      callback,
      options
    );
    // 開始觀察每個目標元素
    headings.forEach((heading) => observer.observe(heading));
    return () => {
      // 取消觀察所有元素
      headings.forEach((heading) => observer.unobserve(heading));
      // 斷開與觀察者的連結
      observer.disconnect();
    };
  }, []);

  return (
    <nav>
      <ScrollArea className="max-h-[380px]">
        <ul className="flex flex-col gap-1 pr-4">
          {toc.map((heading, index) => (
            <TableOfContentsHeading
              key={index}
              heading={heading}
              intersectHeadingId={intersectHeadingId}
            />
          ))}
        </ul>
      </ScrollArea>
    </nav>
  );
};

export default TableOfContents;
