# Configuration

Add a `tdocs.config.json` file to the root of your repo to override defaults:

```json
{
  "SITE_NAME": "My Project",
  "SITE_DESCRIPTION": "A short description",
  "BASE_COLOR": "zinc",
  "ACCENT_COLOR": "emerald",
  "SEARCH_ENABLED": true,
  "SHOW_THEME_TOGGLE": true,
  "EXCLUDE_README": false,
  "REPLACE_README_WITH_TITLE": "Introduction",
  "GITHUB_URL": "https://github.com/you/your-repo"
}
```

All fields are optional. Socials: `TWITTER_URL`, `BLUESKY_URL`, `DISCORD_URL`, `YOUTUBE_URL`, `LINKEDIN_URL`, `FACEBOOK_URL`, `EMAIL`.

See [`config.type.ts`](../config.type.ts) for the full list.

## File ordering and categories

- Prefix a filename with digits + dash to control order, e.g. `01-intro.md`, `02-setup.md`. The prefix is stripped from the URL.
- Put files in a subfolder to group them under a sidebar category, e.g. `docs/guide/01-install.md` → category "guide".
