import { ComponentDocPage, containerSection, themeSection, langSection } from "@/components/ComponentDocPage";
import { InvoiceList } from "@/components/saaskit/InvoiceRow";
import { useTranslation } from "react-i18next";

const demoInvoices = [
  { id: "1", number: "INV-2024-001", date: new Date("2024-01-01"), amount: 2900, currency: "EUR", status: "paid" as const, description: "Pro Plan — January 2024" },
  { id: "2", number: "INV-2024-002", date: new Date("2024-02-01"), amount: 2900, currency: "EUR", status: "paid" as const, description: "Pro Plan — February 2024" },
  { id: "3", number: "INV-2024-003", date: new Date("2024-03-01"), dueDate: new Date("2024-03-15"), amount: 2900, currency: "EUR", status: "pending" as const, description: "Pro Plan — March 2024" },
  { id: "4", number: "INV-2023-012", date: new Date("2023-12-01"), amount: 2900, currency: "EUR", status: "refunded" as const, description: "Pro Plan — December 2023" },
];

export default function InvoiceRowDoc() {
  const { t, i18n } = useTranslation();
  const isFr = i18n.language.startsWith("fr");

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
          onDownload={(inv) => console.log("Download", inv.number)}
        />
      }
      usageCode={`import { InvoiceList, InvoiceRow } from "@/components/saaskit/invoice-row";

// Full list
<InvoiceList
  invoices={invoices}
  lang="en"
  onDownload={(invoice) => {
    window.open(invoice.downloadUrl, "_blank");
  }}
  onView={(invoice) => {
    window.open(invoice.viewUrl, "_blank");
  }}
/>

// Individual row
<InvoiceRow
  invoice={{
    id: "inv_123",
    number: "INV-2024-001",
    date: new Date("2024-01-01"),
    amount: 2900, // in cents
    currency: "USD",
    status: "paid",
    description: "Pro Plan — January 2024",
    downloadUrl: "https://...",
  }}
  lang="en"
/>`}
      propsTable={[
        { prop: "invoice.amount", type: "number", required: true, description: t("docs.invoiceRow.props.amount") },
        { prop: "invoice.status", type: '"paid" | "pending" | "failed" | "refunded"', required: true, description: t("docs.invoiceRow.props.status") },
        { prop: "invoice.currency", type: "string", default: '"USD"', description: t("docs.invoiceRow.props.currency") },
        { prop: "lang", type: '"en" | "fr"', default: '"en"', description: isFr ? 'Langue des textes. "en" = anglais (défaut), "fr" = français. Affecte aussi le formatage des montants et des dates.' : 'Text language. "en" = English (default), "fr" = French. Also affects amount and date formatting.' },
        { prop: "labels", type: "InvoiceRowLabels", default: "—", description: isFr ? "Surcharge fins de libellés, y compris les statuts." : "Fine-grained text overrides, including status labels." },
        { prop: "onDownload", type: "(invoice) => void", description: t("docs.invoiceRow.props.onDownload") },
        { prop: "onView", type: "(invoice) => void", description: t("docs.invoiceRow.props.onView") },
      ]}
      notes={t("docs.invoiceRow.notes", { returnObjects: true }) as string[]}
      extraSections={[
        containerSection(isFr, "InvoiceList"),
        themeSection(isFr),
        langSection(
          isFr,
          "InvoiceList",
          `<InvoiceList
  invoices={invoices}
  lang="fr"
/>
// ${isFr ? "→ montants formatés en fr-FR, statuts en français" : "→ amounts formatted in fr-FR, statuses in French"}

// ${isFr ? "Surcharger certains libellés" : "Override specific labels"}
<InvoiceList
  invoices={invoices}
  lang="fr"
  labels={{
    colInvoice: "Référence",
    colStatus: "État",
    statuses: { paid: "Réglée", pending: "En cours", failed: "Rejetée", refunded: "Remboursée" },
  }}
/>`,
        ),
      ]}
      prevDoc={{ name: "TeamInvite", path: "/docs/team-invite" }}
      nextDoc={{ name: "PlanBadge", path: "/docs/plan-badge" }}
    />
  );
}
