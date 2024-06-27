// types
import type { APIRoute } from "astro";
// astro db
import { db, eq, PostLikes, sql } from "astro:db";

// set api prerender to be false
export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const slug = params.get("slug");

  if (!slug) {
    return new Response("Not found", { status: 404 });
  }

  let item;
  try {
    item = await db
      .insert(PostLikes)
      .values({
        slug: slug,
        count: 0,
      })
      .onConflictDoUpdate({
        target: PostLikes.slug,
        set: {
          count: sql`${PostLikes.count}`,
        },
      })
      .returning({
        slug: PostLikes.slug,
        count: PostLikes.count,
      })
      .then((res) => res[0]);
  } catch (error) {
    item = { slug, count: 1 };
  }

  return new Response(JSON.stringify(item), {
    status: 200,
    headers: {
      "content-type": "application/json",
      // The cache should not store anything about the server response to let this api trigger everytime.
      "cache-control": "no-store",
    },
  });
};

export const POST: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const slug = params.get("slug");
  const action = params.get("action");

  if (!slug || !action) {
    return new Response("Not found", { status: 404 });
  }
  let item;
  if (action === "give") {
    try {
      item = await db
        .insert(PostLikes)
        .values({
          slug: slug,
          count: 1,
        })
        .onConflictDoUpdate({
          target: PostLikes.slug,
          set: {
            count: sql`count + 1`,
          },
        })
        .returning({
          slug: PostLikes.slug,
          count: PostLikes.count,
        })
        .then((res) => res[0]);
    } catch (error) {
      item = { slug, count: 1 };
    }
  } else {
    try {
      item = await db
        .insert(PostLikes)
        .values({
          slug: slug,
          count: 1,
        })
        .onConflictDoUpdate({
          target: PostLikes.slug,
          set: {
            count: sql`CASE WHEN count > 0 THEN count - 1 ELSE 0 END`,
          },
        })
        .returning({
          slug: PostLikes.slug,
          count: PostLikes.count,
        })
        .then((res) => res[0]);
    } catch (error) {
      item = { slug, count: 1 };
    }
  }

  return new Response(JSON.stringify(item), {
    status: 200,
    headers: {
      "content-type": "application/json",
      // The cache should not store anything about the server response to let this api trigger everytime.
      // "cache-control": "no-store",
    },
  });
};
