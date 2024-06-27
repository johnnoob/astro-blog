import { defineDb, column, defineTable } from "astro:db";

const PostViews = defineTable({
  columns: {
    slug: column.text({ primaryKey: true }),
    title: column.text(),
    category: column.text(),
    viewDate: column.text(),
    viewCount: column.number(),
    createdAt: column.date(),
    updatedAt: column.date(),
  },
});

const Likes = defineTable({
  columns: {
    slug: column.text({ primaryKey: true }),
    count: column.number({
      default: 0,
    }),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: { PostViews, Likes },
});
