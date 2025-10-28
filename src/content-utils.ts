import { getCollection, z } from "astro:content";
import { docsSchema } from "./content.config";
import { removeNumbersAtBeginningOfString, turnIdIntoSlug } from "./utils";
import { config } from "../config.server";

function sortByCategory(a: any, b: any): number | undefined {
  const aCategory = getSortedCategory(a);
  const bCategory = getSortedCategory(b);
  if (aCategory !== bCategory) {
    return aCategory.localeCompare(bCategory);
  }
  return getSortTitle(a).localeCompare(getSortTitle(b)) ?? 0;
}

export const getSortedDocs = async () => {
  return (await getCollection("docs")).sort((a, b) => {
    let categorySort = sortByCategory(a, b);
    if (categorySort !== undefined) return categorySort;

    return getSortTitle(a).localeCompare(getSortTitle(b)) ?? 0;
  });
};

export const getDocs = async () => {
  const docs = await getSortedDocs();

  const categories = docs
    .map((doc) => getCategory(doc))
    .filter((category) => category);
  const uniqueCategories = [...new Set(categories)];

  uniqueCategories.unshift("");

  // turn into array of objects with category names and docs for each category
  const sortedDocs = uniqueCategories.map((category) => {
    return {
      category: category,
      docs: docs.filter((doc) => getCategory(doc) === category),
    };
  });
  return sortedDocs;
};

export async function hasSidebar() {
  const docs = await getSortedDocs();
  return docs.length > 1;
}

export const getNextAndPreviousDocs = async (doc: any) => {
  const docs = await getSortedDocs();

  const index = docs.findIndex((d) => d.id === doc.id);
  return {
    previous: index > 0 ? docs[index - 1] : null,
    next: index < docs.length - 1 ? docs[index + 1] : null,
  };
};

const docDataSchema = z.object({
  data: docsSchema,
  id: z.string(),
});

export const getSortTitle = (doc: z.infer<typeof docDataSchema>) => {
  let lastPart = doc.id.split("/").pop();

  let title = lastPart || doc.id;

  if (title.toLowerCase() === "readme") {
    title = "0000-" + (config.REPLACE_README_WITH_TITLE || "readme");
  }

  return title;
};

export const getSortedCategory = (doc: z.infer<typeof docDataSchema>) => {
  let id = doc.id;
  if (id.startsWith("docs/")) {
    id = id.slice(5);
  }

  let parts = id.split("/");
  const category = parts[parts.length - 2] ?? "";
  return category;
};

export const getCategory = (doc: z.infer<typeof docDataSchema>) => {
  return removeNumbersAtBeginningOfString(getSortedCategory(doc))?.replace(
    /-/g,
    " ",
  );
};

export const getTitle = (doc: z.infer<typeof docDataSchema>) => {
  let title = getSortTitle(doc);
  title = removeNumbersAtBeginningOfString(title) ?? "";

  title = title.replace(/-/g, " ");

  if (title) {
    return title.charAt(0).toUpperCase() + title.slice(1);
  }

  return title;
};

export function getSlug(doc: z.infer<typeof docDataSchema>) {
  // remove docs/ and numbers from the id
  let id = doc.id;

  return turnIdIntoSlug(id);
}
