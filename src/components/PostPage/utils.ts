// react
import { useEffect, useRef, useState } from "react";
// type
import type { MarkdownHeading } from "astro";

export type TocItem = MarkdownHeading & {
  subheadings: TocItem[];
};

export function buildToc(headings: MarkdownHeading[]) {
  const toc: TocItem[] = [];
  const parentHeadings = new Map<number, TocItem>();
  headings.forEach((h) => {
    const heading: TocItem = { ...h, subheadings: [] };
    parentHeadings.set(heading.depth, heading);
    if (heading.depth === 1) {
      toc.push(heading);
    } else {
      const parent = parentHeadings.get(heading.depth - 1);
      if (parent) {
        parent.subheadings.push(heading);
      }
    }
  });
  return toc;
}

export function useScrollDirection() {
  const prevScrollY = useRef<number>(0);
  // const isScrollDown = useRef<boolean>(false);
  const [isScrollDown, setIsScrollDown] = useState<boolean>(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > prevScrollY.current) {
        // isScrollDown.current = true;
        setIsScrollDown(true);
      } else if (window.scrollY <= prevScrollY.current) {
        // isScrollDown.current = false;
        setIsScrollDown(false);
      }
      prevScrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return isScrollDown;
}

export function useHeadingObserver(isScrollDown: boolean) {
  const [intersectHeadingId, setIntersectHeadingId] = useState<string>("");

  useEffect(() => {
    const headings = document.querySelectorAll(
      ".prose h1, .prose h2, .prose h3"
    );
    const firstHeadingId = headings[0]?.id;

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          setIntersectHeadingId(target.id);
        } else {
          if (target.id === firstHeadingId && !isScrollDown) {
            setIntersectHeadingId("");
          }
        }
      });
    };

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: "0px 0px -70% 0px",
      threshold: 1,
    };

    const observer = new IntersectionObserver(callback, options);
    headings.forEach((heading) => observer.observe(heading));
    return () => {
      headings.forEach((heading) => observer.unobserve(heading));
      observer.disconnect();
    };
  }, [isScrollDown]);

  return intersectHeadingId;
}

export default useHeadingObserver;
