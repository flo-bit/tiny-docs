import type { AstroIntegration } from "astro";
import { config } from "../config.server";
import { type Node, select, selectAll } from "unist-util-select";
import { turnIdIntoSlug } from "../src/utils";
import { dirname, resolve } from "node:path";

function createPlugin() {
  function transformer(tree: Node, file: any) {
    console.log("transformer", file.path, file.cwd);

    // remove docs-builder from end of cwd
    const cwd = file.cwd.replace(/docs-builder$/, "");
    // remove cwd from start of path
    let path = file.path.slice(cwd.length);

    console.log("path", path);

    const links = selectAll("link", tree);
    links.forEach((l) => {
      let link = l as any as { url: string };
      if (!link.url) return;
      if (link.url.startsWith("http")) return;

      // resolve relative links
      if (!link.url.startsWith("/")) {
        // remove file name from path
        const pathWithoutFile = dirname(file.path);

        // resolve path to absolute path
        const absolutePath = resolve(pathWithoutFile, link.url);

        link.url = "/" + absolutePath.slice(cwd.length);
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
