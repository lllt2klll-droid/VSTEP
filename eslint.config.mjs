import js from "@eslint/js";
import globals from "globals";
import fs from "node:fs";
import path from "node:path";

// ---------------------------------------------------------------------------
// Collect cross-file globals.
// This app uses classic <script> tags (no bundler), so top-level declarations
// in one file are visible to every other file. ESLint treats each file in
// isolation, so we must register those shared names as known globals.
// ---------------------------------------------------------------------------
function walk(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.name.endsWith(".js")) out.push(p);
  }
  return out;
}

const sharedGlobals = new Set();
const sources = [];
for (const dir of ["src", "js"]) {
  const p = path.join(process.cwd(), dir);
  if (fs.existsSync(p)) sources.push(...walk(p));
}
const swPath = path.join(process.cwd(), "sw.js");
if (fs.existsSync(swPath)) sources.push(swPath);

for (const file of sources) {
  const src = fs.readFileSync(file, "utf8");
  // window.Foo = ...
  for (const m of src.matchAll(/\bwindow\.([A-Za-z_$][\w$]*)\s*=/g)) sharedGlobals.add(m[1]);
  // Top-level function / class / var / const declarations (column 0).
  for (const m of src.matchAll(/^(?:function|class|var|let|const)\s+([A-Za-z_$][\w$]*)/gm)) {
    sharedGlobals.add(m[1]);
  }
}

// Names ESLint/JS engines already know (built-ins) must not be redefined.
const reserved = new Set([
  ...Object.keys(globals.builtin),
  ...Object.keys(globals.node),
  "window", "self", "globalThis",
]);

const appGlobals = {};
for (const g of sharedGlobals) {
  if (reserved.has(g)) continue;
  appGlobals[g] = "writable";
}

// Extra browser APIs that the `globals.browser` set may omit for this codebase.
const extraBrowser = {
  MediaRecorder: "readonly",
  NodeFilter: "readonly",
  DOMParser: "readonly",
  XMLHttpRequest: "readonly",
  webkitSpeechRecognition: "readonly",
  SpeechRecognition: "readonly",
  caches: "readonly",
  onmessage: "writable",
  onerror: "writable",
};

export default [
  { ignores: ["node_modules/**", "src/data/**"] },
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "script",
      globals: {
        ...globals.browser,
        ...extraBrowser,
        ...appGlobals,
        // Deliberate shared app state / entry points.
        App: "writable",
        AppState: "writable",
        practiceTests: "writable",
        PracticeTestValidator: "writable",
      },
    },
    rules: {
      // Real defect classes: keep these as errors.
      "no-undef": "error",
      "no-dupe-keys": "error",
      "no-redeclare": ["error", { builtinGlobals: false }],
      "no-unused-vars": ["warn", {
        args: "none",
        caughtErrors: "none",
        varsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
      }],
      "no-empty": ["error", { allowEmptyCatch: true }],
      "no-self-assign": "error",
      "no-unreachable": "error",
      "no-async-promise-executor": "error",
      "no-misleading-character-class": "error",
      "no-unsafe-negation": "error",
      "no-unsafe-optional-chaining": "error",
      "use-isnan": "error",
      "valid-typeof": "error",
      "no-constant-condition": ["error", { checkLoops: false }],
      "no-cond-assign": ["error", "except-parens"],
      "no-func-assign": "error",
      "no-import-assign": "error",
      "no-obj-calls": "error",
      "no-promise-executor-return": "error",
      "no-template-curly-in-string": "error",
      "require-atomic-updates": "off",

      // Style / noise: not defects for this legacy codebase.
      "no-unused-expressions": "off",
      "no-console": "off",
      "no-empty-function": "off",
      // Auto-fixable: the fixer only strips escapes that provably do not
      // change the pattern/string meaning, so it is safe to keep enabled.
      "no-useless-escape": "error",
      "no-case-declarations": "off",
      "no-prototype-builtins": "off",
      "no-extra-boolean-cast": "off",
      "no-constant-binary-expression": "off",
      "no-inner-declarations": "off",
    },
  },
  {
    // Node based maintenance scripts: the project root and tools/ hold
    // one-off utilities that run under Node, not in the browser.
    files: ["*.js", "tools/**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: { ...globals.node },
    },
  },
  {
    // Service worker runs in a module-ish worker scope.
    files: ["sw.js"],
    languageOptions: {
      sourceType: "module",
      globals: { ...globals.serviceworker },
    },
  },
  {
    // Config / tooling files run under Node.
    files: ["*.mjs", "*.config.js", "eslint.config.mjs"],
    languageOptions: {
      sourceType: "module",
      globals: { ...globals.node },
    },
  },
];
