import type { AstroIntegration } from "astro";
import { config, contentRoot } from "../config.server";
import { type Node, selectAll } from "unist-util-select";
import { turnIdIntoSlug } from "../src/utils";
import { dirname, relative, resolve } from "node:path";

function createPlugin() {
  function transformer(tree: Node, file: any) {
    const links = selectAll("link", tree);
    links.forEach((l) => {
      let link = l as any as { url: string };
      if (!link.url) return;
      if (link.url.startsWith("http")) return;

      if (!link.url.startsWith("/")) {
        const pathWithoutFile = dirname(file.path);
        const absolutePath = resolve(pathWithoutFile, link.url);
        link.url = "/" + relative(contentRoot, absolutePath);
      }

      link.url = (
        config.BASE + turnIdIntoSlug(link.url.replace(/\.mdx?$/, ""))
      ).toLowerCase();
    });

    return tree;
  }

  return function attacher() {
    return transformer;
  };
}

/**
 * Astro embed MDX integration.
 */
export default function fixLinks() {
  const AstroLinkReplacer: AstroIntegration = {
    name: "astro-replace-links",
    hooks: {
      "astro:config:setup": async ({ updateConfig }) => {
        updateConfig({
          markdown: {
            remarkPlugins: [createPlugin()],
          },
        });
      },
    },
  };

  return [AstroLinkReplacer];
}
