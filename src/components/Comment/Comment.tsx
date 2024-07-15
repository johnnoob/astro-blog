// react
import { useState } from "react";
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
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
// react icons
import {
  FaPen,
  FaTrash,
  FaReply,
  FaRegThumbsUp,
  FaThumbsUp,
} from "react-icons/fa6";
// astro actions
import { actions } from "astro:actions";
// date-fns
import { format } from "date-fns";

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

type Props = {
  commentId: number;
  userPicture: string;
  userName: string;
  commentContent: string;
  commentCreatedAt: string;
  commentParentId: number | null;
  userId: string;
  slug: string;
  title: string;
  parentIdtoCommentsMap: { [parentId: number]: Comment[] };
};

const getReplies = (
  commentParentId: number | null,
  parentIdtoCommentsMap: { [parentId: number]: Comment[] }
) => {
  console.log(commentParentId);

  if (commentParentId && parentIdtoCommentsMap[commentParentId]) {
    return parentIdtoCommentsMap[commentParentId];
  }
  return [];
};

const Comment = ({
  commentId,
  userPicture,
  userName,
  commentContent,
  commentCreatedAt,
  commentParentId,
  userId,
  slug,
  title,
  parentIdtoCommentsMap,
}: Props) => {
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const replyComments = getReplies(commentId, parentIdtoCommentsMap);

  return (
    <>
      <Card key={commentId}>
        <CardContent className="flex gap-3 py-3">
          <Avatar>
            <AvatarImage src={userPicture} />
          </Avatar>
          <article className="w-full grid gap-2">
            <p>
              <span className="font-bold">{userName}：</span>
              {commentContent}
            </p>
            <div className="text-muted-foreground flex items-center justify-between">
              <p>{format(commentCreatedAt, "yyyy-MM-dd h:mma")}</p>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <FaRegThumbsUp />
                  <span>0</span>
                </div>
                <FaPen />
                <FaTrash className=" text-destructive" />
                <button onClick={() => setIsReplying((prev) => !prev)}>
                  <FaReply />
                </button>
              </div>
            </div>
          </article>
        </CardContent>
      </Card>
      {isReplying && (
        <div>
          <CommentForm
            userId={userId}
            slug={slug}
            title={title}
            parentId={commentId}
            initialContent=""
          />
        </div>
      )}
      {replyComments.length > 0 && (
        <CommentList
          userId={userId}
          slug={slug}
          title={title}
          comments={replyComments}
          parentIdtoCommentsMap={parentIdtoCommentsMap}
        />
      )}
    </>
  );
};

export default Comment;
