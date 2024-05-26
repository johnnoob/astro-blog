import { defineCollection, z } from "astro:content";

const postsCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      category: z.string(),
      subcategory: z.string(),
      date: z.string(),
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
