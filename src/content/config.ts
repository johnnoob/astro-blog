import { defineCollection, z } from "astro:content";

const postsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    category: z.string(),
    subcategory: z.string(),
    date: z.string(),
    heroImage: z.string(),
    tags: z.array(z.string()),
    author: z.string(),
  }),
});

export const collections = {
  posts: postsCollection,
};
