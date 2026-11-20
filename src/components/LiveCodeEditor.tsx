"use client";

import { useEffect, useState } from "react";
import { FiRotateCcw } from "react-icons/fi";

const files = [
  {
    name: "app.ts",
    language: "TypeScript",
    lines: [
      '"use client";',
      'import { useEffect, useState } from "react";',
      'import Link from "next/link";',
      'import { createClient } from "@supabase/supabase-js";',
      'const storage: "MySQL" | "Supabase" = "Supabase"; // Node.js API',
      "const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);",
      "export default function ProjectList() {",
      "  const [projects, setProjects] = useState<{ id: string; title: string }[]>([]);",
      "  useEffect(() => {",
      '    db.from("projects").select("id, title").then(({ data }) => setProjects(data ?? []));',
      "  }, []);",
      "  return <section data-storage={storage}>",
      '    <Link href="/projects">All work</Link>',
      "    {projects.map(({ id, title }) => <button key={id}>{title}</button>)}",
      "  </section>;",
      "}",
    ],
  },
  {
    name: "desktop.py",
    language: "Python",
    lines: [
      "import tkinter as tk",
      "from tkinter import ttk",
      "import sqlite3",
      "class ProjectDesk(tk.Tk):",
      "    def __init__(self):",
      "        super().__init__()",
      '        self.title("Project Desk")',
      '        self.geometry("520x360")',
      '        self.db = sqlite3.connect("projects.db")',
      '        self.items = ttk.Frame(self, padding=20); self.items.pack()',
      '        ttk.Label(self.items, text="Project library").pack(pady=18)',
      "        self.refresh()",
      "    def refresh(self):",
      '        rows = self.db.execute("SELECT title FROM projects").fetchall()',
      "        for (title,) in rows:",
      '            ttk.Label(self.items, text=title).pack(anchor="w")',
    ],
  },
] as const;

const keywordSet = new Set([
  "as",
  "class",
  "def",
  "export",
  "from",
  "function",
  "import",
  "in",
  "return",
  "type",
  "const",
  "useEffect",
  "if",
  "for",
]);

const typeSet = new Set(["Project", "ProjectDesk", "GET"]);
const functionSet = new Set([
  "ProjectList",
  "createClient",
  "fetch",
  "map",
  "refresh",
  "setProjects",
  "useEffect",
  "useState",
]);
const tokenPattern =
  /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\/\/.*|#[^\n]*|\b(?:as|class|const|def|export|for|from|function|if|import|in|return|type)\b|\b(?:Database|Project|ProjectDesk|GET)\b|\b(?:ProjectList|fetch|map|refresh|setProjects|useEffect|useState)\b)/g;

function getTokenClass(token: string) {
  if (/^["']/.test(token)) return "editor-token-string";
  if (token.startsWith("//") || token.startsWith("#")) {
    return "editor-token-comment";
  }
  if (keywordSet.has(token)) return "editor-token-keyword";
  if (typeSet.has(token)) return "editor-token-type";
  if (functionSet.has(token)) return "editor-token-function";
  return "editor-token-default";
}

function HighlightedLine({ text }: { text: string }) {
  return (
    <>
      {text.split(tokenPattern).map((part, index) =>
        part ? (
          <span key={index} className={getTokenClass(part)}>
            {part}
          </span>
        ) : null
      )}
    </>
  );
}

export default function LiveCodeEditor() {
  const [activeFile, setActiveFile] = useState(0);
  const [typedCharacters, setTypedCharacters] = useState(0);
  const [replayKey, setReplayKey] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const file = files[activeFile];
  const source = file.lines.join("\n");
  const typedSource = reducedMotion ? source : source.slice(0, typedCharacters);
  const typedLines = typedSource.split("\n");
  const activeLine = Math.min(typedLines.length - 1, file.lines.length - 1);
  const activeColumn = (typedLines[activeLine] ?? "").length + 1;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference.matches);
    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    let timer: ReturnType<typeof setTimeout>;
    if (typedCharacters >= source.length) {
      timer = setTimeout(() => {
        setActiveFile((current) => (current + 1) % files.length);
        setTypedCharacters(0);
      }, 1800);
    } else {
      const character = source[typedCharacters];
      const punctuationPause = "{}[]();".includes(character) ? 54 : 0;
      const naturalPause =
        character === "\n" ? 170 : character === " " && typedCharacters % 13 === 0 ? 90 : 0;
      const typingSpeed = 24 + ((typedCharacters * 7) % 29);
      timer = setTimeout(
        () => setTypedCharacters((count) => count + 1),
        Math.max(punctuationPause, naturalPause, typingSpeed)
      );
    }

    return () => clearTimeout(timer);
  }, [activeFile, reducedMotion, replayKey, source, typedCharacters]);

  const selectFile = (index: number) => {
    setActiveFile(index);
    setTypedCharacters(0);
    setReplayKey((key) => key + 1);
  };

  const replay = () => {
    setActiveFile(0);
    setTypedCharacters(0);
    setReplayKey((key) => key + 1);
  };

  return (
    <div
      className="editor-window"
      role="region"
      aria-label="Live code editor preview"
    >
      <div className="editor-topbar">
        <div className="editor-window-controls" aria-hidden="true">
          <span className="editor-control-active" />
          <span />
          <span />
        </div>

        <div className="editor-tabs" role="tablist" aria-label="Code samples">
          {files.map((sample, index) => (
            <button
              key={sample.name}
              type="button"
              role="tab"
              id={`editor-tab-${index}`}
              aria-controls="editor-tabpanel"
              aria-selected={activeFile === index}
              className={`editor-tab ${
                activeFile === index ? "editor-tab-active" : ""
              }`}
              onClick={() => selectFile(index)}
            >
              {sample.name}
            </button>
          ))}
        </div>

        <span className="editor-live-badge">
          <span className="editor-live-dot" />
          Live Coding
        </span>
      </div>

      <div
        id="editor-tabpanel"
        className="editor-code"
        role="tabpanel"
        aria-labelledby={`editor-tab-${activeFile}`}
        aria-live="off"
      >
        <div className="editor-gutter" aria-hidden="true">
          {file.lines.map((_, index) => (
            <span
              key={index}
              className={index === activeLine ? "editor-line-active" : ""}
            >
              {index + 1}
            </span>
          ))}
        </div>
        <pre key={activeFile} className="editor-code-content">
          <code>
            {file.lines.map((_, index) => {
              const isActive = index === activeLine;
              return (
                <span
                  key={index}
                  className={`editor-line ${
                    isActive ? "editor-line-current" : ""
                  }`}
                >
                  <span className="editor-line-text">
                    <HighlightedLine text={typedLines[index] ?? ""} />
                  </span>
                  {isActive && !reducedMotion && (
                    <span className="editor-cursor" aria-hidden="true" />
                  )}
                  {"\n"}
                </span>
              );
            })}
          </code>
        </pre>
      </div>

      <div className="editor-statusbar">
        <span className="editor-status-language">
          UTF-8 <span>·</span> TypeScript / Python
        </span>
        <span className="editor-position">
          Ln {activeLine + 1}, Col {activeColumn}
        </span>
        <button type="button" className="editor-replay" onClick={replay}>
          <FiRotateCcw aria-hidden="true" />
          Replay
        </button>
      </div>
    </div>
  );
}
