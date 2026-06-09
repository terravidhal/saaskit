import { ComponentDocPage } from "@/components/ComponentDocPage";
import { CodeBlock } from "@/components/CodeBlock";
import { PricingTable } from "@/components/saaskit/PricingTable";
import { useTranslation } from "react-i18next";

export default function PricingTableDoc() {
  const { t } = useTranslation();

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
          prop: "labels",
          type: "PricingTableLabels",
          default: "Français",
          description: "Surcharge les textes du composant. Utile pour changer la langue ou personnaliser les libellés.",
        },
        {
          prop: "className",
          type: "string",
          default: "—",
          description: "Classes CSS supplémentaires appliquées au conteneur racine.",
        },
      ]}
      notes={[
        "Le composant est auto-suffisant : aucune dépendance externe requise après installation.",
        "Toutes les couleurs utilisent var(--primary) — le composant s'adapte automatiquement au thème de votre projet.",
        "Le toggle mensuel/annuel applique une réduction de 20% et affiche le montant facturé annuellement.",
      ]}
      extraSections={[
        {
          title: "Container & Layout",
          content: (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Le composant occupe 100% de la largeur disponible. Pour lui donner une zone bien
                délimitée comme sur cette page, enveloppez-le dans un container avec{" "}
                <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded text-primary">
                  max-w-4xl mx-auto
                </code>{" "}
                et du padding :
              </p>
              <CodeBlock
                language="tsx"
                code={`<div className="max-w-4xl mx-auto px-6 py-12">
  <PricingTable ... />
</div>`}
              />
              <p className="text-sm text-muted-foreground">
                Adaptez <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">max-w-4xl</code> selon
                votre mise en page — <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">max-w-5xl</code> pour
                un layout plus large, <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">max-w-3xl</code> pour
                une page plus étroite.
              </p>
            </div>
          ),
        },
        {
          title: "Thème & Couleurs",
          content: (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Le composant utilise{" "}
                <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded text-primary">
                  var(--primary)
                </code>{" "}
                pour toutes ses couleurs d'accentuation — il s'adapte automatiquement au thème de
                votre projet. Si votre primary est bleu, le composant sera bleu. Si c'est du rouge,
                il sera rouge.
              </p>
              <p className="text-sm text-muted-foreground">
                Pour obtenir le rendu vert emerald visible sur ce site, ajoutez ces valeurs dans
                votre <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">globals.css</code> :
              </p>
              <CodeBlock
                language="css"
                code={`:root {
  --primary: oklch(0.65 0.2 165);           /* vert emerald saaskit */
  --primary-foreground: oklch(0.98 0.005 270);
}

.dark {
  --primary: oklch(0.72 0.17 162);          /* vert emerald (dark) */
  --primary-foreground: oklch(0.1 0.005 270);
}`}
              />
              <p className="text-sm text-muted-foreground">
                Si vous avez déjà un thème shadcn configuré, conservez vos valeurs — le composant
                utilisera votre couleur principale existante.
              </p>
            </div>
          ),
        },
        {
          title: "Labels & Langue",
          content: (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Les textes du composant sont en <strong>français par défaut</strong>. La langue ne
                change pas automatiquement — pour utiliser une autre langue, passez la prop{" "}
                <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded text-primary">
                  labels
                </code>{" "}
                avec vos propres libellés :
              </p>
              <CodeBlock
                language="tsx"
                code={`// Anglais
<PricingTable
  labels={{
    monthly: "Monthly",
    annual: "Annual",
    recommended: "Recommended",
    free: "FREE",
    pro: "PRO",
    enterprise: "ENTERPRISE",
    perMonth: "/month",
    startFree: "Get started free",
    upgradePro: "Upgrade to Pro",
    contactSales: "Contact sales",
    feature: "Feature",
    billedAnnual: (amount) => \`Billed \${amount}/year\`,
    descriptions: {
      free: "For getting started.",
      pro: "For growing teams.",
      enterprise: "For large organizations.",
    },
  }}
/>

// Espagnol
<PricingTable
  labels={{
    monthly: "Mensual",
    annual: "Anual",
    startFree: "Empezar gratis",
    upgradePro: "Mejorar a Pro",
    contactSales: "Contactar ventas",
    billedAnnual: (amount) => \`Facturado \${amount}/año\`,
  }}
/>`}
              />
              <p className="text-sm text-muted-foreground">
                Vous pouvez surcharger uniquement les libellés que vous souhaitez — les autres
                gardent leur valeur française par défaut.
              </p>
            </div>
          ),
        },
      ]}
      prevDoc={{ name: t("sidebar.install", { defaultValue: "Installation" }), path: "/docs/installation" }}
      nextDoc={{ name: "TrialBanner", path: "/docs/trial-banner" }}
    />
  );
}
