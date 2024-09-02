// action
import { defineAction } from "astro:actions";
import { z } from "astro/zod";
// astro db
import { db, PostViews, and, eq, sum } from "astro:db";

export const views = defineAction({
  input: z.object({
    slug: z.string(),
    title: z.string(),
    category: z.string(),
  }),
  handler: async ({ slug, title, category }) => {
    const currentDate = new Date().toISOString().split("T")[0];
    const existingRecord = await db
      .select()
      .from(PostViews)
      .where(
        and(eq(PostViews.viewDate, currentDate), eq(PostViews.slug, slug))
      );

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
        count: sum(PostViews.viewCount),
      })
      .from(PostViews)
      .where(eq(PostViews.slug, slug))
      .groupBy(PostViews.slug);
    return totalViewCountForSlug;
  },
});
