/**
 * @saaskit — ComponentDocPage
 * Template de page de documentation pour chaque composant
 */

import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { DocLayout } from "./DocLayout";
import { CodeBlock, InstallBlock } from "./CodeBlock";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface ComponentDocPageProps {
  name: string;
  category: string;
  categoryColor: string;
  description: string;
  installCmd: string;
  preview: React.ReactNode;
  usageCode: string;
  propsTable?: Array<{
    prop: string;
    type: string;
    default?: string;
    description: string;
    required?: boolean;
  }>;
  notes?: string[];
  prevDoc?: { name: string; path: string };
  nextDoc?: { name: string; path: string };
}

export function ComponentDocPage({
  name,
  category,
  categoryColor,
  description,
  installCmd,
  preview,
  usageCode,
  propsTable,
  notes,
  prevDoc,
  nextDoc,
}: ComponentDocPageProps) {
  const { t } = useTranslation();

  return (
    <DocLayout>
      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full border", categoryColor)}>
              {category}
            </span>
          </div>
          <h1 className="text-4xl font-black text-foreground font-[Fraunces] mb-3">{name}</h1>
          <p className="text-base text-muted-foreground leading-relaxed">{description}</p>
        </div>

        {/* Installation */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-widest mb-3">
            {t("docs.labels.installation", { defaultValue: "Installation" })}
          </h2>
          <InstallBlock command={installCmd} />
        </section>

        {/* Preview */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-widest mb-3">
            {t("docs.labels.preview", { defaultValue: "Aperçu" })}
          </h2>
          <div className="component-sandbox dot-grid">
            {preview}
          </div>
        </section>

        {/* Usage */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-widest mb-3">
            {t("docs.labels.usage", { defaultValue: "Utilisation" })}
          </h2>
          <CodeBlock code={usageCode} language="tsx" showLineNumbers />
        </section>

        {/* Props table */}
        {propsTable && propsTable.length > 0 && (
          <section className="mb-8">
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-widest mb-3">
              {t("docs.labels.props", { defaultValue: "Props" })}
            </h2>
            <div className="rounded-lg border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/20">
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Prop</th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Type</th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden md:table-cell">
                      {t("docs.labels.default", { defaultValue: "Défaut" })}
                    </th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {propsTable.map((row) => (
                    <tr key={row.prop} className="hover:bg-muted/10 transition-colors">
                      <td className="px-4 py-2.5">
                        <code className="text-xs font-mono text-primary">{row.prop}</code>
                        {row.required && (
                          <span className="ml-1 text-xs text-destructive">*</span>
                        )}
                      </td>
                      <td className="px-4 py-2.5">
                        <code className="text-xs font-mono text-muted-foreground">{row.type}</code>
                      </td>
                      <td className="px-4 py-2.5 hidden md:table-cell">
                        {row.default ? (
                          <code className="text-xs font-mono text-muted-foreground/70">{row.default}</code>
                        ) : (
                          <span className="text-xs text-muted-foreground/40">—</span>
                        )}
                      </td>
                      <td className="px-4 py-2.5 text-xs text-muted-foreground">{row.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Notes */}
        {notes && notes.length > 0 && (
          <section className="mb-8">
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-widest mb-3">
              {t("docs.labels.notes", { defaultValue: "Notes" })}
            </h2>
            <ul className="space-y-2">
              {notes.map((note, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                  {note}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Navigation */}
        <div className="section-divider" />
        <div className="flex items-center justify-between gap-4">
          {prevDoc ? (
            <Link href={prevDoc.path}>
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group">
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                <div className="text-left">
                  <div className="text-xs text-muted-foreground/60">{t("docs.labels.prev", { defaultValue: "Précédent" })}</div>
                  <div className="font-mono">{prevDoc.name}</div>
                </div>
              </button>
            </Link>
          ) : (
            <div />
          )}
          {nextDoc ? (
            <Link href={nextDoc.path}>
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group text-right">
                <div>
                  <div className="text-xs text-muted-foreground/60">{t("docs.labels.next", { defaultValue: "Suivant" })}</div>
                  <div className="font-mono">{nextDoc.name}</div>
                </div>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </DocLayout>
  );
}
