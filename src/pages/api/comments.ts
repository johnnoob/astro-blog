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
  // .innerJoin(
  //   PostCommentLike,
  //   and(
  //     eq(PostCommentLike.userId, User.id),
  //     eq(PostCommentLike.commentId, PostComment.id)
  //   )
  // );

  return new Response(JSON.stringify(slugComments), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
};

// export const POST: APIRoute = async ({ request }) => {
//   const url = new URL(request.url);
//   const params = new URLSearchParams(url.search);
//   const slug = params.get("slug");
//   const title = params.get("title");
//   const category = params.get("category");

//   if (!slug || !title || !category) {
//     return new Response("Not found", { status: 404 });
//   }
//   const { rating, comment } = await request.json();

//   await db.insert(PostFeedBacks).values({
//     slug,
//     title,
//     category,
//     rating,
//     comment,
//   });

//   const slugFeedbackStats = await db
//     .select({
//       slug: PostFeedBacks.slug,
//       avgRating: avg(PostFeedBacks.rating),
//       count: count(PostFeedBacks.id),
//     })
//     .from(PostFeedBacks)
//     .where(eq(PostFeedBacks.slug, slug))
//     .groupBy(PostFeedBacks.slug);
//   if (
//     slugFeedbackStats.length === 0 ||
//     slugFeedbackStats[0].avgRating === null
//   ) {
//     return new Response(
//       JSON.stringify({ msg: "No feedback", avgRating: 0, count: 0 }),
//       {
//         status: 200,
//         headers: {
//           "content-type": "application/json",
//           "cache-control": "no-store",
//         },
//       }
//     );
//   }
//   return new Response(
//     JSON.stringify({
//       msg: "success",
//       avgRating: Number(slugFeedbackStats[0]["avgRating"]),
//       count: Number(slugFeedbackStats[0]["count"]),
//     }),
//     {
//       status: 200,
//       headers: {
//         "content-type": "application/json",
//         "cache-control": "no-store",
//       },
//     }
//   );
// };
