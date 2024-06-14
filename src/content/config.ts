import { defineCollection, z } from "astro:content";

const postsCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      category: z.string(),
      subcategory: z.string(),
      date: z.string().transform((dateString) => {
        const date = new Date(dateString);
        // Date物件會受到本地時區GMT+8的影響，00:00變成08:00，故將時間調整回00:00
        date.setHours(0, 0, 0, 0);
        return date;
      }),
      heroImage: z.object({
        src: image(),
        alt: z.string(),
      }),
      tags: z.array(z.string()),
      author: z.string(),
      isDraft: z.boolean(),
    }),
});

export const collections = {
  posts: postsCollection,
};
