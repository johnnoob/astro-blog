// react
import React from "react";
// nano store
import { filterStore } from "@/store/filterStore";

type Props = {
  filterType: "categoryFilters" | "subcategoryFilters" | "tagFilters";
  filter: string;
  children: React.ReactNode;
  className: string;
};

const Link = ({ filterType, filter, children, className }: Props) => {
  const defaultFilterMap = {
    categoryFilters: [],
    subcategoryFilters: [],
    tagFilters: [],
    isDateAscending: false,
    searchInput: "",
  };

  return (
    <a
      href="/blog"
      className={className}
      onClick={() => {
        filterStore.set({
          ...defaultFilterMap,
          [filterType]: [filter],
        });
      }}
    >
      {children}
    </a>
  );
};

export default Link;
