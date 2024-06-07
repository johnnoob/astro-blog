// types
import { type ClassifiedPosts } from "@/types/home";
// react
import { useState } from "react";
// react components
import CardSm from "./CardSm";
import Link from "../Link";
// react icons
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
// shadCN
import { Separator } from "../ui/separator";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
} from "../ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "../ui/pagination";
import { Button } from "../ui/button";

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
  const handleNextPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPage((prev) => {
      return Math.min(prev + 1, pages);
    });
  };
  const handlePrevPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between max-sm:py-4">
        <div>
          <CardTitle>
            <Link
              filterType="categoryFilters"
              filter={category}
              className="w-fit"
            >
              <h2 className="text-2xl font-bold">{category}</h2>
            </Link>
          </CardTitle>
          <CardDescription>共有{posts.length}篇貼文</CardDescription>
        </div>
        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-9 w-9"
                  onClick={handlePrevPage}
                >
                  <FaAngleLeft />
                </Button>
              </PaginationItem>
              <div className="text-sm">
                {page} / {pages}
              </div>
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-9 w-9"
                  onClick={handleNextPage}
                >
                  <FaAngleRight />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardHeader>
      <CardContent className="relative flex flex-col gap-4 group max-sm:gap-2">
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
