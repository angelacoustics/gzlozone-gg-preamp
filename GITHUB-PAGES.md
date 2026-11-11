# Publish these docs on GitHub Pages

**GZLOZONE GG Preamp** — Rozenblit grounded-grid (GG) line stage + matching PSU.

The static site is generated into the **`docs/`** folder.

**Repo:** https://github.com/angelacoustics/gzlozone-gg-preamp

## 2. Build the site locally (after doc edits)

```powershell
npm install
npm run build:pages
```

That refreshes `docs/` from the Markdown sources (BUILD.md, READMEs, photos, etc.). Then commit and push.

## 3. Turn on GitHub Pages

1. Open the repo → **Settings** → **Pages**.
2. Under **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: **`main`**
   - Folder: **`/docs`**
3. Save. Wait 1–2 minutes.

## 4. Share the URL

Site URL (after Pages is enabled):

`https://angelacoustics.github.io/gzlozone-gg-preamp/`

Phone-friendly start pages:

- Home: `/`
- Workshop guide: `/BUILD.html`
- Star ground deep dive: `/marantz-7-vs-gg-reference.html`

## Notes

- The site is **public**.
- After editing Markdown or photos, run `npm run build:pages`, then commit and push again.
- Hostnet / `indrisoftware.nl` is not involved.
