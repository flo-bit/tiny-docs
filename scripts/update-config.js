import fs from "node:fs";
import path from "node:path";

const CONFIG_PATH = "tdocs.config.json";

// Defaults derived from workflow env
const derived = {
  SITE: process.env.DERIVED_SITE,
  BASE: process.env.DERIVED_BASE,
  SITE_NAME: process.env.DERIVED_NAME,

  SHOW_THEME_TOGGLE: true,
  SEARCH_ENABLED: true,

  BASE_COLOR: "stone",
  ACCENT_COLOR: "rose",
};

function readExisting(path) {
  if (!fs.existsSync(path)) return {};
  try {
    const raw = fs.readFileSync(path, "utf8").trim() || "{}";
    return JSON.parse(raw);
  } catch (e) {
    console.warn(
      "⚠️ Invalid JSON in tdocs.config.json; continuing with empty object.",
    );
    return {};
  }
}

function normalize(merged) {
  if (
    typeof merged.BASE === "string" &&
    merged.BASE &&
    !merged.BASE.startsWith("/")
  ) {
    merged.BASE = "/" + merged.BASE;
  }
  return merged;
}

const existing = readExisting(CONFIG_PATH);

// Merge so existing values win; only fill in missing keys from derived
const merged = normalize({ ...derived, ...existing });

fs.writeFileSync(CONFIG_PATH, JSON.stringify(merged, null, 2) + "\n");
console.log(
  "✅ Wrote tdocs.config.json with keys:",
  Object.keys(merged).join(", "),
);

console.log("\n🔍 Result:\n" + fs.readFileSync(CONFIG_PATH, "utf8"));

function renameMdToMdx(dir = process.cwd()) {
  // Read all items in the current directory
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      // Recurse into subdirectories
      renameMdToMdx(fullPath);
    } else if (item.isFile() && path.extname(item.name) === ".md") {
      const newName = path.basename(item.name, ".md") + ".mdx";
      const newPath = path.join(dir, newName);

      fs.renameSync(fullPath, newPath);
      console.log(`Renamed: ${fullPath} → ${newPath}`);
    }
  }
}

// Run the function
renameMdToMdx();