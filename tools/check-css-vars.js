/**
 * Report CSS custom properties that are used but never defined.
 * Usage: node tools/check-css-vars.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(js|css|html|mjs)$/.test(e.name)) out.push(p);
  }
  return out;
}

const files = [...walk(path.join(ROOT, "src"))];
for (const n of ["style.css", "index.html", "sw.js"]) {
  if (fs.existsSync(path.join(ROOT, n))) files.push(path.join(ROOT, n));
}
const cssDir = path.join(ROOT, "css");
if (fs.existsSync(cssDir)) files.push(...walk(cssDir));

const defs = new Map(); // name -> [file:line]
const uses = new Map(); // name -> [{file,line,fallback}]

for (const f of files) {
  const src = fs.readFileSync(f, "utf8");
  const rel = path.relative(ROOT, f).replace(/\\/g, "/");
  for (const m of src.matchAll(/(--[\w-]+)\s*:/g)) {
    if (!defs.has(m[1])) defs.set(m[1], []);
    defs.get(m[1]).push(rel + ":" + src.slice(0, m.index).split(/\n/).length);
  }
  for (const m of src.matchAll(/var\(\s*(--[\w-]+)\s*([^)]*)\)/g)) {
    if (!uses.has(m[1])) uses.set(m[1], []);
    uses.get(m[1]).push({
      file: rel,
      line: src.slice(0, m.index).split(/\n/).length,
      fallback: m[2].trim().startsWith(","),
    });
  }
}

const missing = [...uses.entries()].filter(([n]) => !defs.has(n));
const dead = [...defs.keys()].filter((n) => !uses.has(n));

console.log("defined: " + defs.size + "   used: " + used_count() + "   undefined: " + missing.length);
function used_count() { return uses.size; }

console.log("\n--- used but never defined ---");
for (const [name, list] of missing) {
  const noFallback = list.filter((u) => !u.fallback);
  console.log("  " + name + "  (" + list.length + " use(s), " + noFallback.length + " without fallback)");
  for (const u of list) console.log("      " + u.file + ":" + u.line + (u.fallback ? "  [has fallback]" : "  [NO FALLBACK]"));
}

console.log("\n--- defined but never used ---");
for (const n of dead) console.log("  " + n + "  <- " + defs.get(n).join(", "));

process.exitCode = missing.some(([, l]) => l.some((u) => !u.fallback)) ? 1 : 0;
