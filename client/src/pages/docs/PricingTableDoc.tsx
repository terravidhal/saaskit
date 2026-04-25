import { ComponentDocPage } from "@/components/ComponentDocPage";
import { PricingTable } from "@/components/saaskit/PricingTable";
import { useTranslation } from "react-i18next";

export default function PricingTableDoc() {
  const { t } = useTranslation();

  return (
    <ComponentDocPage
      name="PricingTable"
      category={t("docs.pricingTable.category")}
      categoryColor="bg-yellow-400/10 text-yellow-400 border-yellow-400/25"
      description={t("docs.pricingTable.description")}
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
  { name: "${t("components.pricingTable.features.projects", { defaultValue: "Projets actifs" })}", free: "3", pro: "Illimité", enterprise: "Illimité" },
  { name: "${t("components.pricingTable.features.team", { defaultValue: "Membres d'équipe" })}", free: "1", pro: "10", enterprise: "Illimité" },
  { name: "${t("components.pricingTable.features.support", { defaultValue: "Support prioritaire" })}", free: false, pro: true, enterprise: true },
  { name: "${t("components.pricingTable.features.sso", { defaultValue: "SSO / SAML" })}", free: false, pro: false, enterprise: true },
];

export function PricingSection() {
  return (
    <PricingTable
      features={features}
      onSelectPlan={(plan, billing) => {
        // Redirige vers le checkout Stripe
        router.push(\`/checkout?plan=\${plan}&billing=\${billing}\`);
      }}
    />
  );
}`}
      propsTable={[
        { prop: "features", type: "PricingFeature[]", description: t("docs.pricingTable.props.features") },
        { prop: "onSelectPlan", type: "(plan, billing) => void", description: t("docs.pricingTable.props.onSelectPlan") },
        { prop: "className", type: "string", description: t("docs.pricingTable.props.className") },
      ]}
      notes={t("docs.pricingTable.notes", { returnObjects: true }) as string[]}
      prevDoc={{ name: t("sidebar.install"), path: "/docs/installation" }}
      nextDoc={{ name: "TrialBanner", path: "/docs/trial-banner" }}
    />
  );
}
