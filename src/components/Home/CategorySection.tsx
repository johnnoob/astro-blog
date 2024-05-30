import { type ClassifiedPosts } from "@/types/home";
import { useState } from "react";
import CardSm from "./CardSm";
import NextPrevBtn from "./NextPrevBtn";
import { Separator } from "../ui/separator";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
type PostIdToMinutesMap = {
  [postId: string]: number;
};

type CategorySectionProps = {
  category: string;
  classifiedPosts: ClassifiedPosts;
  postIdToMinutesMap: PostIdToMinutesMap;
};

const CategorySection = ({
  category,
  classifiedPosts,
  postIdToMinutesMap,
}: CategorySectionProps) => {
  const posts = classifiedPosts[category];
  const [page, setPage] = useState<number>(1);
  const postsPerPage = 3;
  const pages = Math.ceil(posts.length / postsPerPage);
  const groupedPosts = [];
  for (let i = 0; i < posts.length; i += postsPerPage) {
    groupedPosts.push(posts.slice(i, i + postsPerPage));
  }
  return (
    <section className="flex flex-col gap-4 overflow-hidden">
      <a href={`/categories/${category}`}>
        <h2 className="text-xl font-semibold hover:underline">{category}</h2>
      </a>
      <Separator />
      <div className="relative grid grid-cols-3 gap-3 group">
        <NextPrevBtn position="left" />
        <NextPrevBtn position="right" />
        {classifiedPosts[category].map((post, index) => (
          <CardSm
            key={index}
            url={`/blog/${post.slug}`}
            subcategory={post.data.subcategory}
            title={post.data.title}
            imageSrc={post.data.heroImage.src.src}
            imageAlt={post.data.heroImage.alt}
            date={post.data.date}
            author={post.data.author}
            minutes={postIdToMinutesMap[post.id]}
          />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
