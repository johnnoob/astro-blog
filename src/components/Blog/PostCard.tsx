// types
import { type PostCardProps } from "@/types";
// shadCN components
import { Card, CardTitle, CardHeader, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
// react icons
import { LuCalendarDays } from "react-icons/lu";
import { FaRegClock } from "react-icons/fa6";
// react components
import Link from "../Link";

const PostCard = ({
  title,
  category,
  subcategory,
  tags,
  date,
  author,
  image,
  slug,
  body,
  minutes,
}: PostCardProps) => {
  const url = `/blog/${slug}`;
  const excerpt = body.replace(/[\r\n]/g, "");
  const minutesCeil = Math.ceil(minutes);
  return (
    <Card className="shadow-none border-none max-sm:flex max-sm:gap-2 max-sm:items-center">
      <CardHeader className="px-0 pt-0 pb-3 max-sm:pb-0">
        <a href={url}>
          <div className="rounded-md overflow-hidden aspect-[16/10] max-sm:h-[90px]">
            <img
              src={image.src.src}
              alt={image.alt}
              className="object-cover w-full h-full"
            />
          </div>
        </a>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 p-0 max-sm:gap-1">
        <div className="text-muted-foreground text-sm">
          <Link
            filterType="categoryFilters"
            filter={category}
            className="hover:underline hover:text-primary"
          >
            {category}
          </Link>
          <span>·</span>
          <Link
            filterType="subcategoryFilters"
            filter={subcategory}
            className="hover:underline hover:text-primary"
          >
            {subcategory}
          </Link>
        </div>
        <a href={url} className="hover:underline">
          <CardTitle className="text-lg line-clamp-2 max-sm:text-base">
            {title}
          </CardTitle>
        </a>
        <div className="line-clamp-3 text-sm max-sm:hidden">{excerpt}</div>
        <div className="flex items-center gap-2 text-sm max-sm:gap-1">
          <div className="flex gap-1 items-center text-muted-foreground">
            <LuCalendarDays size={15} />
            <span>
              {date.toLocaleDateString("zh-TW", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </span>
          </div>
          <Separator orientation="vertical" />
          <div className="flex gap-1 items-center text-muted-foreground">
            <FaRegClock size={14} />
            <span>{minutesCeil} 分鐘</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
