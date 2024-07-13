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

// Post Comment
type Identity = "guest" | "member" | "admin";
const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text(),
    email: column.text(),
    pictureUrl: column.text(),
    identity: column.text({ default: "guest" }),
    createdAt: column.date({ default: NOW }),
  },
});

const PostComment = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    slug: column.text(),
    title: column.text(),
    content: column.text(),
    createdAt: column.date({ default: NOW }),
    updatedAt: column.date({ default: NOW }),
    userId: column.text({ references: () => User.columns.id }),
    parentId: column.number({
      optional: true,
    }),
  },
});

const PostCommentLike = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    userId: column.text({ references: () => User.columns.id }),
    commentId: column.number({ references: () => PostComment.columns.id }),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: {
    PostViews,
    PostLikes,
    PostFeedBacks,
    PostComment,
    PostCommentLike,
    User,
  },
});
