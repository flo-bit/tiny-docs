import type { APIRoute, GetStaticPaths } from "astro";
import { getSortedDocs, getSlug, getTitle } from "../../content-utils";

export const getStaticPaths: GetStaticPaths = async () => {
  const docs = await getSortedDocs();
  return docs.map((doc) => ({
    params: { slug: getSlug(doc) },
    props: { doc },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const doc = (props as any).doc;
  const raw = (doc.body ?? "").trimStart();
  const body = raw.startsWith("# ") ? raw : `# ${getTitle(doc)}\n\n${raw}`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
