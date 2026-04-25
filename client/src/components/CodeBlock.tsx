/**
 * @saaskit — CodeBlock
 * Terminal-style code block with syntax highlighting via highlight.js
 */

import { useState, useEffect } from "react";
import { Copy, Check, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { useTranslation } from "react-i18next";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export function CodeBlock({ code, language = "tsx", filename, showLineNumbers = false, className }: CodeBlockProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [highlighted, setHighlighted] = useState("");

  useEffect(() => {
    try {
      const result = hljs.highlight(code.trim(), { language, ignoreIllegals: true });
      setHighlighted(result.value);
    } catch (e) {
      setHighlighted(code.trim());
    }
  }, [code, language]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split("\n");

  return (
    <div className={cn("rounded-lg border border-border overflow-hidden", className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-muted/20 border-b border-border">
        <div className="flex items-center gap-2">
          <Terminal className="h-3.5 w-3.5 text-muted-foreground" />
          {filename ? (
            <span className="text-xs font-mono text-muted-foreground">{filename}</span>
          ) : (
            <span className="text-xs font-mono text-muted-foreground">{language}</span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors p-1 rounded hover:bg-muted/50"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-primary" />
              <span className="text-primary">{t("components.apiKeyCard.copied", { defaultValue: "Copié" })}</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>{t("components.apiKeyCard.copy", { defaultValue: "Copier" })}</span>
            </>
          )}
        </button>
      </div>

      {/* Code with syntax highlighting */}
      <div className="bg-[oklch(0.08_0.005_270)] overflow-x-auto">
        <pre className="p-4 text-sm font-mono leading-relaxed">
          {showLineNumbers ? (
            lines.map((_, i) => (
              <div key={i} className="flex gap-4">
                <span className="select-none text-muted-foreground/40 w-6 text-right flex-shrink-0">
                  {i + 1}
                </span>
                <span
                  className="text-foreground/90 hljs"
                  dangerouslySetInnerHTML={{
                    __html: highlighted.split("\n")[i] || "",
                  }}
                />
              </div>
            ))
          ) : (
            <code
              className="hljs"
              dangerouslySetInnerHTML={{
                __html: highlighted,
              }}
            />
          )}
        </pre>
      </div>

      {/* CSS overrides for dark theme */}
      <style>{`
        .hljs {
          background: transparent !important;
          color: inherit !important;
        }
        .hljs-attr,
        .hljs-attribute {
          color: #7dd3fc;
        }
        .hljs-string {
          color: #86efac;
        }
        .hljs-number {
          color: #fbbf24;
        }
        .hljs-literal {
          color: #f87171;
        }
        .hljs-title,
        .hljs-title.class_,
        .hljs-title.function_ {
          color: #60a5fa;
        }
        .hljs-keyword {
          color: #d946ef;
        }
        .hljs-built_in {
          color: #fb923c;
        }
        .hljs-name {
          color: #93c5fd;
        }
        .hljs-type {
          color: #a78bfa;
        }
        .hljs-params {
          color: #e0e7ff;
        }
        .hljs-comment {
          color: #6b7280;
        }
        .hljs-tag {
          color: #f472b6;
        }
        .hljs-attr {
          color: #7dd3fc;
        }
        .hljs-punctuation {
          color: #d1d5db;
        }
      `}</style>
    </div>
  );
}

interface InstallBlockProps {
  command: string;
  className?: string;
}

export function InstallBlock({ command, className }: InstallBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "install-block cursor-pointer group",
        className
      )}
      onClick={handleCopy}
    >
      <code className="flex-1 text-foreground/90 font-mono text-sm">{command}</code>
      <button className="p-1 rounded hover:bg-white/10 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0">
        {copied ? (
          <Check className="h-3.5 w-3.5 text-primary" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </button>
    </div>
  );
}
