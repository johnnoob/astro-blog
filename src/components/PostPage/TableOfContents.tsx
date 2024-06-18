// utils
import { buildToc, useHeadingObserver, useScrollDirection } from "./utils";
// react components
import TableOfContentsHeading from "./TableOfContentsHeading";
// type
import type { MarkdownHeading } from "astro";
// shadCN
import { ScrollArea } from "../ui/scroll-area";

type Props = {
  headings: MarkdownHeading[];
  intersectHeadingId: string;
  setIsNavbarOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const TableOfContents = ({
  headings,
  intersectHeadingId,
  setIsNavbarOpen,
}: Props) => {
  const toc = buildToc(headings);
  return (
    <nav>
      <ScrollArea className="max-h-[380px] overflow-y-auto">
        <ul className="flex flex-col gap-1 pr-4">
          {toc.map((heading, index) => (
            <TableOfContentsHeading
              key={index}
              heading={heading}
              intersectHeadingId={intersectHeadingId}
              setIsNavbarOpen={setIsNavbarOpen}
            />
          ))}
        </ul>
      </ScrollArea>
    </nav>
  );
};

export default TableOfContents;
