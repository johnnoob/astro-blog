import { atom, type WritableAtom } from "nanostores";

type linkProps = {
  filterType: "category" | "subcategory" | "tag";
  filter: string;
};
export const linkStore: WritableAtom<linkProps> = atom(null);
