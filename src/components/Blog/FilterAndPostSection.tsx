// react
import { useMemo } from "react";
// react components
import PostSection from "./PostSection";
import FilterSidebar from "./FilterSidebar";
import SelectAscending from "./SelectAscending";
// react icon
import { FaFilter } from "react-icons/fa6";
// types
import { type AugmentedPost } from "@/types";
// custom hooks
import { useFilteredAndSortedPosts, useNotFoundFilters } from "./utils";
// shadCN
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// nano store
import { useStore } from "@nanostores/react";
import { filterStore } from "@/store/filterStore";

type Props = {
  allPosts: AugmentedPost[];
};

const FilterAndPostSection = ({ allPosts }: Props) => {
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
  const {
    categoryFilters,
    subcategoryFilters,
    tagFilters,
    isDateAscending,
    searchInput,
  } = useStore(filterStore);

  // handle select filter
  const handleCategorySelect = (
    e: React.MouseEvent<HTMLButtonElement>
  ): void => {
    const targetFilter = e.currentTarget.value;
    if (categoryFilters.includes(targetFilter)) {
      filterStore.setKey(
        "categoryFilters",
        categoryFilters.filter((filter) => filter !== targetFilter)
      );
    } else {
      filterStore.setKey("categoryFilters", [...categoryFilters, targetFilter]);
    }
  };
  const handleSubcategorySelect = (
    e: React.MouseEvent<HTMLButtonElement>
  ): void => {
    const targetFilter = e.currentTarget.value;
    if (subcategoryFilters.includes(targetFilter)) {
      filterStore.setKey(
        "subcategoryFilters",
        subcategoryFilters.filter((filter) => filter !== targetFilter)
      );
    } else {
      filterStore.setKey("subcategoryFilters", [
        ...subcategoryFilters,
        targetFilter,
      ]);
    }
  };
  const handleTagSelect = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const targetFilter = e.currentTarget.value;
    if (tagFilters.includes(targetFilter)) {
      filterStore.setKey(
        "tagFilters",
        tagFilters.filter((filter) => filter !== targetFilter)
      );
    } else {
      filterStore.setKey("tagFilters", [...tagFilters, targetFilter]);
    }
  };

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
      allPosts,
      categoryFilters,
      subcategoryFilters,
      tagFilters,
      categoryToNumOfPostsMap,
      subcategoryToNumOfPostsMap,
      tagToNumOfPostsMap
    );

  return (
    <div className="grid grid-cols-4 gap-5 py-[20px] max-lg:grid-cols-3">
      <div className="col-span-3">
        <div className="mb-3 flex items-center gap-2">
          <SelectAscending
            isDateAscending={isDateAscending}
            setIsDateAscending={() =>
              filterStore.setKey("isDateAscending", !isDateAscending)
            }
          />
          <Input
            type="text"
            placeholder="搜尋標題"
            onChange={(e) => {
              filterStore.setKey("searchInput", e.target.value);
            }}
          />
          <Sheet>
            <SheetTrigger className="lg:hidden" asChild>
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
