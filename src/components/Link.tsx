// react
import React from "react";
// nano store
import { linkStore } from "@/store/linkStore";

type Props = {
  filterType: "category" | "subcategory" | "tag";
  filter: string;
  children: React.ReactNode;
  className: string;
};

const Link = ({ filterType, filter, children, className }: Props) => {
  return (
    <a
      href="/blog"
      className={className}
      onClick={() => {
        linkStore.set({
          filterType,
          filter,
        });
      }}
    >
      {children}
    </a>
  );
};

export default Link;
