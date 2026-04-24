# Internal links

Links between your markdown files need to match how tiny-docs builds URLs, or they'll 404 in the deployed site.

## The rules

- Write links to the **actual file path**, with the `.md` (or `.mdx`) extension.
- Paths may be relative (`./foo.md`, `../bar.md`) or absolute from the repo root (`/docs/foo.md`).
- Numeric prefixes (`01-`, `02-`) are stripped from the URL but must stay in the link.
- All URLs are lowercased.
- `README.md` maps to `/`.

## Examples

Given this layout:

```
README.md
docs/
  01-getting-started.md
  guide/
    01-install.md
    02-usage.md
```

From `docs/guide/01-install.md`:

```md
[Getting started](../01-getting-started.md)   → /docs/getting-started
[Usage](./02-usage.md)                         → /docs/guide/usage
[Home](/README.md)                             → /
```

## Common pitfalls

- **Don't omit the extension.** `[link](../getting-started)` won't resolve — write `[link](../getting-started.md)`.
- **Don't hand-craft the final URL.** Writing `[link](/docs/guide/usage)` skips the rewriter and breaks when `BASE` is set (project pages served under `/<repo>/`). Link to the file.
- **Anchors work normally.** `[section](./usage.md#install)` is fine.
- **External links** (starting with `http`) are left untouched and open in a new tab.
