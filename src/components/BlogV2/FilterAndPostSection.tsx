// react
import { useState, useMemo, useEffect } from "react";
// react components
import PostSection from "./PostSection";
import FilterSidebar from "./FilterSidebar";
import SelectAscending from "./SelectAscending";
// react icon
import { FaFilter } from "react-icons/fa6";
// types
import { type AugmentedPost } from "@/types";
// custom hooks
import {
  useFilterSelect,
  useFilteredAndSortedPosts,
  useNotFoundFilters,
} from "./utils";
// shadCN
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
// nano store
import { useStore } from "@nanostores/react";
import { linkStore } from "@/store/linkStore";

type Props = {
  allPosts: AugmentedPost[];
};

const FilterAndPostSection = ({ allPosts }: Props) => {
  const linkProps = useStore(linkStore);

  //
  const allTags = useMemo(
    () => [...new Set(allPosts.map((post) => post.data.tags).flat())],
    [allPosts]
  );
  // filter to number of posts map
  const categoryToNumOfPostsMap = useMemo(
    () =>
      allPosts.reduce<Record<string, number>>((acc, post) => {
        const category = post.data.category;
        if (Object.keys(acc).includes(category))
          return { ...acc, [category]: (acc[category] += 1) };
        return { ...acc, [category]: 1 };
      }, {}),
    [allPosts]
  );
  const subcategoryToNumOfPostsMap = useMemo(
    () =>
      allPosts.reduce<Record<string, number>>((acc, post) => {
        const subcategory = post.data.subcategory;
        if (Object.keys(acc).includes(subcategory))
          return { ...acc, [subcategory]: (acc[subcategory] += 1) };
        return { ...acc, [subcategory]: 1 };
      }, {}),
    [allPosts]
  );
  const tagToNumOfPostsMap = useMemo(
    () =>
      allPosts.reduce<Record<string, number>>((acc, post) => {
        const tags = post.data.tags;
        tags.forEach((tag) => {
          if (acc[tag]) {
            acc[tag] += 1;
          } else {
            acc[tag] = 1;
          }
        });
        return acc;
      }, {}),
    [allPosts]
  );
  // filters state
  const [categoryFilters, setCatergoryFilters, handleCategorySelect] =
    useFilterSelect([]);
  const [subcategoryFilters, setSubcategoryFilters, handleSubcategorySelect] =
    useFilterSelect([]);
  const [tagFilters, setTagFilters, handleTagSelect] = useFilterSelect([]);
  const [isDateAscending, setIsDateAscending] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  useEffect(() => {
    if (linkProps !== null) {
      switch (linkProps.filterType) {
        case "category":
          setCatergoryFilters([linkProps.filter]);
          break;
        case "subcategory":
          setSubcategoryFilters([linkProps.filter]);
          break;
        case "tag":
          setTagFilters([linkProps.filter]);
          break;
      }
    }
  }, [linkProps]);

  const filteredPosts = useFilteredAndSortedPosts(
    allPosts,
    categoryFilters,
    subcategoryFilters,
    tagFilters,
    isDateAscending,
    searchInput
  );

  const { notFoundCategories, notFoundSubcategories, notFoundTags } =
    useNotFoundFilters(
      categoryFilters,
      subcategoryFilters,
      tagFilters,
      allTags,
      allPosts,
      categoryToNumOfPostsMap,
      subcategoryToNumOfPostsMap
    );

  return (
    <div className="grid grid-cols-4 gap-5 py-[20px] max-lg:grid-cols-3">
      <div className="col-span-3">
        <div className="mb-3 flex items-center gap-2">
          <SelectAscending
            isDateAscending={isDateAscending}
            setIsDateAscending={setIsDateAscending}
          />
          <Input
            type="text"
            placeholder="搜尋標題"
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
          />
          <Sheet>
            <SheetTrigger className="lg:hidden">
              <Button variant="outline" className="gap-1 text-sm font-normal">
                <FaFilter />
                <span>篩選文章</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="pt-12">
              <FilterSidebar
                categoryFilters={categoryFilters}
                subcategoryFilters={subcategoryFilters}
                tagFilters={tagFilters}
                categoryToNumOfPostsMap={categoryToNumOfPostsMap}
                subcategoryToNumOfPostsMap={subcategoryToNumOfPostsMap}
                tagToNumOfPostsMap={tagToNumOfPostsMap}
                notFoundCategories={notFoundCategories}
                notFoundSubcategories={notFoundSubcategories}
                notFoundTags={notFoundTags}
                handleCategorySelect={handleCategorySelect}
                handleSubcategorySelect={handleSubcategorySelect}
                handleTagSelect={handleTagSelect}
              />
            </SheetContent>
          </Sheet>
        </div>
        <PostSection allPosts={allPosts} posts={filteredPosts} />
      </div>
      <div className="max-lg:hidden">
        <FilterSidebar
          categoryFilters={categoryFilters}
          subcategoryFilters={subcategoryFilters}
          tagFilters={tagFilters}
          categoryToNumOfPostsMap={categoryToNumOfPostsMap}
          subcategoryToNumOfPostsMap={subcategoryToNumOfPostsMap}
          tagToNumOfPostsMap={tagToNumOfPostsMap}
          notFoundCategories={notFoundCategories}
          notFoundSubcategories={notFoundSubcategories}
          notFoundTags={notFoundTags}
          handleCategorySelect={handleCategorySelect}
          handleSubcategorySelect={handleSubcategorySelect}
          handleTagSelect={handleTagSelect}
        />
      </div>
    </div>
  );
};

export default FilterAndPostSection;
