// react
import { useState } from "react";
// react icons
import { FaCaretRight, FaCaretDown, FaTag } from "react-icons/fa6";
import { AiOutlineEllipsis } from "react-icons/ai";
// react components
import Link from "../Link";

type TagsProps = {
  tags: string[];
};

const Tags = ({ tags }: TagsProps) => {
  const [isShowTags, setIsShowTags] = useState<boolean>(false);
  const tagsLengthLimit = 3;
  return (
    <div className="flex items-start gap-2 text-sm max-sm:flex-col max-sm:items-start">
      {tags.length > tagsLengthLimit && (
        <button
          className="flex items-center space-x-1 rounded-md px-2 py-1 bg-muted-foreground text-muted min-w-fit"
          onClick={() => setIsShowTags(!isShowTags)}
        >
          <div className="flex items-center gap-1">
            <FaTag size={21} />
            <span>{tags.length}</span>
          </div>
          {isShowTags ? <FaCaretDown /> : <FaCaretRight />}
        </button>
      )}
      <div className="flex items-center flex-wrap gap-2">
        {tags.map((tag, index) => (
          <Link
            key={index}
            filterType="tagFilters"
            filter={tag}
            className={`bg-muted text-muted-foreground border-[1px] text-sm rounded-md px-2 py-1 hover:border-primary hover:text-primary ${
              isShowTags || index < tagsLengthLimit ? "" : "hidden"
            }`}
          >
            # {tag}
          </Link>
        ))}
        <span>
          {tags.length > tagsLengthLimit && !isShowTags && (
            <AiOutlineEllipsis />
          )}
        </span>
      </div>
    </div>
  );
};

export default Tags;
