// react
import { useEffect } from "react";
// utils
import { buildToc } from "./utils";
// react components
import TableOfContentsHeading from "./TableOfContentsHeading";
// type
import type { MarkdownHeading } from "astro";

type Prop = {
  headings: MarkdownHeading[];
};

const TableOfContents = ({ headings }: Prop) => {
  const toc = buildToc(headings);
  useEffect(() => {
    const headings = document.querySelectorAll(
      ".prose h1, .prose h2, .prose h3"
    );
    // const callback = (entries, observer) => {
    //   entries.forEach((entry) => {
    //     if (entry.isIntersecting) {
    //       console.log("目標元素進入視口");
    //       target.style.backgroundColor = "lightgreen";
    //     } else {
    //       console.log("目標元素離開視口");
    //       target.style.backgroundColor = "lightblue";
    //     }
    //   });
    // };
    // // IntersectionObserver 選項
    // const options = {
    //   root: null, // 預設為視口
    //   rootMargin: "0px",
    //   threshold: 0.1, // 當目標元素 10% 可見時觸發回調
    // };

    // // 創建 IntersectionObserver 實例
    // const observer = new IntersectionObserver(callback, options);
    // // 開始觀察目標元素
    // observer.observe(headings);
    // return () => observer.disconnect();
  }, []);

  return (
    <nav>
      <ul className="flex flex-col gap-1">
        {toc.map((heading, index) => (
          <TableOfContentsHeading key={index} heading={heading} />
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
