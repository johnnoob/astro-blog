// types
import { type AugmentedPost, type PostCardProps } from "@/types.ts";
// react component
import PostCard from "./PostCard.tsx";
// react
import { useState, useEffect } from "react";
// custom hooks
import {
  useFilterSelect,
  useFilteredAndSortedPosts,
  useNotFoundFilters,
} from "./utils";
// nano store
import { postsStore } from "@/store/postsStore.ts";
import { useStore } from "@nanostores/react";

type Props = {
  allPosts: AugmentedPost[];
};

const PostSection = ({ allPosts }: Props) => {
  // const posts = useStore(postsStore);
  return (
    <section className="grid gap-3 grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
      {allPosts.map((post) => (
        <PostCard
          key={post.id}
          title={post.data.title}
          category={post.data.category}
          subcategory={post.data.subcategory}
          tags={post.data.tags}
          date={post.data.date}
          author={post.data.author}
          image={post.data.heroImage}
          slug={post.slug}
          body={post.body}
          minutes={post.minutes}
        />
      ))}
    </section>
  );
};

export default PostSection;
