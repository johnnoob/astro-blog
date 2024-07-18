// react
import { useState, useEffect } from "react";
// react components
import Comment from "./Comment";

type Props = {
  userId: string;
  slug: string;
  title: string;
  comments: Comment[];
  parentIdtoCommentsMap: { [parentId: number]: Comment[] };
  getComments: (slug: string) => Promise<void>;
};

const CommentList = ({
  userId,
  slug,
  title,
  comments,
  parentIdtoCommentsMap,
  getComments,
}: Props) => {
  return (
    <div className="grid gap-3">
      {comments.length > 0
        ? comments.map((comment) => (
            <Comment
              key={comment.PostComment.id}
              commentId={comment.PostComment.id}
              userPicture={comment.User.pictureUrl}
              userName={comment.User.name}
              commentContent={comment.PostComment.content}
              commentCreatedAt={comment.PostComment.createdAt}
              commentParentId={comment.PostComment.parentId}
              userId={userId}
              slug={slug}
              title={title}
              parentIdtoCommentsMap={parentIdtoCommentsMap}
              getComments={getComments}
            />
          ))
        : "loading"}
    </div>
  );
};

export default CommentList;
