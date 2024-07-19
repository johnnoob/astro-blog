// react
import React, { useState, useEffect } from "react";
// react components
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

type Props = {
  userId: string;
  slug: string;
  title: string;
};
type Comment = {
  PostComment: {
    id: number;
    slug: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    parentId: number | null;
  };
  User: {
    id: string;
    name: string;
    email: string;
    pictureUrl: string;
    identity: "guest" | "member" | "admin";
    createdAt: string;
  };
};

const CommentSection = ({ userId, slug, title }: Props) => {
  const [data, setData] = useState<Comment[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getComments = async (slug: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/comments?${new URLSearchParams({ slug })}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error("Unknown error"));
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getComments(slug);
  }, [slug]);

  const rootComments = data.filter(
    (comment) => comment.PostComment.parentId === null
  );
  const parentIdtoCommentsMap: { [parentId: number]: Comment[] } = {};
  data.forEach((comment) => {
    const parentId = comment.PostComment.parentId;
    if (parentId !== null) {
      if (!parentIdtoCommentsMap[parentId]) {
        parentIdtoCommentsMap[parentId] = [];
      }
      parentIdtoCommentsMap[parentId].push(comment);
    }
  });

  return (
    <section className="grid gap-3">
      <div>
        <CommentForm
          userId={userId}
          slug={slug}
          title={title}
          parentId={null}
          commentId={null}
          initialContent=""
          mode="post"
          getComments={getComments}
        />
      </div>
      <div>
        <CommentList
          userId={userId}
          slug={slug}
          title={title}
          comments={rootComments}
          parentIdtoCommentsMap={parentIdtoCommentsMap}
          getComments={getComments}
        />
      </div>
    </section>
  );
};

export default CommentSection;
