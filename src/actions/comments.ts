// astro actions
import { defineAction, z } from "astro:actions";
// astro db
import { db, PostComment } from "astro:db";

export const comments = defineAction({
  accept: "form",
  input: z.object({
    userId: z.string(),
    slug: z.string(),
    title: z.string(),
    content: z.string(),
    parentId: z.number().optional(),
  }),
  handler: async ({ userId, slug, title, content, parentId }) => {
    console.log(userId, slug, title, content, parentId);
    await db.insert(PostComment).values({
      userId,
      slug,
      title,
      content,
      parentId,
    });

    return new Response(JSON.stringify({ msg: "success" }), {
      status: 200,
    });
  },
});
