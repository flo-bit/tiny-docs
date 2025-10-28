// @ts-check
import { defineConfig } from "astro/config";
import { resolve } from "path";
import remarkMath from "remark-math";
import rehypeMathjax from "rehype-mathjax";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";

import pagefind from "astro-pagefind";
import customEmbeds from "./custom-embeds";
import remarkGithubAdmonitionsToDirectives from "remark-github-admonitions-to-directives";

import {
  transformerMetaHighlight,
  transformerNotationHighlight,
} from "@shikijs/transformers";

import LinkCardEmbed from "./src/embeds/link-card/embed";
import YoutubeEmbed from "./src/embeds/youtube/embed";
import ExcalidrawEmbed from "./src/embeds/excalidraw/embed";
import GithubEmbed from "./src/embeds/github/embed";
import { calloutEmbeds } from "./src/embeds/callouts/embeds";

import react from "@astrojs/react";
import { config } from "./config.server";
import fixLinks from "./transform-links";

// https://astro.build/config
export default defineConfig({
  vite: {
    resolve: {
      alias: {
        $components: resolve("./src/components"),
        $layouts: resolve("./src/layouts"),
        $pages: resolve("./src/pages"),
        $assets: resolve("./src/assets"),
        $content: resolve("./src/content"),
      },
    },
    define: {
      __PUBLIC_CONFIG__: JSON.stringify(config),
    },
  },

  integrations: [
    pagefind(),
    customEmbeds({
      embeds: [
        ExcalidrawEmbed,
        YoutubeEmbed,
        GithubEmbed,
        LinkCardEmbed,
        ...calloutEmbeds,
      ],
    }),
    fixLinks(),
    mdx(),
    sitemap(),
    tailwind(),
    svelte(),
    react(),
  ],

  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      defaultColor: false,
      transformers: [
        transformerMetaHighlight(),
        transformerNotationHighlight(),
      ],
      wrap: true,
    },

    remarkPlugins: [remarkGithubAdmonitionsToDirectives, remarkMath],
    rehypePlugins: [rehypeMathjax],
  },

  prefetch: {
    prefetchAll: true,
  },
  site: config.SITE ?? undefined,
  base: config.BASE ?? "/",
  output: "static",
});