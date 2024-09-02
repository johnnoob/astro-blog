// astro actions
import { defineAction } from "astro:actions";
import { z } from "astro/zod";
// astro db
import { db, PostComment, eq } from "astro:db";

export const createComment = defineAction({
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
    return { msg: "成功留言" };
    // return new Response(JSON.stringify({ msg: "create success" }), {
    //   status: 200,
    // });
  },
});

export const updateComment = defineAction({
  accept: "form",
  input: z.object({
    commentId: z.number(),
    content: z.string(),
  }),
  handler: async ({ commentId, content }) => {
    await db
      .update(PostComment)
      .set({ content })
      .where(eq(PostComment.id, commentId));

    // return new Response(JSON.stringify({ msg: "update success" }), {
    //   status: 200,
    // });
  },
});
