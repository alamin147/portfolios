import { visit } from "unist-util-visit";
import { toText } from "hast-util-to-text";
import { createLowlight } from "lowlight";

// Curated language set — only what a full-stack blog actually uses. This keeps
// the markdown chunk small (vs. rehype-highlight, which bundles ~37 "common"
// languages because it statically imports lowlight's `common`).
import bash from "highlight.js/lib/languages/bash";
import css from "highlight.js/lib/languages/css";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import markdown from "highlight.js/lib/languages/markdown";
import plaintext from "highlight.js/lib/languages/plaintext";
import python from "highlight.js/lib/languages/python";
import sql from "highlight.js/lib/languages/sql";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";

const lowlight = createLowlight({
  bash,
  css,
  javascript,
  json,
  markdown,
  plaintext,
  python,
  sql,
  typescript,
  xml,
});

// Map common fence aliases to a registered grammar.
const ALIASES: Record<string, string> = {
  js: "javascript",
  jsx: "javascript",
  node: "javascript",
  ts: "typescript",
  tsx: "typescript",
  sh: "bash",
  shell: "bash",
  zsh: "bash",
  console: "bash",
  html: "xml",
  svg: "xml",
  py: "python",
  md: "markdown",
  text: "plaintext",
  txt: "plaintext",
};

function languageOf(node: any): string | undefined {
  const className = node?.properties?.className;
  const list = Array.isArray(className) ? className : [];
  for (const c of list) {
    if (typeof c === "string" && c.startsWith("language-")) {
      return c.slice("language-".length).toLowerCase();
    }
  }
  return undefined;
}

/**
 * Minimal rehype plugin that syntax-highlights fenced code blocks using a
 * fixed, small set of languages. Drop-in replacement for rehype-highlight for
 * our needs. Runs after sanitize, so the highlight spans it adds are trusted.
 */
export default function rehypeHighlightLite() {
  return (tree: any) => {
    visit(tree, "element", (node: any, _index: number | undefined, parent: any) => {
      if (node.tagName !== "code" || !parent || parent.tagName !== "pre") {
        return;
      }

      // Always tag code blocks so the hljs theme background applies.
      const className: any[] = Array.isArray(node.properties?.className)
        ? node.properties.className
        : [];
      if (!className.includes("hljs")) className.push("hljs");
      node.properties = { ...(node.properties || {}), className };

      const raw = languageOf(node);
      const lang = raw ? ALIASES[raw] ?? raw : undefined;
      if (!lang || !lowlight.registered(lang)) return;

      const code = toText(node, { whitespace: "pre" });
      const result = lowlight.highlight(lang, code);
      node.children = result.children;
    });
  };
}
