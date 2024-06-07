import { map } from "nanostores";

type FilterStoreProps = {
  categoryFilters: string[];
  subcategoryFilters: string[];
  tagFilters: string[];
  isDateAscending: boolean;
  searchInput: string;
};

export const filterStore = map<FilterStoreProps>({
  categoryFilters: [],
  subcategoryFilters: [],
  tagFilters: [],
  isDateAscending: false,
  searchInput: "",
});
