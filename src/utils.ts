export function removeNumbersAtBeginningOfString(str?: string) {
  if (!str) return str;
  return str.replace(/^[0-9]+-/g, "");
}

export function turnIdIntoSlug(id: string) {
  // splice by /
  let parts = id.split("/");
  // for every part, if it starts with any number (Can be multiple digits) + -, remove it
  parts = parts.map((part) => removeNumbersAtBeginningOfString(part) ?? "");
  // join parts by /
  return parts.join("/");
}
