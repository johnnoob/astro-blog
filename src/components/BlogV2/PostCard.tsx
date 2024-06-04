// types
import { type PostCardProps } from "@/types";
// shadCN components
import { Card, CardTitle, CardHeader, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
// react icons
import { LuCalendarDays } from "react-icons/lu";
import { FaRegClock } from "react-icons/fa6";

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
    <Card className="shadow-none border-none">
      <CardHeader className="px-0 pt-0 pb-3">
        <a href={url} className="rounded-md overflow-hidden">
          <img
            src={image.src.src}
            alt={image.alt}
            className="aspect-[16/10] object-cover w-full h-full"
          />
        </a>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 p-0">
        <div className="text-muted-foreground text-sm">
          <a
            href={`/categories/${category}`}
            className="hover:underline hover:text-primary"
          >
            {category}
          </a>
          <span>·</span>
          <a
            href={`/subcategories/${subcategory}`}
            className="hover:underline hover:text-primary"
          >
            {subcategory}
          </a>
        </div>
        <a href={url} className="hover:underline">
          <CardTitle className="text-lg line-clamp-2 max-sm:text-base">
            {title}
          </CardTitle>
        </a>
        <div className="line-clamp-3 text-sm">{excerpt}</div>
        <div className="flex items-center gap-2 text-sm">
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
          <Separator orientation="vertical" className="max-sm:hidden" />
          <div className="flex gap-1 items-center text-muted-foreground max-sm:hidden">
            <FaRegClock size={14} />
            <span>{minutesCeil} 分鐘</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
