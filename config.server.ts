// config.server.ts
import { existsSync, readFileSync } from "node:fs";
import { resolve as r } from "node:path";
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

export function loadConfig(): Config {
  try {
    const configPath = r("../tdocs.config.json");
    if (existsSync(configPath)) {
      return JSON.parse(readFileSync(configPath, "utf-8")) as Config;
    }
  } catch (e) {
    console.warn(
      "⚠️ No tdocs.config.json found or invalid JSON — using defaults.",
    );
  }
  return defaultConfig;
}

export const config = loadConfig();
export const accentColor = (config.ACCENT_COLOR ?? "emerald").toLowerCase();
export const baseColor = (config.BASE_COLOR ?? "zinc").toLowerCase();
