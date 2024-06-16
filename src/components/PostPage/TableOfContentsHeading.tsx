import type { TocItem } from "./utils.ts";

type Prop = {
  heading: TocItem;
  intersectHeadingId: string;
};

const TableOfContentsHeading = ({ heading, intersectHeadingId }: Prop) => {
  return (
    <li className="flex flex-col gap-1">
      <a
        className={`${
          heading.slug === intersectHeadingId
            ? "text-primary font-semibold"
            : "text-muted-foreground font-normal"
        }`}
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
        <ul className="pl-4">
          {heading.subheadings.map((subheading: TocItem, index) => (
            <TableOfContentsHeading
              key={index}
              heading={subheading}
              intersectHeadingId={intersectHeadingId}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default TableOfContentsHeading;
