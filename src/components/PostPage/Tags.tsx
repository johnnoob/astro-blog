import { useState } from "react";
import { FaCaretRight, FaCaretDown, FaTag } from "react-icons/fa6";

type TagsProps = {
  tags: string[];
};

const Tags = ({ tags }: TagsProps) => {
  const [isShowTags, setIsShowTags] = useState<boolean>(false);
  const tagsLengthLimit = 3;
  return (
    <div className="flex items-start gap-2 max-sm:flex-col max-sm:items-start">
      {tags.length > tagsLengthLimit && (
        <button
          className="flex items-center space-x-1 text-sm rounded-2xl px-2 py-1 bg-muted min-w-fit"
          onClick={() => setIsShowTags(!isShowTags)}
        >
          <div className="flex items-center gap-1">
            <FaTag size={22} />
            <span>{tags.length}</span>
          </div>
          {isShowTags ? <FaCaretDown /> : <FaCaretRight />}
        </button>
      )}
      <div className="flex items-center flex-wrap gap-1">
        {tags.map((tag, index) => (
          <a
            key={index}
            href={`/tags/${tag}`}
            className="bg-muted-foreground text-muted text-sm rounded-2xl px-2 py-1 hover:bg-primary hover:text-muted"
            style={{
              display: isShowTags || index < tagsLengthLimit ? "block" : "none",
            }}
          >
            {tag}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Tags;