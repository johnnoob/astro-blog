import { type ClassifiedPosts } from "@/types/home";
import { useState } from "react";
import CardSm from "./CardSm";
import NextPrevBtn from "./NextPrevBtn";
import { Separator } from "../ui/separator";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
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
  const posts = classifiedPosts[category].sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );
  const [page, setPage] = useState<number>(1);
  const postsPerPage = 3;
  const pages = Math.ceil(posts.length / postsPerPage);
  const groupedPosts = [];
  for (let i = 0; i < posts.length; i += postsPerPage) {
    groupedPosts.push(posts.slice(i, i + postsPerPage));
  }
  const currentPosts = groupedPosts[page - 1];
  console.log(currentPosts);

  return (
    <Card className="flex flex-col gap-4 overflow-hidden">
      <CardHeader className="max-sm:py-4">
        <CardTitle>
          {" "}
          <a href={`/categories/${category}`} className="w-fit">
            <h2 className="text-2xl font-bold">{category}</h2>
          </a>
        </CardTitle>
      </CardHeader>

      <CardContent className="relative flex flex-col gap-4 group max-sm:gap-2">
        {/* <NextPrevBtn position="left" />
        <NextPrevBtn position="right" /> */}
        {currentPosts.map((post, index) => (
          <CardSm
            key={index}
            url={`/blog/${post.slug}`}
            category={post.data.category}
            subcategory={post.data.subcategory}
            title={post.data.title}
            imageSrc={post.data.heroImage.src.src}
            imageAlt={post.data.heroImage.alt}
            date={post.data.date}
            author={post.data.author}
            minutes={postIdToMinutesMap[post.id]}
            body={post.body}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default CategorySection;
