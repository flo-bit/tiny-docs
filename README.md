# Tiny docs

## How to use

1. Enable github pages in the repo settings. Go to _SETTINGS &rarr; PAGES &rarr; SOURCE: Github Actions_

2. Add a new github action e.g. in `.github/workflows/deploy.yml` with the following content:

```yaml
name: Deploy Docs

on:
    push:
        branches: [main]
    workflow_dispatch:

permissions:
    contents: read
    pages: write
    id-token: write

jobs:
    docs:
        uses: flo-bit/tiny-docs/.github/workflows/tiny-docs.yml@release/v1
```

3. Run the workflow manually or push to the main branch, after a minute or two your docs should be live at `https://<yourusername>.github.io/<yourrepo>`.