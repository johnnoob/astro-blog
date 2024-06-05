// react
import { useState, useMemo, useEffect } from "react";
// react components
import PostSection from "./PostSection";
import FilterSidebar from "./FilterSidebar";
// types
import { type AugmentedPost } from "@/types";
// custom hooks
import {
  useFilterSelect,
  useFilteredAndSortedPosts,
  useNotFoundFilters,
} from "./utils";
// shadCN
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

type Props = {
  allPosts: AugmentedPost[];
};

const FilterAndPostSection = ({ allPosts }: Props) => {
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
    <div className="grid grid-cols-4 gap-5 py-[50px] max-lg:grid-cols-3">
      <div className="col-span-3">
        <div className="mb-3 flex items-center gap-2">
          <Select
            defaultValue={isDateAscending ? "ascending" : "descending"}
            onValueChange={(value) => setIsDateAscending(value === "ascending")}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Themes" />
            </SelectTrigger>
            <SelectContent onPointerDownOutside={(e) => e.preventDefault()}>
              <SelectItem value="ascending">由舊到新</SelectItem>
              <SelectItem value="descending">由新到舊</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="text"
            placeholder="搜尋標題"
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
          />
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
