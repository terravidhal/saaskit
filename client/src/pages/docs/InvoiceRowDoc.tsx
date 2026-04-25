import { ComponentDocPage } from "@/components/ComponentDocPage";
import { InvoiceList } from "@/components/saaskit/InvoiceRow";
import { useTranslation } from "react-i18next";

const demoInvoices = [
  { id: "1", number: "INV-2024-001", date: new Date("2024-01-01"), amount: 2900, currency: "EUR", status: "paid" as const, description: "Plan Pro — Janvier 2024" },
  { id: "2", number: "INV-2024-002", date: new Date("2024-02-01"), amount: 2900, currency: "EUR", status: "paid" as const, description: "Plan Pro — Février 2024" },
  { id: "3", number: "INV-2024-003", date: new Date("2024-03-01"), dueDate: new Date("2024-03-15"), amount: 2900, currency: "EUR", status: "pending" as const, description: "Plan Pro — Mars 2024" },
  { id: "4", number: "INV-2023-012", date: new Date("2023-12-01"), amount: 2900, currency: "EUR", status: "refunded" as const, description: "Plan Pro — Décembre 2023" },
];

export default function InvoiceRowDoc() {
  const { t } = useTranslation();

  return (
    <ComponentDocPage
      name="InvoiceRow"
      category={t("docs.invoiceRow.category")}
      categoryColor="bg-pink-400/10 text-pink-400 border-pink-400/25"
      description={t("docs.invoiceRow.description")}
      installCmd="npx shadcn add @saaskit/invoice-row"
      preview={
        <InvoiceList
          invoices={demoInvoices}
          onDownload={(inv) => console.log("Télécharger", inv.number)}
        />
      }
      usageCode={`import { InvoiceList, InvoiceRow } from "@/components/saaskit/invoice-row";

// Liste complète
<InvoiceList
  invoices={invoices}
  onDownload={(invoice) => {
    window.open(invoice.downloadUrl, "_blank");
  }}
  onView={(invoice) => {
    window.open(invoice.viewUrl, "_blank");
  }}
/>

// Ligne individuelle
<InvoiceRow
  invoice={{
    id: "inv_123",
    number: "INV-2024-001",
    date: new Date("2024-01-01"),
    amount: 2900, // en centimes
    currency: "EUR",
    status: "paid",
    description: "Plan Pro — Janvier 2024",
    downloadUrl: "https://...",
  }}
/>`}
      propsTable={[
        { prop: "invoice.amount", type: "number", required: true, description: t("docs.invoiceRow.props.amount") },
        { prop: "invoice.status", type: '"paid" | "pending" | "failed" | "refunded"', required: true, description: t("docs.invoiceRow.props.status") },
        { prop: "invoice.currency", type: "string", default: '"USD"', description: t("docs.invoiceRow.props.currency") },
        { prop: "onDownload", type: "(invoice) => void", description: t("docs.invoiceRow.props.onDownload") },
        { prop: "onView", type: "(invoice) => void", description: t("docs.invoiceRow.props.onView") },
      ]}
      notes={t("docs.invoiceRow.notes", { returnObjects: true }) as string[]}
      prevDoc={{ name: "TeamInvite", path: "/docs/team-invite" }}
      nextDoc={{ name: "PlanBadge", path: "/docs/plan-badge" }}
    />
  );
}
