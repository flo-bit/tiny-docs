import { getCollection, z } from "astro:content";
import { docsSchema } from "./content.config";

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

  docs.forEach((doc) => {
    console.log(doc.id);
  });

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
  console.log(sortedDocs.map((doc) => doc.docs.map((d) => d.data)));
  return sortedDocs;
};

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

  if (lastPart) return lastPart;

  return doc.id;
};

export const getSortedCategory = (doc: z.infer<typeof docDataSchema>) => {
  let id = doc.id;
  if (id.startsWith("docs/")) {
    id = id.slice(5);
  }

  // split id by / and get the second to last part
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

export function removeNumbersAtBeginningOfString(str?: string) {
  if (!str) return str;
  return str.replace(/^[0-9]+-/g, "");
}

export const getTitle = (doc: z.infer<typeof docDataSchema>) => {
  if (doc.data.title) {
    return doc.data.title;
  }

  // split id by / and get the last part
  // if it starts with any number (Can be multiple digits) + -, remove it
  let lastPart = doc.id.split("/").pop();
  lastPart = removeNumbersAtBeginningOfString(lastPart);

  lastPart = lastPart?.replace(/-/g, " ");

  if (lastPart) {
    return lastPart.charAt(0).toUpperCase() + lastPart.slice(1);
  }

  // if no last part, return the id
  return doc.id;
};

export async function hasSidebar() {
  // if more than one doc, return true
  const docs = await getSortedDocs();
  return docs.length > 1;
}

export function getSlug(doc: z.infer<typeof docDataSchema>) {
  // remove docs/ and numbers from the id
  let id = doc.id;
  if (id.startsWith("docs/")) {
    id = id.slice(5);
  }
  // splice by /
  let parts = id.split("/");
  // for every part, if it starts with any number (Can be multiple digits) + -, remove it
  parts = parts.map((part) => removeNumbersAtBeginningOfString(part) ?? "");
  // join parts by /
  return parts.join("/");
}
