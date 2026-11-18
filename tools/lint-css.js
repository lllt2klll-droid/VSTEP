/**
 * CSS quality gate for miumiuiuem.
 *
 * Scans every stylesheet that reaches the browser (css/*.css) plus
 * CSS embedded in JS (style.cssText / style.textContent assignments).
 *
 * Checks:
 *   1. balanced braces / unterminated comments
 *   2. duplicate declarations inside one block (the first one silently loses)
 *   3. empty declarations ("color: ;")
 *   4. var(--x) that is never defined and has no fallback
 *   5. properties that are one typo away from a real CSS property
 *
 * Usage: node tools/lint-css.js [--json]
 * Exit code 1 when problems are found.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const asJson = process.argv.includes("--json");

// ---------------------------------------------------------------------------
// Files
// ---------------------------------------------------------------------------
function collectCssFiles() {
  const out = [];
  const cssDir = path.join(ROOT, "css");
  if (fs.existsSync(cssDir)) {
    for (const n of fs.readdirSync(cssDir).sort()) {
      if (n.endsWith(".css")) out.push(path.join(cssDir, n));
    }
  }
  const legacy = path.join(ROOT, "style.css");
  if (fs.existsSync(legacy)) out.push(legacy);
  return out;
}

function walkJs(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walkJs(p, out);
    else if (e.name.endsWith(".js")) out.push(p);
  }
  return out;
}

const problems = [];
function problem(file, line, kind, text) {
  problems.push({ file: path.relative(ROOT, file).replace(/\\/g, "/"), line, kind, text });
}

// ---------------------------------------------------------------------------
// Known properties - typo detection only (unknown-but-plausible names are
// ignored so new/experimental properties do not create noise).
// ---------------------------------------------------------------------------
const KNOWN = new Set(`
align-content align-items align-self all animation animation-delay animation-direction
animation-duration animation-fill-mode animation-iteration-count animation-name
animation-play-state animation-timing-function appearance aspect-ratio backdrop-filter
background background-attachment background-clip background-blend-mode background-color
background-image background-origin background-position background-repeat background-size
border border-block border-block-end border-block-start border-bottom border-bottom-color
border-bottom-left-radius border-bottom-right-radius border-bottom-style border-bottom-width
border-collapse border-color border-image border-inline border-inline-end border-inline-start
border-left border-left-color border-left-style border-left-width border-radius border-right
border-right-color border-right-style border-right-width border-spacing border-style
border-top border-top-color border-top-left-radius border-top-right-radius border-top-style
border-top-width border-width bottom box-shadow box-sizing break-inside caret-color clear
clip clip-path clip-rule color color-scheme column-count column-gap column-rule column-width
columns contain contain-intrinsic-size content content-visibility cursor direction display
empty-cols empty-cells fill fill-opacity filter flex flex-basis flex-direction flex-flow
flex-grow flex-shrink flex-wrap float font font-family font-feature-settings font-size
font-size-adjust font-stretch font-style font-variant font-variant-numeric font-variation-settings
font-weight forced-color-adjust gap grid grid-area grid-auto-columns grid-auto-flow
grid-auto-rows grid-column grid-column-end grid-column-start grid-row grid-row-end
grid-row-start grid-template grid-template-areas grid-template-columns grid-template-rows
height hyphens image-rendering inset inset-block inset-block-end inset-block-start
inset-inline inset-inline-end inset-inline-start isolation justify-content justify-items
justify-self left letter-spacing line-height line-clamp list-style list-style-image
list-style-position list-style-type margin margin-block margin-bottom margin-inline
margin-inline-end margin-inline-start margin-left margin-right margin-top mask mask-image
mask-composite max-height max-width min-block-size min-height min-inline-size min-width
mix-blend-mode object-fit object-position opacity order outline outline-color outline-offset
outline-style outline-width overflow overflow-anchor overflow-wrap overflow-x overflow-y
overscroll-behavior overscroll-behavior-x overscroll-behavior-y padding padding-block
padding-block-end padding-block-start padding-bottom padding-inline padding-inline-end
padding-inline-start padding-left padding-right padding-top perspective place-content
place-items place-self pointer-events position print-color-adjust quotes resize right rotate
row-gap scale scroll-behavior scroll-margin scroll-padding scroll-snap-align
scroll-snap-type scroll-timeline scrollbar-color scrollbar-gutter scrollbar-width
shape-outside stroke stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin
stroke-width tab-size table-layout text-align text-align-last text-decoration
text-decoration-color text-decoration-line text-decoration-style text-decoration-thickness
text-indent text-overflow text-shadow text-transform text-underline-offset text-wrap
text-wrap-mode text-wrap-style top touch-action transform transform-origin transform-style
transition transition-delay transition-duration transition-property transition-timing-function
translate unicode-bidi user-select vertical-align visibility white-space widows width
will-change word-break word-spacing word-wrap writing-mode z-index zoom
`.trim().split(/\s+/).filter(Boolean));

function editDistanceAtMostTwo(a, b) {
  if (Math.abs(a.length - b.length) > 2) return false;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
    if (Math.min(...prev) > 2) return false;
  }
  return prev[b.length] <= 2;
}

function looksLikeTypo(prop) {
  for (const k of KNOWN) {
    if (editDistanceAtMostTwo(prop, k)) return true;
  }
  return false;
}

// ---------------------------------------------------------------------------
// Sanitizer: blank out comments and strings but keep offsets/line numbers.
// ---------------------------------------------------------------------------
function sanitize(css) {
  let out = "";
  let i = 0;
  while (i < css.length) {
    const c = css[i];
    if (c === "/" && css[i + 1] === "*") {
      const end = css.indexOf("*/", i + 2);
      const stop = end === -1 ? css.length : end + 2;
      out += " ".repeat(stop - i);
      i = stop;
      continue;
    }
    if (c === "/" && css[i + 1] === "/") {
      const end = css.indexOf("\n", i);
      const stop = end === -1 ? css.length : end;
      out += " ".repeat(stop - i);
      i = stop;
      continue;
    }
    if (c === '"' || c === "'") {
      let j = i + 1;
      while (j < css.length && css[j] !== c) {
        if (css[j] === "\\") j++;
        j++;
      }
      out += c + " ".repeat(Math.max(0, j - i - 1)) + c;
      i = j + 1;
      continue;
    }
    out += c;
    i++;
  }
  return out;
}

function lineOf(text, index, offset = 1) {
  let line = offset;
  for (let i = 0; i < index && i < text.length; i++) if (text[i] === "\n") line++;
  return line;
}

// ---------------------------------------------------------------------------
// Checks
// ---------------------------------------------------------------------------
function checkBalance(file, raw, offset, css) {
  let depth = 0;
  for (let i = 0; i < css.length; i++) {
    if (css[i] === "{") depth++;
    else if (css[i] === "}") {
      depth--;
      if (depth < 0) problem(file, lineOf(raw, i, offset), "brace", "unexpected '}'");
    }
  }
  if (depth > 0) problem(file, lineOf(raw, raw.length - 1, offset), "brace", depth + " unclosed '{'");
  if ((raw.match(/\/\*/g) || []).length !== (raw.match(/\*\//g) || []).length) {
    problem(file, lineOf(raw, 0, offset), "comment", "unterminated CSS comment");
  }
}

function checkBlocks(file, raw, css, offset) {
  const re = /([^{}]+)\{/g;
  let m;
  while ((m = re.exec(css))) {
    const selector = m[1].trim().replace(/\s+/g, " ");
    if (selector.startsWith("@")) continue; // at-rule prelude, not a declaration block
    const bodyStart = m.index + m[0].length;
    const bodyEnd = css.indexOf("}", bodyStart);
    if (bodyEnd === -1) continue;
    const body = css.slice(bodyStart, bodyEnd);

    const decls = [];
    const dre = /([-\w]+)\s*:\s*([^;{}]*)(;|$)/g;
    let d;
    while ((d = dre.exec(body))) {
      decls.push({ prop: d[1].toLowerCase(), value: d[2].trim(), at: bodyStart + d.index });
    }

    const seen = new Map();
    for (const dec of decls) {
      const line = lineOf(raw, dec.at, offset);
      if (!dec.value) {
        problem(file, line, "empty-value", selector.slice(0, 70) + " { " + dec.prop + ": }");
      }
      if (seen.has(dec.prop)) {
        const first = seen.get(dec.prop);
        if (first.value !== dec.value) {
          problem(
            file,
            line,
            "duplicate-decl",
            selector.slice(0, 60) + " { " + dec.prop + ": " + first.value.slice(0, 36) +
              " } then { " + dec.prop + ": " + dec.value.slice(0, 36) + " }"
          );
        }
      } else {
        seen.set(dec.prop, dec);
      }
      if (!dec.prop.startsWith("--") && !KNOWN.has(dec.prop) && looksLikeTypo(dec.prop)) {
        problem(file, line, "property-typo", dec.prop + " in " + selector.slice(0, 60));
      }
    }
  }
}

function collectDefinitions(cssTexts) {
  const defs = new Set();
  for (const css of cssTexts) for (const m of css.matchAll(/(--[\w-]+)\s*:/g)) defs.add(m[1]);
  return defs;
}

function checkVars(file, raw, css, offset, defs) {
  for (const m of css.matchAll(/var\(\s*(--[\w-]+)\s*(,([^)]*))?\)/g)) {
    if (!defs.has(m[1]) && m[2] === undefined) {
      problem(file, lineOf(raw, m.index, offset), "undefined-var", m[1]);
    }
  }
}

// CSS embedded in JS: style.cssText = `...` / style.textContent = `...`
function collectJsChunks(file, raw) {
  const chunks = [];
  const re = /(?:\.cssText\s*=\s*|\.textContent\s*=\s*)(["'`])((?:\\.|(?!\1)[\s\S])*)\1/g;
  let m;
  while ((m = re.exec(raw))) {
    chunks.push({ text: m[2], index: m.index, line: lineOf(raw, m.index) });
  }
  return chunks;
}

/**
 * Every `document.createElement('style')` must be guarded (an id or a flag),
 * otherwise the same rules are appended again on every render and the
 * stylesheet grows without bound.
 */
function checkStyleInjection(file, raw) {
  const lines = raw.split(/\r?\n/);
  lines.forEach((line, i) => {
    if (!/createElement\(\s*["']style["']\s*\)/.test(line)) return;
    const lookahead = lines.slice(i, i + 14).join("\n");
    const guarded = /style\.id\s*=|stylesAdded|StylesAdded|getElementById\(\s*["'][^"']*style|querySelector\(\s*["']style/.test(lookahead);
    if (!guarded) {
      problem(file, i + 1, "unguarded-style-injection", "createElement('style') without an id/guard");
    }
  });
}

// ---------------------------------------------------------------------------
function main() {
  const cssFiles = collectCssFiles();
  const jsFiles = walkJs(path.join(ROOT, "src"));
  if (fs.existsSync(path.join(ROOT, "index.html"))) jsFiles.unshift(path.join(ROOT, "index.html"));

  const cssSources = cssFiles.map((f) => {
    const raw = fs.readFileSync(f, "utf8");
    return { file: f, raw, css: sanitize(raw), offset: 1 };
  });

  const jsSources = [];
  for (const s of jsFiles) {
    const raw = fs.readFileSync(s, "utf8");
    checkStyleInjection(s, raw);
    const chunks = collectJsChunks(s, raw);
    if (chunks.length) jsSources.push({ file: s, raw, chunks });
  }

  const defs = collectDefinitions([
    ...cssSources.map((s) => s.css),
    ...jsSources.flatMap((s) => s.chunks.map((c) => c.text)),
  ]);

  for (const s of cssSources) {
    checkBalance(s.file, s.raw, 1, s.css);
    checkBlocks(s.file, s.raw, s.css, 1);
    checkVars(s.file, s.raw, s.css, 1, defs);
  }

  for (const s of jsSources) {
    for (const c of s.chunks) {
      const css = sanitize(c.text);
      checkBalance(s.file, c.text, c.line, css);
      checkBlocks(s.file, c.text, css, c.line);
      checkVars(s.file, c.text, css, c.line, defs);
    }
  }

  if (asJson) {
    console.log(JSON.stringify({
      problems,
      cssFiles: cssSources.map((s) => path.relative(ROOT, s.file).replace(/\\/g, "/")),
      variables: defs.size,
    }, null, 2));
    return problems.length ? 1 : 0;
  }

  console.log("CSS files   : " + cssSources.length + "  (" +
    cssSources.map((s) => path.relative(ROOT, s.file).replace(/\\/g, "/")).join(", ") + ")");
  console.log("JS w/ CSS   : " + jsSources.length);
  console.log("var() names : " + defs.size);
  console.log("");
  const byKind = new Map();
  for (const p of problems) byKind.set(p.kind, (byKind.get(p.kind) || 0) + 1);
  for (const [kind, n] of [...byKind].sort((a, b) => b[1] - a[1])) {
    console.log("  " + String(n).padStart(4) + "  " + kind);
  }
  console.log("");
  for (const p of problems) console.log(p.file + ":" + p.line + "  [" + p.kind + "] " + p.text);
  console.log("\nTOTAL PROBLEMS: " + problems.length);
  return problems.length ? 1 : 0;
}

process.exitCode = main();
