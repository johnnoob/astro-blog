// types
import { type AugmentedPost } from "@/types.ts";
// react component
import PostCard from "./PostCard.tsx";

type Props = {
  allPosts: AugmentedPost[];
  posts: AugmentedPost[];
};

const PostSection = ({ allPosts, posts }: Props) => {
  return (
    <section className="py-3 grid gap-5 grid-cols-3 max-sm:grid-cols-1">
      {posts.map((post) => (
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
