# Customizing

For bigger changes (styling, new components, custom embeds), vendor tiny-docs into your repo as `docs-builder/`:

```bash
git clone --depth 1 --branch v1 https://github.com/flo-bit/tiny-docs docs-builder
rm -rf docs-builder/.git
```

The workflow auto-detects `docs-builder/` and uses it instead of the upstream copy. Edit anything under `docs-builder/src/` and commit — your fork ships on the next push.

## Adding a custom component to markdown

1. Create a component, e.g. `docs-builder/src/embeds/my-thing/MyThing.astro`.
2. Register it in `docs-builder/astro.config.ts`:

   ```ts
   customEmbeds({
     embeds: [
       // ...existing
       {
         componentName: "MyThing",
         directiveName: "mything",
         importPath: "src/embeds/my-thing",
       },
     ],
   }),
   ```

3. Use it in any markdown file:

   ```md
   ::mything{label="hello" count=3}
   ```

Props on the directive are passed straight to the component. For URL-triggered embeds, add a `urlMatcher` — see [`src/embeds/youtube/embed.ts`](../src/embeds/youtube/embed.ts) for an example.

## Local development

```bash
npm install
npm run dev
```

Put markdown in `docs/` and a `README.md` at the repo root, same as the deployed setup.
