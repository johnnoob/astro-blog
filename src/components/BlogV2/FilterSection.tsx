// shadCN components
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";

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

const FilterSection = ({
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
      <Tabs defaultValue="category" className="w-[400px]">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="category">類別</TabsTrigger>
          <TabsTrigger value="subcategory">子類別</TabsTrigger>
          <TabsTrigger value="tag">標籤</TabsTrigger>
        </TabsList>
        <TabsContent value="category">
          <Card>
            <CardHeader>
              <CardTitle>篩選類別</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {foundCategories.map((category) => (
                  <button
                    key={category}
                    className={`px-2 py-1 flex gap-1 items-center rounded-md ${
                      categoryFilters.includes(category)
                        ? "bg-primary text-muted"
                        : "bg-muted text-primary"
                    }`}
                    value={category}
                    onClick={handleCategorySelect}
                  >
                    {category}
                    <span className="rounded-full w-6 h-6 bg-primary text-muted grid place-content-center text-sm">
                      {categoryToNumOfPostsMap[category]}
                    </span>
                  </button>
                ))}
              </div>
              <Separator />
              <div className="flex flex-wrap items-center gap-2">
                {notFoundCategories.map((category) => (
                  <button
                    key={category}
                    value={category}
                    onClick={handleCategorySelect}
                    className={`px-2 py-1 rounded-md opacity-50 ${
                      categoryFilters.includes(category)
                        ? "bg-destructive text-destructive-foreground"
                        : "bg-muted text-primary"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="subcategory">
          <Card>
            <CardHeader>
              <CardTitle>篩選子類別</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              <div className="flex flex-wrap items-center gap-2">
                {foundSubcategories.map((subcategory) => (
                  <button
                    key={subcategory}
                    className={`px-2 py-1 rounded-md ${
                      subcategoryFilters.includes(subcategory)
                        ? "bg-primary text-muted"
                        : "bg-muted text-primary"
                    }`}
                    value={subcategory}
                    onClick={handleSubcategorySelect}
                  >
                    {subcategory}
                  </button>
                ))}
              </div>
              <Separator />
              <div className="flex flex-wrap items-center gap-2">
                {notFoundSubcategories.map((subcategory) => (
                  <button
                    key={subcategory}
                    value={subcategory}
                    className={`px-2 py-1 rounded-md opacity-50 ${
                      subcategoryFilters.includes(subcategory)
                        ? "bg-destructive text-destructive-foreground"
                        : "bg-muted text-primary"
                    }`}
                    onClick={handleSubcategorySelect}
                  >
                    {subcategory}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default FilterSection;
