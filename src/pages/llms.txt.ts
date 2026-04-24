import type { APIRoute } from "astro";
import { config } from "../../config";
import { getDocs, getTitle, getSlug } from "../content-utils";

const docs = await getDocs();
const origin = (config.SITE ?? "") + (config.BASE ?? "");

function line(doc: any) {
  const url = `${origin}/${getSlug(doc)}/llms.txt`;
  const desc = doc.data?.shortDescription || doc.data?.description;
  return `- [${getTitle(doc)}](${url})${desc ? `: ${desc}` : ""}`;
}

const sections = docs
  .map(({ category, docs: entries }) => {
    const heading = category || "Overview";
    return `## ${heading}\n\n${entries.map(line).join("\n")}`;
  })
  .join("\n\n");

const body =
  `# ${config.SITE_NAME || "Documentation"}\n\n` +
  (config.SITE_DESCRIPTION ? `> ${config.SITE_DESCRIPTION}\n\n` : "") +
  `${sections}\n\n` +
  `## Optional\n\n- [Full documentation](${origin}/llms-full.txt)\n`;

export const GET: APIRoute = async () =>
  new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
