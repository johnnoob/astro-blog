// react
import { useState, useEffect } from "react";
// shadCN
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
// react components
import Comment from "./Comment";
// react icons
import {
  FaPen,
  FaTrash,
  FaReply,
  FaRegThumbsUp,
  FaThumbsUp,
} from "react-icons/fa6";
// date-fns
import { format } from "date-fns";

type Props = {
  replyUserId: string;
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

const CommentList = ({ replyUserId, slug, title }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<Comment[]>([]);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    const handleGetComments = async (slug: string) => {
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
      }
    };
    handleGetComments(slug);
  }, []);

  return (
    <div className="grid gap-3">
      {data.length > 0
        ? data.map((comment) => (
            <Comment
              key={comment.PostComment.id}
              commentId={comment.PostComment.id}
              userPicture={comment.User.pictureUrl}
              userName={comment.User.name}
              commentContent={comment.PostComment.content}
              commentCreatedAt={comment.PostComment.createdAt}
              commentParentId={comment.PostComment.parentId}
              replyUserId={replyUserId}
              slug={slug}
              title={title}
            />
          ))
        : "loading"}
    </div>
  );
};

export default CommentList;
