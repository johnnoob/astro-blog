import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { FaCaretRight, FaCaretDown } from "react-icons/fa6";
import { AiOutlineEllipsis } from "react-icons/ai";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";

type SidebarProps = {
  filter: "category" | "subcategory" | "tag" | undefined;
  categoryCountMap: Map<string, number>;
  subcategoryCountMap: Map<string, number>;
  tagCountMap: Map<string, number>;
};

const Sidebar = ({
  filter,
  categoryCountMap,
  subcategoryCountMap,
  tagCountMap,
}: SidebarProps) => {
  const filterLabelMap = new Map([
    ["category", "類別"],
    ["subcategory", "子類別"],
    ["tag", "標籤"],
  ]);
  const postsCount = Array.from(categoryCountMap.values()).reduce(
    (acc, value) => (acc += value),
    0
  );
  const tagsCount = Array.from(tagCountMap.keys()).length;
  const [isShowTags, setIsShowTags] = useState<boolean>(false);
  const tagsLengthLimit = 5;

  return (
    <Card>
      <CardHeader className="py-3">
        <CardTitle className="text-xl">
          {filter !== undefined
            ? `有${postsCount}篇貼文在此${filterLabelMap.get(filter)}中...`
            : `全部有${postsCount}篇貼文...`}
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="grid gap-2 pt-2 pb-4">
        {filter !== "category" && (
          <div className="grid gap-2">
            <div className="text-lg font-semibold">類別</div>
            {Array.from(categoryCountMap.keys()).map((key) => (
              <a
                key={key}
                className="flex items-center space-x-1"
                href={`/categories/${key}`}
              >
                <span>{key}</span>
                <Badge className="block">{categoryCountMap.get(key)}</Badge>
              </a>
            ))}
            <Separator />
          </div>
        )}
        {filter !== "subcategory" && (
          <div className="grid gap-2">
            <div className="text-lg font-semibold">子類別</div>
            {Array.from(subcategoryCountMap.keys()).map((key) => (
              <a
                key={key}
                className="flex items-center space-x-1"
                href={`/subcategories/${key}`}
              >
                <span>{key}</span>
                <Badge className="block">{subcategoryCountMap.get(key)}</Badge>
              </a>
            ))}
            <Separator />
          </div>
        )}
        {filter !== "tag" && (
          <div className="grid gap-2">
            <div className="flex gap-1 items-center">
              <div className="text-lg font-semibold">標籤</div>

              {tagsCount >= tagsLengthLimit && (
                <button onClick={() => setIsShowTags(!isShowTags)}>
                  {isShowTags ? <FaCaretDown /> : <FaCaretRight />}
                </button>
              )}
            </div>
            {Array.from(tagCountMap.keys()).map((key, index) => (
              <a
                key={key}
                className="flex items-center space-x-1"
                href={`/tags/${key}`}
                style={{
                  display: isShowTags || index < tagsLengthLimit ? "" : "none",
                }}
              >
                <span>{key}</span>
                <Badge className="block">{tagCountMap.get(key)}</Badge>
              </a>
            ))}
            {!isShowTags && tagsCount >= tagsLengthLimit && (
              <AiOutlineEllipsis />
            )}
            <Separator />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Sidebar;
