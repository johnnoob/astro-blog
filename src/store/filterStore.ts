import { subDays } from "date-fns";
import { map } from "nanostores";
import { type DateRange } from "react-day-picker";

type FilterStoreProps = {
  categoryFilters: string[];
  subcategoryFilters: string[];
  tagFilters: string[];
  isDateAscending: boolean;
  searchInput: string;
  dateRange: DateRange;
};

export const filterStore = map<FilterStoreProps>({
  categoryFilters: [],
  subcategoryFilters: [],
  tagFilters: [],
  isDateAscending: false,
  searchInput: "",
  dateRange: {
    from: undefined,
    to: undefined,
  },
});
