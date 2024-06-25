import { defineDb, column, defineTable } from "astro:db";

const Views = defineTable({
  columns: {
    slug: column.text({ primaryKey: true }),
    count: column.number({
      default: 1,
    }),
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
  tables: { Views, Likes },
});
