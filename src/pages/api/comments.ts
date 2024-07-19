// types
import type { APIRoute } from "astro";
// astro db
import { db, PostComment, PostCommentLike, User, eq, and } from "astro:db";

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const slug = params.get("slug");
  if (!slug) {
    return new Response("Not found", { status: 404 });
  }
  const slugComments = await db
    .select()
    .from(PostComment)
    .where(eq(PostComment.slug, slug))
    .innerJoin(User, eq(PostComment.userId, User.id));

  return new Response(JSON.stringify(slugComments), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
};

export const DELETE: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const commentId = params.get("commentId");
  if (commentId) {
    await db.delete(PostComment).where(eq(PostComment.id, Number(commentId)));
    await db
      .delete(PostComment)
      .where(eq(PostComment.parentId, Number(commentId)));
  }

  return new Response(null, {
    status: 204,
    headers: {
      "content-type": "application/json",
    },
  });
};
