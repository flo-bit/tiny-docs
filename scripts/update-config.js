import fs from "node:fs";

const CONFIG_PATH = "docs/config.json";

// Defaults derived from workflow env
const derived = {
  SITE: process.env.DERIVED_SITE,
  BASE: process.env.DERIVED_BASE,
  SITE_NAME: process.env.DERIVED_NAME,
};

function readExisting(path) {
  if (!fs.existsSync(path)) return {};
  try {
    const raw = fs.readFileSync(path, "utf8").trim() || "{}";
    return JSON.parse(raw);
  } catch (e) {
    console.warn(
      "⚠️ Invalid JSON in docs/config.json; continuing with empty object.",
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

fs.mkdirSync("docs", { recursive: true });
const existing = readExisting(CONFIG_PATH);

// Merge so existing values win; only fill in missing keys from derived
const merged = normalize({ ...derived, ...existing });

fs.writeFileSync(CONFIG_PATH, JSON.stringify(merged, null, 2) + "\n");
console.log(
  "✅ Wrote docs/config.json with keys:",
  Object.keys(merged).join(", "),
);

console.log("\n🔍 Result:\n" + fs.readFileSync(CONFIG_PATH, "utf8"));
