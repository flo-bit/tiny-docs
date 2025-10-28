import { OGImageRoute } from "astro-og-canvas";
import { config } from "../../../config";
import { getSortedDocs, getTitle } from "../../content-utils";

const posts = await getSortedDocs();

// turn posts into an object with slugs as keys, and title and description as values
// { slug: { title, description } }

const pages = posts.reduce(
  (acc, post) => {
    acc[post.id] = {
      title: getTitle(post) ?? "",
      description: post.data.description ?? "",
    };
    return acc;
  },
  {} as Record<string, { title: string; description: string }>,
);

export const { getStaticPaths, GET } = OGImageRoute({
  // Tell us the name of your dynamic route segment.
  // In this case it’s `route`, because the file is named `[...route].ts`.
  param: "route",

  // A collection of pages to generate images for.
  // The keys of this object are used to generate the path for that image.
  // In this example, we generate one image at `/open-graph/example.png`.
  pages: {
    main: {
      title: config.SITE_NAME ?? "hello",
      description: config.SITE_DESCRIPTION ?? "",
    },
    ...pages,
  },

  // For each page, this callback will be used to customize the OpenGraph image.
  getImageOptions: (_, page) => ({
    title: page.title,
    description: page.description,
    bgImage: {
      path: "./src/assets/backgrounds/background.jpg",
      fit: "cover",
    },
    font: {
      /** Font style for the page title. */
      title: {
        families: ["Inter"],
        color: [255, 255, 255],
        size: 80,
        weight: "SemiBold",
      },
      description: {
        families: ["Inter"],
        color: [255, 255, 255],
      },
    },
    padding: 80,
    fonts: ["./src/assets/fonts/InterVariable.ttf"],
  }),
});
