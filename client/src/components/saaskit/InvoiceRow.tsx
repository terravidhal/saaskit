/**
 * @saaskit/invoice-row
 * Design: Developer-first Brutalism Doux — dark bg, emerald accent
 * Usage: npx shadcn add @saaskit/invoice-row
 *
 * Ligne de facture avec statut, montant, téléchargement
 */

import { Download, FileText, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

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

interface InvoiceRowProps {
  invoice: Invoice;
  onDownload?: (invoice: Invoice) => void;
  onView?: (invoice: Invoice) => void;
  className?: string;
}

const statusConfig: Record<InvoiceStatus, { label: string; className: string }> = {
  paid: {
    label: "Payée",
    className: "bg-primary/10 text-primary border border-primary/25",
  },
  pending: {
    label: "En attente",
    className: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/25",
  },
  failed: {
    label: "Échouée",
    className: "bg-destructive/10 text-destructive border border-destructive/25",
  },
  refunded: {
    label: "Remboursée",
    className: "bg-muted/50 text-muted-foreground border border-border",
  },
};

function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount / 100);
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function InvoiceRow({ invoice, onDownload, onView, className }: InvoiceRowProps) {
  const status = statusConfig[invoice.status];

  return (
    <div
      className={cn(
        "flex items-center gap-4 px-4 py-3 hover:bg-muted/20 transition-colors group",
        className
      )}
    >
      {/* Icon */}
      <div className="h-8 w-8 rounded-md bg-muted/50 border border-border flex items-center justify-center flex-shrink-0">
        <FileText className="h-4 w-4 text-muted-foreground" />
      </div>

      {/* Invoice info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground font-mono">
            {invoice.number}
          </span>
          {invoice.description && (
            <span className="text-xs text-muted-foreground truncate hidden sm:block">
              — {invoice.description}
            </span>
          )}
        </div>
        <div className="text-xs text-muted-foreground mt-0.5">
          {formatDate(invoice.date)}
          {invoice.dueDate && invoice.status === "pending" && (
            <span className="ml-2 text-yellow-400/80">
              Échéance : {formatDate(invoice.dueDate)}
            </span>
          )}
        </div>
      </div>

      {/* Amount */}
      <div className="text-right flex-shrink-0">
        <div
          className={cn(
            "text-sm font-semibold font-mono",
            invoice.status === "refunded" && "line-through text-muted-foreground",
            invoice.status !== "refunded" && "text-foreground"
          )}
        >
          {formatCurrency(invoice.amount, invoice.currency)}
        </div>
      </div>

      {/* Status badge */}
      <div className="flex-shrink-0">
        <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", status.className)}>
          {status.label}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        {invoice.viewUrl && (
          <a
            href={invoice.viewUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onView?.(invoice)}
            className="p-1.5 rounded hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Voir la facture"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
        {(invoice.downloadUrl || onDownload) && (
          <button
            onClick={() => onDownload?.(invoice)}
            className="p-1.5 rounded hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Télécharger la facture"
          >
            <Download className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

/* Compound: InvoiceList — liste complète de factures */
interface InvoiceListProps {
  invoices: Invoice[];
  onDownload?: (invoice: Invoice) => void;
  onView?: (invoice: Invoice) => void;
  className?: string;
}

export function InvoiceList({ invoices, onDownload, onView, className }: InvoiceListProps) {
  if (invoices.length === 0) {
    return (
      <div className={cn("rounded-lg border border-border bg-card p-8 text-center", className)}>
        <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">Aucune facture pour le moment.</p>
      </div>
    );
  }

  return (
    <div className={cn("rounded-lg border border-border bg-card overflow-hidden", className)}>
      <div className="px-4 py-2.5 border-b border-border bg-muted/20 grid grid-cols-[1fr_auto_auto_auto] gap-4 items-center">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Facture</span>
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide text-right">Montant</span>
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Statut</span>
        <span className="w-16" />
      </div>
      <div className="divide-y divide-border">
        {invoices.map((invoice) => (
          <InvoiceRow
            key={invoice.id}
            invoice={invoice}
            onDownload={onDownload}
            onView={onView}
          />
        ))}
      </div>
    </div>
  );
}
