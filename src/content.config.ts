import { defineCollection, z } from "astro:content";
import { glob } from 'astro/loaders';

export const docsSchema = z.object({
  title: z.string().optional(),

  description: z.string().optional(),

  shortDescription: z.string().optional(),
});

const docs = defineCollection({
  loader: glob({
    pattern: ["docs/**/[^_]*.{md,mdx}", "README.md"],
    base: "../",
  }),
  // Type-check frontmatter using a schema
  schema: docsSchema,
});

export const collections = { docs };
