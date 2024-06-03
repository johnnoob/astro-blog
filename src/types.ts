import type { CollectionEntry } from "astro:content";
import { type ImageMetadata } from "astro";

export type Post = CollectionEntry<"posts">;
export type AugmentedPost = Post & {
  minutes: number;
};
export type ClassifiedPosts = {
  [category: string]: Post[];
};
export type HeroImage = {
  src: ImageMetadata;
  alt: string;
};
export type PostCardProps = {
  title: string;
  category: string;
  subcategory: string;
  tags: string[];
  date: Date;
  author: string;
  image: HeroImage;
  slug: string;
  body: string;
  minutes: number;
};
