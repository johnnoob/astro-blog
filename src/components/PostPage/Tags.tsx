import { useState } from "react";
import { FaCaretRight, FaCaretDown, FaTag } from "react-icons/fa6";

type TagsProps = {
  tags: string[];
};

const Tags = ({ tags }: TagsProps) => {
  const [isShowTags, setIsShowTags] = useState<boolean>(false);
  const tagsLengthLimit = 3;
  return (
    <div className="flex items-center flex-wrap gap-2">
      {tags.length > tagsLengthLimit && (
        <button
          className="flex items-center space-x-1 text-sm rounded-2xl px-2 py-1 bg-muted"
          onClick={() => setIsShowTags(!isShowTags)}
        >
          <span>+{tags.length - tagsLengthLimit} More...</span>
          {isShowTags ? <FaCaretDown /> : <FaCaretRight />}
        </button>
      )}
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
  );
};

export default Tags;
