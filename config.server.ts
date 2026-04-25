// config.server.ts
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Config } from "./config.type";

const defaultConfig: Config = {
  SITE: undefined,
  BASE: "",
  SITE_NAME: "",
  SITE_DESCRIPTION: "",
  SITE_FAVICON: "",
  SHOW_THEME_TOGGLE: true,
  SEARCH_ENABLED: false,
  BASE_COLOR: "zinc",
  ACCENT_COLOR: "emerald",

  FACEBOOK_URL: "",
  TWITTER_URL: "",
  GITHUB_URL: "",
  LINKEDIN_URL: "",
  YOUTUBE_URL: "",
  BLUESKY_URL: "",
  DISCORD_URL: "",
  EMAIL: "",

  EXCLUDE_README: false,
  REPLACE_README_WITH_TITLE: "",
};

// Resolve via process.cwd() — Astro runs from project root. import.meta.url
// would lie when this module is bundled into dist/chunks during build.
const projectRoot = process.cwd();
const parentDir = resolve(projectRoot, "..");

// Parent-layout (CI): tiny-docs sits at <repo>/docs-builder/ with content at <repo>/docs/.
// Self-layout (local dev): content lives inside this repo at ./docs/.
export const contentRoot = existsSync(resolve(parentDir, "docs"))
  ? parentDir
  : projectRoot;

const configPath = resolve(contentRoot, "tdocs.config.json");

export function loadConfig(): Config {
  if (!existsSync(configPath)) return defaultConfig;
  try {
    const parsed = JSON.parse(readFileSync(configPath, "utf-8"));
    return { ...defaultConfig, ...parsed };
  } catch {
    console.warn("⚠️ Invalid tdocs.config.json — using defaults.");
    return defaultConfig;
  }
}

export const config = loadConfig();
export const accentColor = (config.ACCENT_COLOR ?? "emerald").toLowerCase();
export const baseColor = (config.BASE_COLOR ?? "zinc").toLowerCase();
