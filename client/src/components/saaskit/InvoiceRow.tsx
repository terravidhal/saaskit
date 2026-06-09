"use client";

import { Download, FileText, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

type Lang = "en" | "fr";

export type InvoiceStatus = "paid" | "pending" | "failed" | "refunded";

export interface Invoice {
  id: string;
  number: string;
  date: Date;
  dueDate?: Date;
  amount: number;
  currency?: string;
  status: InvoiceStatus;
  description?: string;
  downloadUrl?: string;
  viewUrl?: string;
}

interface InvoiceRowLabels {
  statuses?: Partial<Record<InvoiceStatus, string>>;
  noInvoices?: string;
  colInvoice?: string;
  colAmount?: string;
  colStatus?: string;
  due?: string;
}

const T: Record<Lang, Required<InvoiceRowLabels>> = {
  en: {
    statuses: { paid: "Paid", pending: "Pending", failed: "Failed", refunded: "Refunded" },
    noInvoices: "No invoices yet.",
    colInvoice: "Invoice",
    colAmount: "Amount",
    colStatus: "Status",
    due: "Due:",
  },
  fr: {
    statuses: { paid: "Payée", pending: "En attente", failed: "Échouée", refunded: "Remboursée" },
    noInvoices: "Aucune facture pour le moment.",
    colInvoice: "Facture",
    colAmount: "Montant",
    colStatus: "Statut",
    due: "Échéance :",
  },
};

const statusColors: Record<InvoiceStatus, string> = {
  paid: "bg-primary/10 text-primary border border-primary/25",
  pending: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/25",
  failed: "bg-destructive/10 text-destructive border border-destructive/25",
  refunded: "bg-muted/50 text-muted-foreground border border-border",
};

interface InvoiceRowProps {
  invoice: Invoice;
  onDownload?: (invoice: Invoice) => void;
  onView?: (invoice: Invoice) => void;
  lang?: Lang;
  labels?: InvoiceRowLabels;
  className?: string;
}

function formatCurrency(amount: number, currency = "USD", locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: "currency", currency, minimumFractionDigits: 2,
  }).format(amount / 100);
}

function formatDate(date: Date, locale: string): string {
  return date.toLocaleDateString(locale, { day: "2-digit", month: "short", year: "numeric" });
}

function formatDateShort(date: Date, locale: string): string {
  return date.toLocaleDateString(locale, { day: "2-digit", month: "short" });
}

export function InvoiceRow({ invoice, onDownload, onView, lang = "en", labels, className }: InvoiceRowProps) {
  const base = T[lang];
  const statuses = { ...base.statuses, ...labels?.statuses };
  const due = labels?.due ?? base.due;
  const locale = lang === "fr" ? "fr-FR" : "en-US";
  const statusLabel = statuses[invoice.status] ?? invoice.status;

  return (
    <div className={cn("flex items-center gap-4 px-4 py-3 hover:bg-muted/20 transition-colors group", className)}>
      <div className="h-8 w-8 rounded-md bg-muted/50 border border-border flex items-center justify-center flex-shrink-0">
        <FileText className="h-4 w-4 text-muted-foreground" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground font-mono">{invoice.number}</span>
          {invoice.description && (
            <span className="text-xs text-muted-foreground truncate hidden sm:block">— {invoice.description}</span>
          )}
        </div>
        <div className="text-xs text-muted-foreground mt-0.5">
          {formatDate(invoice.date, locale)}
          {invoice.dueDate && invoice.status === "pending" && (
            <span className="ml-2 text-yellow-400/80">
              {due} {formatDateShort(invoice.dueDate, locale)}
            </span>
          )}
        </div>
      </div>

      <div className="text-right flex-shrink-0">
        <div className={cn(
          "text-sm font-semibold font-mono",
          invoice.status === "refunded" ? "line-through text-muted-foreground" : "text-foreground"
        )}>
          {formatCurrency(invoice.amount, invoice.currency, locale)}
        </div>
      </div>

      <div className="flex-shrink-0">
        <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", statusColors[invoice.status])}>
          {statusLabel}
        </span>
      </div>

      <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        {invoice.viewUrl && (
          <a
            href={invoice.viewUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onView?.(invoice)}
            className="p-1.5 rounded hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
        {(invoice.downloadUrl || onDownload) && (
          <button
            onClick={() => onDownload?.(invoice)}
            className="p-1.5 rounded hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

/* Compound: InvoiceList */
interface InvoiceListProps {
  invoices: Invoice[];
  onDownload?: (invoice: Invoice) => void;
  onView?: (invoice: Invoice) => void;
  lang?: Lang;
  labels?: InvoiceRowLabels;
  className?: string;
}

export function InvoiceList({ invoices, onDownload, onView, lang = "en", labels, className }: InvoiceListProps) {
  const base = T[lang];
  const L = {
    noInvoices: labels?.noInvoices ?? base.noInvoices,
    colInvoice: labels?.colInvoice ?? base.colInvoice,
    colAmount: labels?.colAmount ?? base.colAmount,
    colStatus: labels?.colStatus ?? base.colStatus,
  };

  if (invoices.length === 0) {
    return (
      <div className={cn("rounded-lg border border-border bg-card p-8 text-center", className)}>
        <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">{L.noInvoices}</p>
      </div>
    );
  }

  return (
    <div className={cn("rounded-lg border border-border bg-card overflow-hidden", className)}>
      <div className="px-4 py-2.5 border-b border-border bg-muted/20 grid grid-cols-[1fr_auto_auto_auto] gap-4 items-center">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{L.colInvoice}</span>
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide text-right">{L.colAmount}</span>
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{L.colStatus}</span>
        <span className="w-16" />
      </div>
      <div className="divide-y divide-border">
        {invoices.map((invoice) => (
          <InvoiceRow key={invoice.id} invoice={invoice} onDownload={onDownload} onView={onView} lang={lang} labels={labels} />
        ))}
      </div>
    </div>
  );
}
