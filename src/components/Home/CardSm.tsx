// react icons
import { LuCalendarDays } from "react-icons/lu";
import { FaRegClock } from "react-icons/fa6";
// shadCN
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
// react components
import Link from "../Link";

type CardSmProps = {
  url: string;
  category: string;
  subcategory: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  date: Date;
  author: string;
  minutes: number;
  body: string;
};

const CardSm = ({
  url,
  category,
  subcategory,
  title,
  imageSrc,
  imageAlt,
  date,
  author,
  minutes,
  body,
}: CardSmProps) => {
  const minutesCeil = Math.ceil(minutes);
  const excerpt = body.replace(/[#\*]/g, "");
  return (
    <Card className="border-none shadow-none flex items-center gap-4">
      <CardHeader className="p-0 mb-2 flex-shrink-0">
        <a href={url}>
          <div className="h-[170px] aspect-[16/10] max-sm:h-[70px]">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="object-cover w-full h-full rounded-md"
            />
          </div>
        </a>
      </CardHeader>
      <CardContent className="px-0 py-0 flex flex-col gap-2 items-start max-sm:gap-1">
        <div className="text-muted-foreground text-sm">
          <Link
            filterType="subcategoryFilters"
            filter={subcategory}
            className="hover:underline hover:text-primary"
          >
            {subcategory}
            <span className="sm:hidden">
              ·
              {date.toLocaleDateString("zh-TW", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </span>
          </Link>
        </div>
        <a href={url} className="hover:underline">
          <CardTitle className="text-lg line-clamp-2 max-sm:text-base">
            {title}
          </CardTitle>
        </a>
        <p className="text-sm line-clamp-2 max-sm:hidden">{excerpt}</p>
        <div className="flex gap-2 text-sm max-sm:hidden">
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

export default CardSm;
