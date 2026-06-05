import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeHighlightLite from "./rehype-highlight-lite";
// Syntax-highlight theme for fenced code blocks.
import "highlight.js/styles/github-dark.css";

const schema = {
  ...defaultSchema,
  tagNames: [
    ...(defaultSchema.tagNames ?? []),
    "span", "mark", "u", "sub", "sup", "ins", "del", "font",
  ],
  attributes: {
    ...defaultSchema.attributes,
    "*": [...(defaultSchema.attributes?.["*"] ?? []), "style", "className", "class"],
    img: [
      ...(defaultSchema.attributes?.img ?? []),
      "width", "height", "style", "loading", "className", "class",
    ],
    a: [...(defaultSchema.attributes?.a ?? []), "target", "rel"],
    font: ["color"],
  },
};

/** `<pre>` wrapper that adds a hover-revealed copy button. */
const CodeBlock = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLPreElement>) => {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = preRef.current?.textContent ?? "";
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative group my-4">
      <pre ref={preRef} {...props} className="my-0!">
        {children}
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy code"}
        className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-150 flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium bg-gray-700/80 hover:bg-gray-600 text-gray-200 border border-white/10 backdrop-blur-sm select-none"
      >
        {copied ? (
          <>
            <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Copied!
          </>
        ) : (
          <>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            Copy
          </>
        )}
      </button>
    </div>
  );
};

interface MarkdownRendererProps {
  /** Raw markdown text (e.g. authored in Obsidian). May contain safe inline HTML. */
  content: string;
  /**
   * Tailwind classes for the wrapper. Defaults to a typography-styled,
   * theme-aware block. Call sites can override fully.
   */
  className?: string;
}

const MarkdownRenderer = ({
  content,
  className = "prose dark:prose-invert max-w-none prose-pre:bg-transparent prose-pre:p-0",
}: MarkdownRendererProps) => {
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, [rehypeSanitize, schema], rehypeHighlightLite]}
        components={{ pre: CodeBlock }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
