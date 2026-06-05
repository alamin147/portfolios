import { useRef, useState, type ReactNode } from "react";
import { toast } from "react-toastify";
import MarkdownRenderer from "@/components/shared/markdown-renderer";
import { adminToastOptions } from "../../lib/toast-options";

type Tab = "write" | "preview";

const STARTER = `# My Blog Title

Write your post in **Markdown** — or paste it straight from Obsidian.

## A section

- Bullet points
- **Bold** and _italic_
- [Links](https://example.com)
- Colored text: <span style="color: #ef4444">like this</span>

![alt text](https://picsum.photos/800/400)

\`\`\`js
console.log("Code blocks are syntax-highlighted");
\`\`\`

> Blockquotes look great too.
`;

const PRESET_COLORS = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#3b82f6",
  "#a855f7",
  "#ec4899",
  "#00ffff"
];

const fieldClass =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

/** Split on spaces/commas, drop a leading '#', trim, and de-duplicate. */
const parseTags = (input: string): string[] =>
  Array.from(
    new Set(
      input
        .split(/[\s,]+/)
        .map((t) => t.replace(/^#+/, "").trim())
        .filter(Boolean)
    )
  );

const ToolBtn = ({
  onClick,
  title,
  children,
}: {
  onClick: () => void;
  title: string;
  children: ReactNode;
}) => (
  <button
    type="button"
    title={title}
    onClick={onClick}
    className="min-w-8 h-8 px-2 flex items-center justify-center text-sm font-medium rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600"
  >
    {children}
  </button>
);

const MarkdownEditor = () => {
  const [tab, setTab] = useState<Tab>("write");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [shortDes, setShortDes] = useState("");
  const [readTime, setReadTime] = useState("");
  const [tags, setTags] = useState("");
  const [markdown, setMarkdown] = useState(STARTER);

  /** Restore focus + selection after a state-driven textarea update. */
  const restoreSelection = (start: number, length: number) => {
    requestAnimationFrame(() => {
      const ta = textareaRef.current;
      if (!ta) return;
      ta.focus();
      ta.setSelectionRange(start, start + length);
    });
  };

  /** Wrap the current selection (or a placeholder) with `before`/`after`. */
  const surround = (before: string, after = before, placeholder = "text") => {
    const ta = textareaRef.current;
    if (!ta) return;
    const { selectionStart: s, selectionEnd: e } = ta;
    const selected = markdown.slice(s, e) || placeholder;
    setMarkdown(markdown.slice(0, s) + before + selected + after + markdown.slice(e));
    restoreSelection(s + before.length, selected.length);
  };

  /** Prepend `prefix` to the start of the current line (headings, lists, quotes). */
  const prefixLine = (prefix: string) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const s = ta.selectionStart;
    const lineStart = markdown.lastIndexOf("\n", s - 1) + 1;
    setMarkdown(markdown.slice(0, lineStart) + prefix + markdown.slice(lineStart));
    restoreSelection(s + prefix.length, 0);
  };

  /** Insert text at the cursor, replacing any active selection. */
  const insertAtSelection = (text: string, selectLen = 0) => {
    const ta = textareaRef.current;
    const s = ta ? ta.selectionStart : markdown.length;
    const e = ta ? ta.selectionEnd : markdown.length;
    setMarkdown(markdown.slice(0, s) + text + markdown.slice(e));
    restoreSelection(s + text.length - selectLen, selectLen);
  };

  const applyColor = (color: string) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const { selectionStart: s, selectionEnd: e } = ta;
    const selected = markdown.slice(s, e) || "text";
    const open = `<span style="color: ${color}">`;
    setMarkdown(markdown.slice(0, s) + open + selected + `</span>` + markdown.slice(e));
    restoreSelection(s + open.length, selected.length);
  };

  const insertLink = () => {
    const url = window.prompt("Link URL:");
    if (!url) return;
    const ta = textareaRef.current;
    const s = ta ? ta.selectionStart : markdown.length;
    const e = ta ? ta.selectionEnd : markdown.length;
    const selected = markdown.slice(s, e) || "link text";
    insertAtSelection(`[${selected}](${url})`);
  };

  const insertImage = () => {
    const url = window.prompt("Image URL:");
    if (!url) return;
    const alt = window.prompt("Alt text (optional):") || "";
    const width = (window.prompt("Width in px (optional, blank = natural):") || "").trim();
    const snippet = width
      ? `<img src="${url}" alt="${alt}" width="${width}" />`
      : `![${alt}](${url})`;
    insertAtSelection(`\n${snippet}\n`);
  };

  const reset = () => {
    setTitle("");
    setCategory("");
    setImgUrl("");
    setShortDes("");
    setReadTime("");
    setTags("");
    setMarkdown("");
    setTab("write");
  };

  const handlePublish = async () => {
    if (!title.trim()) return toast.error("Please enter a title!", adminToastOptions);
    if (!category.trim()) return toast.error("Please enter a category!", adminToastOptions);
    if (!markdown.trim()) return toast.error("Please write some content!", adminToastOptions);

    const now = new Date();
    const trimmedReadTime = readTime.trim();
    const blogData = {
      title: title.trim(),
      category: category.trim(),
      imgUrl: imgUrl.trim(),
      shortDes: shortDes.trim(),
      markdown,
      readTime: /^\d+$/.test(trimmedReadTime)
        ? `${trimmedReadTime} min read`
        : trimmedReadTime || "5 min read",
      tags: parseTags(tags),
      time: now,
      no: now.getTime(),
      author: "Al Amin",
    };

    setIsSubmitting(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/blog`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });
      const result = await res.json();
      if (result?.acknowledged === true || result?.insertedId) {
        toast.success("Blog published successfully!", adminToastOptions);
        reset();
      } else {
        toast.error("Failed to publish blog.", adminToastOptions);
      }
    } catch (error) {
      console.error("Error publishing blog:", error);
      toast.error("Network error. Please try again.", adminToastOptions);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="bg-slate-400 text-center py-12 text-3xl font-bold rounded-lg mb-6">
        Markdown Blog Editor
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        {/* Metadata fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={fieldClass}
              placeholder="Enter blog title"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Category *
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={fieldClass}
              placeholder="e.g. React, DevOps"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Read time
            </label>
            <input
              type="text"
              value={readTime}
              onChange={(e) => setReadTime(e.target.value)}
              className={fieldClass}
              placeholder="e.g. 5 (becomes '5 min read')"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Image URL
            </label>
            <input
              type="text"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              className={fieldClass}
              placeholder="Cover image URL"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Short Description
            </label>
            <input
              type="text"
              value={shortDes}
              onChange={(e) => setShortDes(e.target.value)}
              className={fieldClass}
              placeholder="One-line summary shown in cards"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Tags
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className={fieldClass}
              placeholder="react node web  (spaces or commas)"
            />
            {parseTags(tags).length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {parseTags(tags).map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-blue-700 bg-blue-100 dark:text-blue-300 dark:bg-blue-900/40"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Write / Preview tabs */}
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-700 mb-4">
          {(["write", "preview"] as Tab[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm font-medium capitalize -mb-px border-b-2 ${
                tab === t
                  ? "border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "write" ? (
          <>
            {/* Formatting toolbar */}
            <div className="flex flex-wrap items-center gap-1 mb-2">
              <ToolBtn onClick={() => surround("**")} title="Bold">
                <strong>B</strong>
              </ToolBtn>
              <ToolBtn onClick={() => surround("_")} title="Italic">
                <em>I</em>
              </ToolBtn>
              <ToolBtn onClick={() => prefixLine("## ")} title="Heading">
                H
              </ToolBtn>
              <ToolBtn onClick={() => surround("`")} title="Inline code">
                {"</>"}
              </ToolBtn>
              <ToolBtn onClick={() => prefixLine("> ")} title="Quote">
                &ldquo;
              </ToolBtn>
              <ToolBtn onClick={() => prefixLine("- ")} title="Bullet list">
                &bull;
              </ToolBtn>
              <ToolBtn onClick={insertLink} title="Link">
                Link
              </ToolBtn>
              <ToolBtn onClick={insertImage} title="Insert image">
                Image
              </ToolBtn>

              <span className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

              {PRESET_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  title={`Color ${c}`}
                  onClick={() => applyColor(c)}
                  className="w-6 h-6 rounded border border-gray-300 dark:border-gray-600"
                  style={{ backgroundColor: c }}
                />
              ))}
              <label
                className="inline-flex items-center cursor-pointer ml-1"
                title="Custom color"
              >
                <input
                  type="color"
                  onChange={(e) => applyColor(e.target.value)}
                  className="w-7 h-7 p-0 bg-transparent border-0 cursor-pointer"
                />
              </label>
            </div>

            <textarea
              ref={textareaRef}
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              spellCheck={false}
              className={`${fieldClass} font-mono leading-relaxed`}
              style={{ minHeight: "420px" }}
              placeholder="Write Markdown here, or paste from Obsidian…"
            />
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Tip: select text first, then click a color swatch or a format button.
              Images and colored text show up in the Preview tab.
            </p>
          </>
        ) : (
          <div
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-900 overflow-auto"
            style={{ minHeight: "420px" }}
          >
            {markdown.trim() ? (
              <MarkdownRenderer
                content={markdown}
                className="prose max-w-none dark:prose-invert prose-pre:bg-transparent prose-pre:p-0"
              />
            ) : (
              <p className="text-gray-400">Nothing to preview yet.</p>
            )}
          </div>
        )}

        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={reset}
            disabled={isSubmitting}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 disabled:opacity-50"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={handlePublish}
            disabled={isSubmitting || !title.trim() || !category.trim() || !markdown.trim()}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Publishing…" : "Publish"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;
