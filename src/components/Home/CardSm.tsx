import { LuCalendarDays } from "react-icons/lu";
import { FaRegClock } from "react-icons/fa6";
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

type CardSmProps = {
  url: string;
  subcategory: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  date: Date;
  author: string;
  minutes: number;
};

const CardSm = ({
  url,
  subcategory,
  title,
  imageSrc,
  imageAlt,
  date,
  author,
  minutes,
}: CardSmProps) => {
  const minutesCeil = Math.ceil(minutes);
  return (
    <Card className="border-none shadow-none">
      <CardHeader className="p-0 mb-2">
        <a href={url}>
          <img
            src={imageSrc}
            alt={imageAlt}
            className="object-cover aspect-[16/10] rounded-md"
          />
        </a>
      </CardHeader>
      <CardContent className="px-0 flex flex-col gap-2 items-start">
        <a
          href={`/subcategories/${subcategory}`}
          className="rounded bg-muted-foreground text-muted text-xs px-2 py-1 hover:underline"
        >
          {subcategory}
        </a>
        <div className="flex gap-1 text-sm">
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
          <div className="flex gap-1 items-center text-xs text-muted-foreground">
            <FaRegClock size={15} />
            <span>{minutesCeil} mins</span>
          </div>
        </div>
        <a href={url} className="hover:underline">
          <CardTitle className="text-base line-clamp-2">{title}</CardTitle>
        </a>
      </CardContent>
    </Card>
  );
};

export default CardSm;
