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
import { Separator } from "../ui/separator";
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
import { Button } from "../ui/button";

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
  const [areChildrenHidden, setAreChildrenHidden] = useState<boolean>(false);
  const replyComments = getReplies(commentId, parentIdtoCommentsMap);

  return (
    <>
      <Card key={commentId} className="border-none shadow-none ">
        <CardContent className="flex gap-3 py-1 px-0">
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
        <>
          <div className={`flex ${areChildrenHidden && "hidden"}`}>
            <button
              className="relative w-[20px] -translate-x-1/2 before:absolute before:top-0 before:bottom-0 before:left-1/2 before:w-[1px] before:content-[''] before:bg-muted-foreground"
              onClick={() => setAreChildrenHidden(true)}
            />
            <div className="w-full">
              <CommentList
                userId={userId}
                slug={slug}
                title={title}
                comments={replyComments}
                parentIdtoCommentsMap={parentIdtoCommentsMap}
              />
            </div>
          </div>
          <Button
            className={`w-fit ${!areChildrenHidden && "hidden"}`}
            onClick={() => setAreChildrenHidden(false)}
          >
            顯示回覆
          </Button>
        </>
      )}
    </>
  );
};

export default Comment;
