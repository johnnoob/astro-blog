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
// nano store
import { filterStore } from "@/store/filterStore";
import { useStore } from "@nanostores/react";

const isArraySubset = (subset: string[], superset: string[]) => {
  return subset.some((element) => superset.includes(element));
};

export const useNotFoundFilters = (
  allPosts: AugmentedPost[],
  categoryFilters: string[],
  subcategoryFilters: string[],
  tagFilters: string[],
  categoryToNumOfPostsMap: {
    [category: string]: number;
  },
  subcategoryToNumOfPostsMap: {
    [subcategory: string]: number;
  },
  tagToNumOfPostsMap: {
    [tag: string]: number;
  }
) => {
  const allTags = Object.keys(tagToNumOfPostsMap);
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

  const searchNotFound = useCallback(
    (filterType: FilterType) => {
      let filteredPosts: AugmentedPost[];
      switch (filterType) {
        case "tags":
          filteredPosts = allPosts.filter((post) => {
            if (categoryFilters.length === 0) return true;
            return categoryFilters.includes(post.data.category);
          });
          filteredPosts = filteredPosts.filter((post) => {
            if (subcategoryFilters.length === 0) return true;
            return subcategoryFilters.includes(post.data.subcategory);
          });
          const tagsFiltersMap = generateFiltersMap(filteredPosts);
          return allTags.filter((tag) => !tagsFiltersMap.tags.includes(tag));

        case "categories":
          filteredPosts = allPosts.filter((post) => {
            if (subcategoryFilters.length === 0) return true;
            return subcategoryFilters.includes(post.data.subcategory);
          });
          filteredPosts = filteredPosts.filter((post) => {
            if (tagFilters.length === 0) return true;
            return isArraySubset(tagFilters, post.data.tags);
          });
          const categoriesFiltersMap = generateFiltersMap(filteredPosts);
          return Object.keys(categoryToNumOfPostsMap).filter(
            (category) => !categoriesFiltersMap.categories.includes(category)
          );

        default:
          filteredPosts = allPosts.filter((post) => {
            if (categoryFilters.length === 0) return true;
            return categoryFilters.includes(post.data.category);
          });
          filteredPosts = filteredPosts.filter((post) => {
            if (tagFilters.length === 0) return true;
            return isArraySubset(tagFilters, post.data.tags);
          });
          const subcategoriesFiltersMap = generateFiltersMap(filteredPosts);
          return Object.keys(subcategoryToNumOfPostsMap).filter(
            (subcategory) =>
              !subcategoriesFiltersMap.subcategories.includes(subcategory)
          );
      }
    },
    [
      allPosts,
      categoryFilters,
      subcategoryFilters,
      tagFilters,
      categoryToNumOfPostsMap,
      subcategoryToNumOfPostsMap,
      tagToNumOfPostsMap,
    ]
  );

  const [notFoundCategories, setNotFoundCategories] = useState<string[]>([]);
  const [notFoundSubcategories, setNotFoundSubcategories] = useState<string[]>(
    []
  );
  const [notFoundTags, setNotFoundTags] = useState<string[]>([]);

  useEffect(() => {
    setNotFoundCategories(searchNotFound("categories"));
    setNotFoundSubcategories(searchNotFound("subcategories"));
    setNotFoundTags(searchNotFound("tags"));
  }, [
    allPosts,
    categoryFilters,
    subcategoryFilters,
    tagFilters,
    categoryToNumOfPostsMap,
    subcategoryToNumOfPostsMap,
    tagToNumOfPostsMap,
    searchNotFound,
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
