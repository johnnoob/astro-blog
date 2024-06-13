// react
import { useEffect, useMemo } from "react";
// react components
import PostSection from "./PostSection";
import FilterSidebar from "./FilterSidebar";
import SelectAscending from "./SelectAscending";
import { DatePickerWithRange } from "./DateRangePicker";
// react icon
import { FaFilter, FaArrowRotateRight } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
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
    dateRange,
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
    searchInput,
    dateRange
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

  // const postDates = allPosts
  //   .map((post) => post.data.date)
  //   .sort((a, b) => a.getTime() - b.getTime());
  // const firstPostDate = postDates[0];
  // const lastPostDate = postDates[postDates.length - 1];
  // useEffect(() => {
  //   filterStore.setKey("dateRange", { from: firstPostDate, to: lastPostDate });
  // }, []);

  const handleResetFilters = () => {
    filterStore.set({
      categoryFilters: [],
      subcategoryFilters: [],
      tagFilters: [],
      isDateAscending,
      searchInput: "",
      dateRange: { from: undefined, to: undefined },
    });
  };

  return (
    <div className="grid grid-cols-4 gap-5 py-[20px] max-lg:grid-cols-3">
      <div className="flex gap-4 items-center col-span-4 h-[35px]">
        <DatePickerWithRange date={dateRange} />
        <h2 className="text-xl font-semibold tracking-wide">
          共有{filteredPosts.length}篇文章
        </h2>
        {(categoryFilters.length !== 0 ||
          subcategoryFilters.length !== 0 ||
          tagFilters.length !== 0 ||
          searchInput !== "") && (
          <Button variant="ghost" onClick={handleResetFilters}>
            <FaArrowRotateRight />
            <span className="ml-1">清除篩選</span>
          </Button>
        )}
      </div>
      <div className="col-span-4">
        <div className="mb-3 flex items-center gap-2">
          <SelectAscending
            isDateAscending={isDateAscending}
            setIsDateAscending={() =>
              filterStore.setKey("isDateAscending", !isDateAscending)
            }
          />
          <div className="relative w-full">
            <Input
              className="pl-8"
              type="text"
              placeholder="搜尋標題"
              value={searchInput}
              onChange={(e) => {
                filterStore.setKey("searchInput", e.target.value);
              }}
            />
            <IoSearchOutline
              className="absolute top-1/2 left-[9px] -translate-y-1/2 text-muted-foreground"
              size={17}
            />
          </div>
          <Sheet>
            <SheetTrigger asChild>
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
    </div>
  );
};

export default FilterAndPostSection;
