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

type Props = {
  commentId: number;
  userPicture: string;
  userName: string;
  commentContent: string;
  commentCreatedAt: string;
  commentParentId: number | null;
  replyUserId: string;
  slug: string;
  title: string;
};

const Comment = ({
  commentId,
  userPicture,
  userName,
  commentContent,
  commentCreatedAt,
  commentParentId,
  replyUserId,
  slug,
  title,
}: Props) => {
  const [isReplying, setIsReplying] = useState<boolean>(false);
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
            userId={replyUserId}
            slug={slug}
            title={title}
            parentId={commentId}
            initialContent=""
          />
        </div>
      )}
    </>
  );
};

export default Comment;
