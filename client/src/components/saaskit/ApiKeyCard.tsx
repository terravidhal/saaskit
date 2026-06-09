"use client";

import { useState } from "react";
import { Eye, EyeOff, Copy, RefreshCw, Check, Key, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

type Lang = "en" | "fr";

interface ApiKeyCardLabels {
  revoke?: string;
  hideKey?: string;
  revealKey?: string;
  copyKey?: string;
  copied?: string;
  confirmRotation?: string;
  cancel?: string;
  confirm?: string;
  rotate?: string;
  createdOn?: string;
  lastUsed?: string;
  neverUsed?: string;
  envProduction?: string;
  envDevelopment?: string;
  envTest?: string;
}

const T: Record<Lang, Required<ApiKeyCardLabels>> = {
  en: {
    revoke: "Revoke",
    hideKey: "Hide key",
    revealKey: "Reveal key",
    copyKey: "Copy key",
    copied: "Key copied to clipboard",
    confirmRotation: "Confirm rotation?",
    cancel: "Cancel",
    confirm: "Confirm",
    rotate: "Rotate",
    createdOn: "Created on",
    lastUsed: "Last used:",
    neverUsed: "Never used",
    envProduction: "Production",
    envDevelopment: "Development",
    envTest: "Test",
  },
  fr: {
    revoke: "Révoquer",
    hideKey: "Masquer la clé",
    revealKey: "Révéler la clé",
    copyKey: "Copier la clé",
    copied: "Clé copiée dans le presse-papiers",
    confirmRotation: "Confirmer la rotation ?",
    cancel: "Annuler",
    confirm: "Confirmer",
    rotate: "Rotation",
    createdOn: "Créée le",
    lastUsed: "Dernière utilisation :",
    neverUsed: "Jamais utilisée",
    envProduction: "Production",
    envDevelopment: "Développement",
    envTest: "Test",
  },
};

interface ApiKeyCardProps {
  name: string;
  keyValue: string;
  prefix?: string;
  createdAt?: Date;
  lastUsedAt?: Date;
  onRotate?: () => Promise<void> | void;
  onCopy?: (key: string) => void;
  onRevoke?: () => void;
  environment?: "production" | "development" | "test";
  lang?: Lang;
  labels?: ApiKeyCardLabels;
  className?: string;
}

export function ApiKeyCard({
  name,
  keyValue,
  prefix,
  createdAt,
  lastUsedAt,
  onRotate,
  onCopy,
  onRevoke,
  environment = "production",
  lang = "en",
  labels,
  className,
}: ApiKeyCardProps) {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [rotating, setRotating] = useState(false);
  const [showRotateConfirm, setShowRotateConfirm] = useState(false);

  const base = T[lang];
  const L = {
    revoke: labels?.revoke ?? base.revoke,
    hideKey: labels?.hideKey ?? base.hideKey,
    revealKey: labels?.revealKey ?? base.revealKey,
    copyKey: labels?.copyKey ?? base.copyKey,
    copied: labels?.copied ?? base.copied,
    confirmRotation: labels?.confirmRotation ?? base.confirmRotation,
    cancel: labels?.cancel ?? base.cancel,
    confirm: labels?.confirm ?? base.confirm,
    rotate: labels?.rotate ?? base.rotate,
    createdOn: labels?.createdOn ?? base.createdOn,
    lastUsed: labels?.lastUsed ?? base.lastUsed,
    neverUsed: labels?.neverUsed ?? base.neverUsed,
    envProduction: labels?.envProduction ?? base.envProduction,
    envDevelopment: labels?.envDevelopment ?? base.envDevelopment,
    envTest: labels?.envTest ?? base.envTest,
  };

  const envConfig = {
    production: { label: L.envProduction, className: "bg-destructive/10 text-destructive border-destructive/25" },
    development: { label: L.envDevelopment, className: "bg-primary/10 text-primary border-primary/25" },
    test: { label: L.envTest, className: "bg-yellow-500/10 text-yellow-400 border-yellow-500/25" },
  };

  const locale = lang === "fr" ? "fr-FR" : "en-US";

  const maskedKey = keyValue
    ? `${keyValue.slice(0, prefix ? prefix.length + 4 : 8)}${"•".repeat(24)}${keyValue.slice(-4)}`
    : "••••••••••••••••••••••••••••••••";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(keyValue);
      setCopied(true);
      onCopy?.(keyValue);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleRotate = async () => {
    if (!showRotateConfirm) { setShowRotateConfirm(true); return; }
    setRotating(true);
    setShowRotateConfirm(false);
    try { await onRotate?.(); } finally {
      setRotating(false);
      setRevealed(false);
    }
  };

  return (
    <div className={cn("rounded-lg border border-border bg-card overflow-hidden", className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Key className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-semibold text-foreground">{name}</span>
          <span className={cn("text-xs font-semibold px-1.5 py-0.5 rounded border", envConfig[environment].className)}>
            {envConfig[environment].label}
          </span>
        </div>
        {onRevoke && (
          <button onClick={onRevoke} className="text-xs text-muted-foreground hover:text-destructive transition-colors">
            {L.revoke}
          </button>
        )}
      </div>

      {/* Key display */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-2 rounded-lg border border-primary bg-muted/30 px-4 py-3 font-mono text-sm group relative">
          <code className="flex-1 text-foreground font-mono text-sm overflow-hidden text-ellipsis whitespace-nowrap">
            {revealed ? keyValue : maskedKey}
          </code>
          <div className="flex items-center gap-1 ml-2 flex-shrink-0">
            <button
              onClick={() => setRevealed(!revealed)}
              className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={revealed ? L.hideKey : L.revealKey}
            >
              {revealed ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            </button>
            <button
              onClick={handleCopy}
              className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={L.copyKey}
            >
              {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
        {copied && <p className="text-xs text-primary mt-1.5">{L.copied}</p>}
      </div>

      {/* Metadata */}
      <div className="px-4 pb-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          {createdAt && (
            <span>
              {L.createdOn}{" "}
              {createdAt.toLocaleDateString(locale, { day: "2-digit", month: "short", year: "numeric" })}
            </span>
          )}
          {lastUsedAt && (
            <span>
              {L.lastUsed}{" "}
              {lastUsedAt.toLocaleDateString(locale, { day: "2-digit", month: "short" })}
            </span>
          )}
          {!lastUsedAt && <span className="text-yellow-400/70">{L.neverUsed}</span>}
        </div>

        {onRotate && (
          <div className="flex items-center gap-2">
            {showRotateConfirm && (
              <div className="flex items-center gap-1.5 text-xs text-yellow-400">
                <AlertTriangle className="h-3 w-3" />
                <span>{L.confirmRotation}</span>
                <button
                  onClick={() => setShowRotateConfirm(false)}
                  className="text-muted-foreground hover:text-foreground ml-1"
                >
                  {L.cancel}
                </button>
              </div>
            )}
            <button
              onClick={handleRotate}
              disabled={rotating}
              className={cn(
                "flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-md transition-colors",
                showRotateConfirm
                  ? "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30 hover:bg-yellow-500/25"
                  : "border border-border text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <RefreshCw className={cn("h-3 w-3", rotating && "animate-spin")} />
              {showRotateConfirm ? L.confirm : L.rotate}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
