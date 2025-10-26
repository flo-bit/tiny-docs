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

declare const __PUBLIC_CONFIG__: Config;

export const config = __PUBLIC_CONFIG__;
