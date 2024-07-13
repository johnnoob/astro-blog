// react
import React, { useState } from "react";
// shadCN
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
// react icon
import { BsFillSendFill } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa6";
// astro actions
import { actions } from "astro:actions";

type Props = {
  userId: string | undefined;
  slug: string;
  title: string;
  parentId: number | null;
  initialContent: string;
};

const CommentForm = ({
  userId,
  slug,
  title,
  parentId,
  initialContent = "",
}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [content, setContent] = useState<string>(initialContent);

  const handlePost = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await actions.comments(formData);
    setIsLoading(false);
    setContent("");
  };

  if (userId) {
    return (
      <form className="grid gap-3" onSubmit={handlePost}>
        <div className="flex gap-3 h-[60px]">
          <input type="hidden" defaultValue={userId} name="userId" />
          <input type="hidden" defaultValue={slug} name="slug" />
          <input type="hidden" defaultValue={title} name="title" />
          {parentId && (
            <input type="hidden" defaultValue={parentId} name="parentId" />
          )}
          <Textarea
            className="resize-none h-full"
            autoFocus
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button className="h-full" type="submit" disabled={isLoading}>
            {isLoading ? (
              <FaSpinner className="animate-spin" size={20} />
            ) : (
              <BsFillSendFill size={20} />
            )}
          </Button>
        </div>
      </form>
    );
  } else {
    return <h3>請先登入再留言</h3>;
  }
};

export default CommentForm;
