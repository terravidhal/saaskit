import { ComponentDocPage, containerSection, themeSection, langSection } from "@/components/ComponentDocPage";
import { PricingTable } from "@/components/saaskit/PricingTable";
import { useTranslation } from "react-i18next";

export default function PricingTableDoc() {
  const { t, i18n } = useTranslation();
  const isFr = i18n.language.startsWith("fr");

  return (
    <ComponentDocPage
      name="PricingTable"
      category={t("docs.pricingTable.category", { defaultValue: "Monétisation" })}
      categoryColor="bg-yellow-400/10 text-yellow-400 border-yellow-400/25"
      description={t("docs.pricingTable.description", {
        defaultValue:
          "Tableau de tarification complet avec toggle mensuel/annuel, badges de plan et tableau de comparaison des fonctionnalités. S'adapte automatiquement au thème de votre projet.",
      })}
      installCmd="npx shadcn add @saaskit/pricing-table"
      preview={
        <PricingTable
          onSelectPlan={(plan, billing) => {
            console.log("Plan sélectionné :", plan, billing);
          }}
        />
      }
      usageCode={`import { PricingTable } from "@/components/saaskit/pricing-table";

const features = [
  { name: "Projets actifs", free: "3", pro: "Illimité", enterprise: "Illimité" },
  { name: "Membres d'équipe", free: "1", pro: "10", enterprise: "Illimité" },
  { name: "Support prioritaire", free: false, pro: true, enterprise: true },
  { name: "SSO / SAML", free: false, pro: false, enterprise: true },
];

export function PricingSection() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <PricingTable
        features={features}
        onSelectPlan={(plan, billing) => {
          router.push(\`/checkout?plan=\${plan}&billing=\${billing}\`);
        }}
      />
    </div>
  );
}`}
      propsTable={[
        {
          prop: "features",
          type: "PricingFeature[]",
          default: "—",
          description: "Liste des fonctionnalités à comparer. Si omis, une liste par défaut est utilisée.",
        },
        {
          prop: "onSelectPlan",
          type: "(plan, billing) => void",
          default: "—",
          description: "Callback déclenché quand l'utilisateur clique sur un bouton de plan.",
        },
        {
          prop: "lang",
          type: '"en" | "fr"',
          default: '"en"',
          description: isFr
            ? 'Langue des textes du composant. "en" = anglais (défaut), "fr" = français.'
            : 'Component text language. "en" = English (default), "fr" = French.',
        },
        {
          prop: "labels",
          type: "PricingTableLabels",
          default: "—",
          description: isFr
            ? "Surcharge fins des libellés — s'applique par-dessus la langue choisie via lang."
            : "Fine-grained text overrides — applied on top of the lang prop.",
        },
        {
          prop: "className",
          type: "string",
          default: "—",
          description: "Classes CSS supplémentaires appliquées au conteneur racine.",
        },
      ]}
      notes={isFr ? [
        "Le composant est auto-suffisant : aucune dépendance externe requise après installation.",
        "Toutes les couleurs utilisent var(--primary) — le composant s'adapte automatiquement au thème de votre projet.",
        "Le toggle mensuel/annuel applique une réduction de 20% et affiche le montant facturé annuellement.",
        "La police Fraunces se charge automatiquement depuis Google Fonts. Pour la remplacer, définissez --saaskit-font-display dans votre CSS : :root { --saaskit-font-display: 'Inter'; }",
      ] : [
        "The component is self-contained: no external dependencies required after installation.",
        "All colors use var(--primary) — the component automatically adapts to your project's theme.",
        "The monthly/annual toggle applies a 20% discount and displays the annual billing amount.",
        "The Fraunces font loads automatically from Google Fonts. To replace it, set --saaskit-font-display in your CSS: :root { --saaskit-font-display: 'Inter'; }",
      ]}
      extraSections={[
        containerSection(isFr, "PricingTable"),
        themeSection(isFr),
        langSection(
          isFr,
          "PricingTable",
          `// ${isFr ? "Surcharger certains libellés en français" : "Override specific labels"}
<PricingTable
  lang="fr"
  labels={{
    startFree: "${isFr ? "Commencer maintenant" : "Start now"}",
    upgradePro: "${isFr ? "Essayer Pro 14 jours" : "Try Pro 14 days"}",
  }}
/>

// ${isFr ? "Espagnol (autre langue via labels)" : "Spanish (other language via labels)"}
<PricingTable
  labels={{
    monthly: "Mensual",
    annual: "Anual",
    startFree: "Empezar gratis",
    upgradePro: "Mejorar a Pro",
    billedAnnual: (amount) => \`Facturado \${amount}/año\`,
  }}
/>`,
        ),
      ]}
      prevDoc={{ name: t("sidebar.install", { defaultValue: "Installation" }), path: "/docs/installation" }}
      nextDoc={{ name: "TrialBanner", path: "/docs/trial-banner" }}
    />
  );
}
