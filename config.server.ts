// config.server.ts
import { existsSync, readFileSync } from "node:fs";
import { resolve as r } from "node:path";

export type Config = {
  SITE?: string;
  BASE?: string;
  SITE_NAME?: string;
  SITE_DESCRIPTION?: string;
  SITE_FAVICON?: string;
  SHOW_THEME_TOGGLE?: boolean;
  SEARCH_ENABLED?: boolean;
  BASE_COLOR?: string;
  ACCENT_COLOR?: string;
  SOCIAL_LINKS?: {
    FACEBOOK_URL?: string;
    TWITTER_URL?: string;
    GITHUB_URL?: string;
    LINKEDIN_URL?: string;
    YOUTUBE_URL?: string;
    BLUESKY_URL?: string;
    DISCORD_URL?: string;
    EMAIL?: string;
  };
  EXCLUDE_README?: boolean;
};

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
  SOCIAL_LINKS: {
    FACEBOOK_URL: "",
    TWITTER_URL: "",
    GITHUB_URL: "",
    LINKEDIN_URL: "",
    YOUTUBE_URL: "",
    BLUESKY_URL: "",
    DISCORD_URL: "",
    EMAIL: "",
  },
  EXCLUDE_README: false,
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
