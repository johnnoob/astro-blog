// types
import { type AugmentedPost } from "@/types";
type FilterType = "categories" | "subcategories" | "tags";
type FiltersMap = {
  categories: string[];
  subcategories: string[];
  tags: string[];
};
// react
import React, { useState, useEffect, useCallback } from "react";

const isArraySubset = (subset: string[], superset: string[]) => {
  return subset.some((element) => superset.includes(element));
};

export const useFilterSelect = (
  initialFilters: string[]
): [
  string[],
  React.Dispatch<React.SetStateAction<string[]>>,
  (e: React.MouseEvent<HTMLButtonElement>) => void
] => {
  const [filters, setFilters] = useState<string[]>(initialFilters);
  const handleFilterSelect = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const target = e.currentTarget;
    const targetFilter = target.value;
    if (filters.includes(targetFilter)) {
      setFilters((prevFilters) =>
        prevFilters.filter((filter) => filter !== targetFilter)
      );
    } else {
      setFilters((prevFilters) => [...prevFilters, targetFilter]);
    }
  };
  return [filters, setFilters, handleFilterSelect];
};

export const useNotFoundFilters = (
  categoryFilters: string[],
  subcategoryFilters: string[],
  tagFilters: string[],
  allTags: string[],
  allPosts: AugmentedPost[],
  categoryToNumOfPostsMap: {
    [category: string]: number;
  },
  subcategoryToNumOfPostsMap: {
    [subcategory: string]: number;
  }
) => {
  const generateFiltersMap = (filteredPosts: AugmentedPost[]): FiltersMap => {
    const filtersMap = filteredPosts.reduce(
      (acc, post) => {
        acc.categories.add(post.data.category);
        acc.subcategories.add(post.data.subcategory);
        acc.tags.push(...post.data.tags);
        return acc;
      },
      {
        categories: new Set<string>(),
        subcategories: new Set<string>(),
        tags: new Array<string>(),
      }
    );
    return {
      categories: [...filtersMap.categories],
      subcategories: [...filtersMap.subcategories],
      tags: [...new Set(filtersMap.tags)],
    };
  };

  const notFoundGenerator = useCallback(
    (filterType: FilterType) => {
      let filteredPosts: AugmentedPost[];
      if (filterType === "tags") {
        filteredPosts = allPosts.filter((post) => {
          if (categoryFilters.length === 0) return true;
          return categoryFilters.includes(post.data.category);
        });
        filteredPosts = filteredPosts.filter((post) => {
          if (subcategoryFilters.length === 0) return true;
          return subcategoryFilters.includes(post.data.subcategory);
        });
        const filtersMap = generateFiltersMap(filteredPosts);
        return allTags.filter((tag) => !filtersMap.tags.includes(tag));
      } else if (filterType === "categories") {
        filteredPosts = allPosts.filter((post) => {
          if (subcategoryFilters.length === 0) return true;
          return subcategoryFilters.includes(post.data.subcategory);
        });
        filteredPosts = filteredPosts.filter((post) => {
          if (tagFilters.length === 0) return true;
          return isArraySubset(tagFilters, post.data.tags);
        });
        const filtersMap = generateFiltersMap(filteredPosts);
        return Object.keys(categoryToNumOfPostsMap).filter(
          (category) => !filtersMap.categories.includes(category)
        );
      } else {
        filteredPosts = allPosts.filter((post) => {
          if (categoryFilters.length === 0) return true;
          return categoryFilters.includes(post.data.category);
        });
        filteredPosts = filteredPosts.filter((post) => {
          if (tagFilters.length === 0) return true;
          return isArraySubset(tagFilters, post.data.tags);
        });
        const filtersMap = generateFiltersMap(filteredPosts);
        return Object.keys(subcategoryToNumOfPostsMap).filter(
          (subcategory) => !filtersMap.subcategories.includes(subcategory)
        );
      }
    },
    [
      allPosts,
      allTags,
      categoryFilters,
      subcategoryFilters,
      tagFilters,
      categoryToNumOfPostsMap,
      subcategoryToNumOfPostsMap,
    ]
  );

  const [notFoundCategories, setNotFoundCategories] = useState<string[]>([]);
  const [notFoundSubcategories, setNotFoundSubcategories] = useState<string[]>(
    []
  );
  const [notFoundTags, setNotFoundTags] = useState<string[]>([]);

  useEffect(() => {
    setNotFoundCategories(notFoundGenerator("categories"));
    setNotFoundSubcategories(notFoundGenerator("subcategories"));
    setNotFoundTags(notFoundGenerator("tags"));
  }, [
    categoryFilters,
    subcategoryFilters,
    tagFilters,
    allPosts,
    allTags,
    categoryToNumOfPostsMap,
    subcategoryToNumOfPostsMap,
    notFoundGenerator,
  ]);
  return { notFoundCategories, notFoundSubcategories, notFoundTags };
};

export const useFilteredAndSortedPosts = (
  allPosts: AugmentedPost[],
  categoryFilters: string[],
  subcategoryFilters: string[],
  tagFilters: string[],
  isDateAscending: boolean,
  searchInput: string
): AugmentedPost[] => {
  const [posts, setPosts] = useState<AugmentedPost[]>([]);

  useEffect(() => {
    let filteredPosts = allPosts.filter((post) => {
      if (categoryFilters.length === 0) return true;
      return categoryFilters.includes(post.data.category);
    });

    filteredPosts = filteredPosts.filter((post) => {
      if (subcategoryFilters.length === 0) return true;
      return subcategoryFilters.includes(post.data.subcategory);
    });

    filteredPosts = filteredPosts.filter((post) => {
      if (tagFilters.length === 0) return true;
      return isArraySubset(tagFilters, post.data.tags);
    });

    const sortedPosts = [...filteredPosts].sort((a, b) => {
      if (isDateAscending) {
        return a.data.date.getTime() - b.data.date.getTime();
      } else {
        return b.data.date.getTime() - a.data.date.getTime();
      }
    });
    const searchedPosts = sortedPosts.filter((post) =>
      post.data.title.toLowerCase().includes(searchInput.toLowerCase())
    );
    setPosts(searchedPosts);
  }, [
    allPosts,
    categoryFilters,
    subcategoryFilters,
    tagFilters,
    isDateAscending,
    searchInput,
  ]);
  return posts;
};
