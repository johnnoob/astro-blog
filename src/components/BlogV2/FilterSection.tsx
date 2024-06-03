// react
import { useState, useMemo, useEffect } from "react";
// types
import { type AugmentedPost } from "@/types";
// shadCN components
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../ui/card";
import { Separator } from "../ui/separator";
// custom hooks
import {
  useFilterSelect,
  useFilteredAndSortedPosts,
  useNotFoundFilters,
} from "./utils";
// nano store
import { useStore } from "@nanostores/react";
import { postsStore } from "@/store/postsStore";

type Props = {
  allPosts: AugmentedPost[];
};

const FilterSection = ({ allPosts }: Props) => {
  const allTags = useMemo(() => {
    return [...new Set(allPosts.map((post) => post.data.tags).flat())];
  }, [allPosts]);
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

  const [categoryFilters, setCatergoryFilters, handleCategorySelect] =
    useFilterSelect([]);
  const [subcategoryFilters, setSubcategoryFilters, handleSubcategorySelect] =
    useFilterSelect([]);
  const [tagFilters, setTagFilters, handleTagSelect] = useFilterSelect([]);
  const [isDateAscending, setIsDateAscending] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");

  const posts = useFilteredAndSortedPosts(
    allPosts,
    categoryFilters,
    subcategoryFilters,
    tagFilters,
    isDateAscending,
    searchInput
  );
  // useEffect(() => {
  //   postsStore.set(posts);
  // }, [posts]);
  const { notFoundCategories, notFoundSubcategories, notFoundTags } =
    useNotFoundFilters(
      posts,
      categoryFilters,
      subcategoryFilters,
      tagFilters,
      allTags,
      allPosts,
      categoryToNumOfPostsMap,
      subcategoryToNumOfPostsMap
    );

  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>篩選</CardTitle>
        </CardHeader>
        <CardContent>
          <div></div>
        </CardContent>
      </Card>
    </section>
  );
};

export default FilterSection;
