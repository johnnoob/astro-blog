import type { TocItem } from "./utils.ts";

type Props = {
  heading: TocItem;
  intersectHeadingId: string;
  setIsNavbarOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const TableOfContentsHeading = ({
  heading,
  intersectHeadingId,
  setIsNavbarOpen,
}: Props) => {
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
            const top = targetSection.offsetTop;
            window.scrollTo({
              top,
              behavior: "smooth",
            });
          }
          if (setIsNavbarOpen !== undefined) {
            setIsNavbarOpen(false);
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
              setIsNavbarOpen={setIsNavbarOpen}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default TableOfContentsHeading;
