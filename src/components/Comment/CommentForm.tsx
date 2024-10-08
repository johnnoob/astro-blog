// react
import React, { useState } from "react";
// shadCN
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
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
  commentId: number | null;
  initialContent: string;
  mode: "post" | "update";
  getComments: (slug: string) => Promise<void>;
};

const CommentForm = ({
  userId,
  slug,
  title,
  parentId = null,
  commentId = null,
  initialContent = "",
  mode,
  getComments,
}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [content, setContent] = useState<string>(initialContent);

  const handlePost = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await actions.createComment(formData);
    setIsLoading(false);
    setContent("");
    await getComments(slug);
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await actions.updateComment(formData);
    setIsLoading(false);
    setContent("");
    await getComments(slug);
  };

  if (userId) {
    return (
      <form
        className="grid gap-3"
        onSubmit={mode === "post" ? handlePost : handleUpdate}
      >
        <div className="flex gap-3 h-[60px]">
          {mode === "post" ? (
            <>
              <input type="hidden" defaultValue={userId} name="userId" />
              <input type="hidden" defaultValue={slug} name="slug" />
              <input type="hidden" defaultValue={title} name="title" />
              {parentId && (
                <input type="hidden" defaultValue={parentId} name="parentId" />
              )}
            </>
          ) : (
            <>
              {commentId && (
                <input
                  type="hidden"
                  defaultValue={commentId}
                  name="commentId"
                />
              )}
            </>
          )}
          <Textarea
            className="resize-none h-full"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button
            className="h-full"
            type="submit"
            disabled={isLoading || content === ""}
          >
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
