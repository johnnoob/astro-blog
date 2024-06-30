import { defineDb, column, defineTable, NOW } from "astro:db";

const PostViews = defineTable({
  columns: {
    slug: column.text(),
    title: column.text(),
    category: column.text(),
    viewDate: column.text(),
    viewCount: column.number(),
    createdAt: column.date(),
    updatedAt: column.date(),
  },
});

const PostLikes = defineTable({
  columns: {
    slug: column.text({ primaryKey: true }),
    count: column.number({
      default: 0,
    }),
  },
});

const PostFeedBacks = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    slug: column.text(),
    title: column.text(),
    category: column.text(),
    rating: column.number(),
    comment: column.text({ optional: true }),
    createdAt: column.date({ default: NOW }),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: { PostViews, PostLikes, PostFeedBacks },
});
