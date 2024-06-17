// react
import { useState } from "react";
//react components
import TableOfContents from "./TableOfContents";
// utils
import { useHeadingObserver, useScrollDirection } from "./utils";
// shadCN
import { Card, CardHeader, CardContent } from "../ui/card";
import { Button } from "../ui/button";
// react icons
import { FaList, FaAngleRight } from "react-icons/fa6";
// type
import type { MarkdownHeading } from "astro";

type Prop = {
  headings: MarkdownHeading[];
};

const TableOfContentsSidebar = ({ headings }: Prop) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isScrollDown = useScrollDirection();
  const intersectHeadingId = useHeadingObserver(isScrollDown);
  return (
    <Card className="border-r-0 rounded-r-none max-w-[250px] max-lg:hidden">
      <CardHeader className="px-3 py-2">
        <Button
          className="w-fit"
          variant="ghost"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaAngleRight /> : <FaList />}
          <span className="ml-2">{`${isOpen ? "收合目錄" : "目錄"}`}</span>
        </Button>
      </CardHeader>
      <CardContent className={`${!isOpen && "hidden"}`}>
        <TableOfContents
          headings={headings}
          intersectHeadingId={intersectHeadingId}
        />
      </CardContent>
    </Card>
  );
};

export default TableOfContentsSidebar;
