// shadCN components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

  return (
    <section>
      <Tabs defaultValue="category">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="category">類別</TabsTrigger>
          <TabsTrigger value="subcategory">子類別</TabsTrigger>
          <TabsTrigger value="tag">標籤</TabsTrigger>
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
