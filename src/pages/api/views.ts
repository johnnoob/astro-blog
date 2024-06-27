// types
import type { APIRoute } from "astro";
// astro db
import { db, PostViews, sql, eq, and } from "astro:db";

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

  const currentDate = new Date().toISOString().split("T")[0];
  const existingRecord = await db
    .select()
    .from(PostViews)
    .where(and(eq(PostViews.viewDate, currentDate), eq(PostViews.slug, slug)));

  if (existingRecord.length > 0) {
    await db
      .update(PostViews)
      .set({
        viewCount: existingRecord[0].viewCount + 1,
        updatedAt: new Date(),
      })
      .where(
        and(eq(PostViews.viewDate, currentDate), eq(PostViews.slug, slug))
      );
  } else {
    await db.insert(PostViews).values({
      slug,
      title,
      category,
      viewDate: currentDate,
      viewCount: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  const totalViewCountForSlug = await db
    .select({
      slug: PostViews.slug,
      count: sql`SUM(${PostViews.viewCount})`.as("totalViews"),
    })
    .from(PostViews)
    .where(eq(PostViews.slug, slug)) // Add the where clause to filter by slug
    .groupBy(PostViews.slug);

  return new Response(JSON.stringify(totalViewCountForSlug[0]), {
    status: 200,
    headers: {
      "content-type": "application/json",
      // The cache should not store anything about the server response to let this api trigger everytime.
      "cache-control": "no-store",
    },
  });
};
