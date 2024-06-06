// shadCN
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
// react icon
import { FaFilter } from "react-icons/fa6";

type Props = {
  filterType: "category" | "subcategory" | "tag";
  filters: string[];
  foundFilters: string[];
  notFoundFilters: string[];
  filterToNumOfPostsMap: Record<string, number>;
  handleFilterSelect: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
};

const FilterTabsCard = ({
  filterType,
  filters,
  foundFilters,
  notFoundFilters,
  filterToNumOfPostsMap,
  handleFilterSelect,
}: Props) => {
  const filterTypeMap: Record<string, string> = {
    category: "類別",
    subcategory: "子類別",
    tag: "標籤",
  };
  return (
    <Card>
      <CardHeader className="py-3 flex flex-row gap-1 items-center">
        <FaFilter size={15} className="translate-y-1" />
        <CardTitle className="text-base">
          篩選{filterTypeMap[filterType]}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-5">
        <ScrollArea className="max-h-[450px]">
          <div className="flex flex-wrap items-center gap-2">
            {foundFilters.map((filter) => (
              <button
                key={filter}
                className={`px-2 py-1 flex gap-1 items-center rounded-md ${
                  filters.includes(filter)
                    ? "bg-primary text-muted"
                    : "bg-muted text-primary"
                }`}
                value={filter}
                onClick={handleFilterSelect}
              >
                {filter}
                <span
                  className={`rounded-full w-5 h-5 grid place-content-center ${
                    filters.includes(filter)
                      ? "bg-muted text-primary"
                      : "bg-primary text-muted"
                  }`}
                >
                  {filterToNumOfPostsMap[filter]}
                </span>
              </button>
            ))}
          </div>
          {notFoundFilters.length > 0 && (
            <>
              <div className="relative my-2">
                <Separator className="absolute top-1/2" />
                <div className="relative w-fit mx-auto px-2 bg-cover text-muted-foreground">
                  無相符內容
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {notFoundFilters.map((filter) => (
                  <button
                    key={filter}
                    value={filter}
                    onClick={handleFilterSelect}
                    className={`px-2 py-1 rounded-md opacity-50 ${
                      filters.includes(filter)
                        ? "bg-destructive text-destructive-foreground"
                        : "bg-muted text-primary"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default FilterTabsCard;
