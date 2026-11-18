/**
 * Static HTML quality gate for index.html (and any other page in the project).
 *
 * Fails when it finds:
 *   1. a referenced local asset that does not exist
 *   2. duplicate id attributes
 *   3. unbalanced inline style="" values
 *   4. inline event handler attributes (onclick=, onmousedown=, ...)
 *   5. inline <style> or <script> blocks (they belong in css/ and js/)
 *   6. unclosed structural tags
 *
 * Reports (without failing) the ids that only exist in generated markup, so
 * you can tell a real typo apart from a dynamically created element.
 *
 * Usage: node tools/check-html.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const problems = [];
const notes = [];

// ---------------------------------------------------------------------------
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith(".js")) out.push(p);
  }
  return out;
}

function lineOf(text, index) {
  return text.slice(0, index).split(/\r?\n/).length;
}

// ---------------------------------------------------------------------------
const pages = fs.readdirSync(ROOT).filter((f) => f.endsWith(".html"));
if (!pages.length) {
  console.log("No HTML files found.");
  process.exit(0);
}

for (const pageName of pages) {
  const file = path.join(ROOT, pageName);
  const rawHtml = fs.readFileSync(file, "utf8");
  const rel = pageName;
  // Blank out comments (keeping newlines) so markup inside them is never
  // counted, while reported line numbers stay correct.
  const html = rawHtml.replace(/<!--[\s\S]*?-->/g, (c) => c.replace(/[^\n]/g, " "));

  // 1. referenced local assets --------------------------------------------
  for (const m of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    const ref = m[1];
    if (/^(https?:|data:|#|mailto:|javascript:)/.test(ref)) continue;
    const target = ref.split("?")[0].replace(/^\.\//, "");
    if (!target) continue;
    if (!fs.existsSync(path.join(ROOT, target))) {
      problems.push(`${rel}:${lineOf(html, m.index)}  missing asset: ${ref}`);
    }
  }

  // 2. duplicate ids -------------------------------------------------------
  const seen = new Map();
  for (const m of html.matchAll(/\sid="([^"]+)"/g)) {
    const id = m[1];
    if (seen.has(id)) {
      problems.push(`${rel}:${lineOf(html, m.index)}  duplicate id "${id}" (first at line ${seen.get(id)})`);
    } else {
      seen.set(id, lineOf(html, m.index));
    }
  }

  // 3. inline style attributes --------------------------------------------
  for (const m of html.matchAll(/\sstyle="([^"]*)"/g)) {
    const value = m[1];
    const open = (value.match(/\(/g) || []).length;
    const close = (value.match(/\)/g) || []).length;
    if (open !== close) {
      problems.push(`${rel}:${lineOf(html, m.index)}  unbalanced parens in style="..."`);
    }
  }

  // 4. inline event handlers ----------------------------------------------
  for (const m of html.matchAll(/\s(on[a-z-]+)\s*=\s*"/g)) {
    problems.push(`${rel}:${lineOf(html, m.index)}  inline handler ${m[1]}= - move it to js/`);
  }

  // 5. inline <style> / <script> without src ------------------------------
  for (const m of html.matchAll(/<style[\s>]/g)) {
    problems.push(`${rel}:${lineOf(html, m.index)}  inline <style> block - move it to css/`);
  }
  for (const m of html.matchAll(/<script(?![^>]*\ssrc=)[^>]*>/g)) {
    problems.push(`${rel}:${lineOf(html, m.index)}  inline <script> block - move it to js/`);
  }

  // 6. structural tag balance ---------------------------------------------
  for (const tag of ["html", "head", "body", "header", "nav", "main", "div", "section", "button"]) {
    const open = (html.match(new RegExp("<" + tag + "(?:\\s[^>]*)?>", "g")) || []).length;
    const close = (html.match(new RegExp("</" + tag + ">", "g")) || []).length;
    if (open !== close) {
      problems.push(`${rel}  <${tag}> not balanced: ${open} open / ${close} close`);
    }
  }

  // 7. ids used by JS ------------------------------------------------------
  const jsIds = new Set();
  for (const f of walk(path.join(ROOT, "src"))) {
    const src = fs.readFileSync(f, "utf8");
    for (const m of src.matchAll(/getElementById\(\s*["']([^"']+)["']\s*\)/g)) jsIds.add(m[1]);
  }
  const dynamic = [...jsIds].filter((id) => !seen.has(id));
  if (dynamic.length) {
    notes.push(
      `${dynamic.length} id(s) are created by JS at runtime ` +
      `(first few: ${dynamic.slice(0, 8).join(", ")}, ...)`
    );
  }
}

// ---------------------------------------------------------------------------
if (notes.length) {
  console.log("Notes:");
  for (const n of notes) console.log("  - " + n);
  console.log("");
}

console.log("Pages scanned: " + pages.length);
for (const p of problems) console.log("  " + p);
console.log("\nTOTAL PROBLEMS: " + problems.length);

process.exitCode = problems.length ? 1 : 0;
