// shadCN components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// react
import { useState } from "react";
// react components
import FilterTabsCard from "./FilterTabsCard";

type Props = {
  categoryFilters: string[];
  subcategoryFilters: string[];
  tagFilters: string[];
  categoryToNumOfPostsMap: Record<string, number>;
  subcategoryToNumOfPostsMap: Record<string, number>;
  tagToNumOfPostsMap: Record<string, number>;
  notFoundCategories: string[];
  notFoundSubcategories: string[];
  notFoundTags: string[];
  handleCategorySelect: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  handleSubcategorySelect: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  handleTagSelect: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const FilterSidebar = ({
  categoryFilters,
  subcategoryFilters,
  tagFilters,
  categoryToNumOfPostsMap,
  subcategoryToNumOfPostsMap,
  tagToNumOfPostsMap,
  notFoundCategories,
  notFoundSubcategories,
  notFoundTags,
  handleCategorySelect,
  handleSubcategorySelect,
  handleTagSelect,
}: Props) => {
  const allCategories = Object.keys(categoryToNumOfPostsMap);
  const allSubcategories = Object.keys(subcategoryToNumOfPostsMap);
  const allTags = Object.keys(tagToNumOfPostsMap);
  const foundCategories = allCategories.filter(
    (category) => !notFoundCategories.includes(category)
  );
  const foundSubcategories = allSubcategories.filter(
    (subcategory) => !notFoundSubcategories.includes(subcategory)
  );
  const foundTags = allTags.filter((tag) => !notFoundTags.includes(tag));

  // tab switch
  type TabValue = "category" | "subcategory" | "tag";
  const [tabValue, setTabValue] = useState<TabValue>("category");

  return (
    <section>
      <Tabs
        defaultValue="category"
        onValueChange={(value) => setTabValue(value as TabValue)}
      >
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="category" className="flex gap-1 items-center">
            類別
            {categoryFilters.length > 0 && (
              <span
                className={`w-5 h-5 rounded-full grid place-content-center ${
                  tabValue === "category"
                    ? "bg-primary text-muted"
                    : "bg-muted-foreground text-muted"
                }`}
              >
                {categoryFilters.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="subcategory" className="flex gap-1 items-center">
            子類別
            {subcategoryFilters.length > 0 && (
              <span
                className={`w-5 h-5 rounded-full grid place-content-center ${
                  tabValue === "subcategory"
                    ? "bg-primary text-muted"
                    : "bg-muted-foreground text-muted"
                }`}
              >
                {subcategoryFilters.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="tag" className="flex gap-1 items-center">
            標籤
            {tagFilters.length > 0 && (
              <span
                className={`w-5 h-5 rounded-full grid place-content-center ${
                  tabValue === "tag"
                    ? "bg-primary text-muted"
                    : "bg-muted-foreground text-muted"
                }`}
              >
                {tagFilters.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="category" className="text-sm">
          <FilterTabsCard
            filterType="category"
            filters={categoryFilters}
            foundFilters={foundCategories}
            notFoundFilters={notFoundCategories}
            filterToNumOfPostsMap={categoryToNumOfPostsMap}
            handleFilterSelect={handleCategorySelect}
          />
        </TabsContent>
        <TabsContent value="subcategory" className="text-sm">
          <FilterTabsCard
            filterType="subcategory"
            filters={subcategoryFilters}
            foundFilters={foundSubcategories}
            notFoundFilters={notFoundSubcategories}
            filterToNumOfPostsMap={subcategoryToNumOfPostsMap}
            handleFilterSelect={handleSubcategorySelect}
          />
        </TabsContent>
        <TabsContent value="tag" className="text-sm">
          <FilterTabsCard
            filterType="tag"
            filters={tagFilters}
            foundFilters={foundTags}
            notFoundFilters={notFoundTags}
            filterToNumOfPostsMap={tagToNumOfPostsMap}
            handleFilterSelect={handleTagSelect}
          />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default FilterSidebar;
