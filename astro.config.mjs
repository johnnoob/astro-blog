import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { transformerNotationDiff, transformerNotationHighlight, transformerNotationWordHighlight, transformerNotationFocus, transformerNotationErrorLevel, transformerMetaHighlight, transformerMetaWordHighlight } from "@shikijs/transformers";
import { remarkReadingTime } from "./remark-plugins/remark-reading-time.mjs";

import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport"
  },
  integrations: [mdx(), react(), tailwind(), tailwind({
    applyBaseStyles: false
  }), icon(), db()],
  markdown: {
    remarkPlugins: [remarkReadingTime],
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://shiki.style/themes
      // theme: "dracula",
      // Alternatively, provide multiple themes
      // See note below for using dual light/dark themes
      // themes: {
      //   light: "github-light",
      //   dark: "github-dark",
      // },
      // Add custom languages
      // Note: Shiki has countless langs built-in, including .astro!
      // https://shiki.style/languages
      langs: [],
      // Enable word wrap to prevent horizontal scrolling
      wrap: true,
      // Add custom transformers: https://shiki.style/guide/transformers
      // Find common transformers: https://shiki.style/packages/transformers
      transformers: [transformerNotationDiff(), transformerNotationHighlight(), transformerNotationWordHighlight(), transformerNotationFocus(), transformerNotationErrorLevel(), transformerMetaHighlight(), transformerMetaWordHighlight()]
    }
  }
});