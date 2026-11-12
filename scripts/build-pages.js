/**
 * Build a static GitHub Pages site into /docs from project Markdown.
 * Run: npm run build:pages
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "docs");
let marked;

const MD_FILES = [
  "README.md",
  "BUILD.md",
  "preferences.md",
  "marantz-7-vs-gg-reference.md",
  "gg-pre-amp-schematic.md",
  "gg-pre-component-id.md",
  "gg-pre-pcb-reverse-engineering.md",
  "gg-psu-schematic.md",
  "gg-psu-component-id.md",
  "gg-psu-pcb-reverse-engineering.md",
  "gg-pre/README.md",
  "gg-psu/README.md",
  "gg-psu/transformer.md",
  "sketches/README.md",
];

const COPY_DIRS = ["pcb-photos", "sketches"];
const COPY_FILES = [
  "gg-pre-amp-schematic.svg",
  "gg-psu-schematic.svg",
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function rmrf(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
}

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  ensureDir(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) copyRecursive(from, to);
    else fs.copyFileSync(from, to);
  }
}

function mdPathToHtmlPath(relMd) {
  const norm = relMd.replace(/\\/g, "/");
  if (norm.toLowerCase() === "readme.md") return "index.html";
  if (norm.toLowerCase().endsWith("/readme.md")) {
    return norm.slice(0, -"README.md".length) + "index.html";
  }
  return norm.replace(/\.md$/i, ".html");
}

function rewriteMdLinks(html) {
  return html.replace(
    /href="([^"]+)\.md(#[^"]*)?"/gi,
    (_, base, hash = "") => {
      const cleaned = base.replace(/^\.\//, "");
      let target;
      if (/readme$/i.test(cleaned) || cleaned === "" || cleaned.endsWith("/")) {
        const dir = cleaned.replace(/readme$/i, "").replace(/\/$/, "");
        target = dir ? `${dir}/index.html` : "index.html";
      } else {
        target = `${cleaned}.html`;
      }
      return `href="${target}${hash}"`;
    }
  );
}

function promoteMermaid(html) {
  return html.replace(
    /<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g,
    (_, code) => {
      const decoded = code
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"');
      return `<div class="mermaid">${decoded}</div>`;
    }
  );
}

function pageTemplate({ title, bodyHtml, depth }) {
  const prefix = depth ? "../".repeat(depth) : "";
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <link rel="stylesheet" href="${prefix}assets/site.css" />
  <script defer src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
  <script defer src="${prefix}assets/site.js"></script>
</head>
<body>
  <header class="top">
    <a class="brand" href="${prefix}index.html">GZLOZONE GG Preamp</a>
    <nav>
      <a href="${prefix}index.html">Home</a>
      <a href="${prefix}BUILD.html">Build guide</a>
      <a href="${prefix}marantz-7-vs-gg-reference.html">Star ground</a>
    </nav>
  </header>
  <main class="doc">
${bodyHtml}
  </main>
  <footer class="foot">
    <p>GZLOZONE GG Preamp — Rozenblit grounded-grid line stage + PSU. ±200 V is lethal — work safely.</p>
  </footer>
</body>
</html>
`;
}

function titleFromMd(md, fallback) {
  const m = md.match(/^#\s+(.+)$/m);
  return m ? m[1].replace(/[*_`]/g, "") : fallback;
}

function buildOne(relMd) {
  const src = path.join(ROOT, relMd);
  if (!fs.existsSync(src)) {
    console.warn("skip missing", relMd);
    return;
  }
  const md = fs.readFileSync(src, "utf8");
  let body = marked.parse(md);
  body = rewriteMdLinks(body);
  body = promoteMermaid(body);

  const outRel = mdPathToHtmlPath(relMd);
  const outPath = path.join(OUT, outRel);
  ensureDir(path.dirname(outPath));
  const depth = outRel.split("/").length - 1;
  const title = titleFromMd(md, outRel);
  fs.writeFileSync(outPath, pageTemplate({ title, bodyHtml: body, depth }), "utf8");
  console.log("wrote", outRel);
}

function writeAssets() {
  ensureDir(path.join(OUT, "assets"));
  fs.writeFileSync(
    path.join(OUT, "assets", "site.css"),
    fs.readFileSync(path.join(__dirname, "site.css"), "utf8")
  );
  fs.writeFileSync(
    path.join(OUT, "assets", "site.js"),
    fs.readFileSync(path.join(__dirname, "site.js"), "utf8")
  );
  fs.writeFileSync(path.join(OUT, ".nojekyll"), "");
}

async function main() {
  ({ marked } = await import("marked"));
  rmrf(OUT);
  ensureDir(OUT);
  writeAssets();

  for (const dir of COPY_DIRS) {
    copyRecursive(path.join(ROOT, dir), path.join(OUT, dir));
    console.log("copied", dir);
  }
  for (const file of COPY_FILES) {
    const src = path.join(ROOT, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(OUT, file));
      console.log("copied", file);
    }
  }

  for (const rel of MD_FILES) buildOne(rel);

  console.log("\nDone. Publish the docs/ folder with GitHub Pages.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
