// types
import type { APIRoute } from "astro";
// astro db
import { db, eq, Likes, sql } from "astro:db";

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
      .insert(Likes)
      .values({
        slug: slug,
        count: 0,
      })
      .onConflictDoUpdate({
        target: Likes.slug,
        set: {
          count: sql`${Likes.count}`,
        },
      })
      .returning({
        slug: Likes.slug,
        count: Likes.count,
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
  if (!slug) {
    return new Response("Not found", { status: 404 });
  }
  let item;
  try {
    item = await db
      .insert(Likes)
      .values({
        slug: slug,
        count: 1,
      })
      .onConflictDoUpdate({
        target: Likes.slug,
        set: {
          count: sql`count + 1`,
        },
      })
      .returning({
        slug: Likes.slug,
        count: Likes.count,
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
      // "cache-control": "no-store",
    },
  });
};
