import type { TocItem } from "./utils.ts";
import { useRef } from "react";

type Prop = {
  heading: TocItem;
};

const TableOfContentsHeading = ({ heading }: Prop) => {
  return (
    <li>
      <a
        href={"#" + heading.slug}
        onClick={(e) => {
          e.preventDefault();
          const targetSection = document.getElementById(heading.slug);
          if (targetSection) {
            const top = targetSection.getBoundingClientRect().top;
            window.scrollTo({
              top: top - 65,
              behavior: "smooth",
            });
          }
        }}
      >
        {heading.text}
      </a>
      {heading.subheadings.length > 0 && (
        <ul className="pl-3">
          {heading.subheadings.map((subheading: TocItem, index) => (
            <TableOfContentsHeading key={index} heading={subheading} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default TableOfContentsHeading;
