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
