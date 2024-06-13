import { buildToc } from "./utils";
import TableOfContentsHeading from "./TableOfContentsHeading";
import type { MarkdownHeading } from "astro";
type Prop = {
  headings: MarkdownHeading[];
};

const TableOfContents = ({ headings }: Prop) => {
  const toc = buildToc(headings);

  return (
    <nav>
      <ul>
        {toc.map((heading, index) => (
          <TableOfContentsHeading key={index} heading={heading} />
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
