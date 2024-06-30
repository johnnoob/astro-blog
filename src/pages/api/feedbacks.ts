// types
import type { APIRoute } from "astro";
// astro db
import { db, PostFeedBacks, eq, avg } from "astro:db";

// set api prerender to be false
export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const slug = params.get("slug");
  const title = params.get("title");
  const category = params.get("category");
  if (!slug || !title || !category) {
    return new Response("Not found", { status: 404 });
  }
  const averageRatingForSlug = await db
    .select({
      slug: PostFeedBacks.slug,
      avgRating: avg(PostFeedBacks.rating),
    })
    .from(PostFeedBacks)
    .where(eq(PostFeedBacks.slug, slug)) // Add the where clause to filter by slug
    .groupBy(PostFeedBacks.slug);
  if (
    averageRatingForSlug.length === 0 ||
    averageRatingForSlug[0].avgRating === null
  ) {
    return new Response(JSON.stringify({ msg: "No rating" }), {
      status: 200,
      headers: {
        "content-type": "application/json",
        "cache-control": "no-store",
      },
    });
  }

  return new Response(
    JSON.stringify({
      msg: "success",
      avgRating: averageRatingForSlug[0]["avgRating"],
    }),
    {
      status: 200,
      headers: {
        "content-type": "application/json",
        "cache-control": "no-store",
      },
    }
  );
};

export const POST: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const slug = params.get("slug");
  const title = params.get("title");
  const category = params.get("category");

  if (!slug || !title || !category) {
    return new Response("Not found", { status: 404 });
  }
  const { rating, comment } = await request.json();

  await db.insert(PostFeedBacks).values({
    slug,
    title,
    category,
    rating,
    comment,
  });

  const averageRatingForSlug = await db
    .select({
      slug: PostFeedBacks.slug,
      avgRating: avg(PostFeedBacks.rating),
      // count: sql`SUM(${PostViews.viewCount})`.as("totalViews"),
    })
    .from(PostFeedBacks)
    .where(eq(PostFeedBacks.slug, slug)) // Add the where clause to filter by slug
    .groupBy(PostFeedBacks.slug);
  if (
    averageRatingForSlug.length === 0 ||
    averageRatingForSlug[0].avgRating === null
  ) {
    return new Response(JSON.stringify({ msg: "No rating" }), {
      status: 200,
      headers: {
        "content-type": "application/json",
        "cache-control": "no-store",
      },
    });
  }

  return new Response(
    JSON.stringify({
      msg: "success",
      avgRating: averageRatingForSlug[0]["avgRating"],
    }),
    {
      status: 200,
      headers: {
        "content-type": "application/json",
        "cache-control": "no-store",
      },
    }
  );
};
