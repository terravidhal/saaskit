import { ComponentDocPage } from "@/components/ComponentDocPage";
import { UsageMeterGroup } from "@/components/saaskit/UsageMeter";
import { useTranslation } from "react-i18next";

export default function UsageMeterDoc() {
  const { t } = useTranslation();

  return (
    <ComponentDocPage
      name="UsageMeter"
      category={t("docs.usageMeter.category")}
      categoryColor="bg-blue-400/10 text-blue-400 border-blue-400/25"
      description={t("docs.usageMeter.description")}
      installCmd="npx shadcn add @saaskit/usage-meter"
      preview={
        <UsageMeterGroup
          title={t("components.usageMeter.monthUsage", { defaultValue: "Utilisation ce mois-ci" })}
          meters={[
            { label: t("components.usageMeter.demo.api", { defaultValue: "Appels API" }), used: 12500, limit: 500000, unit: "" },
            { label: t("components.usageMeter.demo.storage", { defaultValue: "Stockage" }), used: 38, limit: 50, unit: " GB" },
            { label: t("components.usageMeter.demo.team", { defaultValue: "Membres actifs" }), used: 9, limit: 10, unit: "" },
            { label: t("components.usageMeter.demo.webhooks", { defaultValue: "Webhooks" }), used: 980, limit: 1000, unit: "" },
          ]}
          onUpgrade={() => {}}
        />
      }
      usageCode={`import { UsageMeter, UsageMeterGroup } from "@/components/saaskit/usage-meter";

// Composant unique
<UsageMeter
  label="Appels API"
  used={12500}
  limit={500000}
  warnThreshold={75}
  dangerThreshold={90}
  onUpgrade={() => router.push("/upgrade")}
/>

// Groupe de métriques
<UsageMeterGroup
  title="Utilisation ce mois-ci"
  meters={[
    { label: "Appels API", used: 12500, limit: 500000 },
    { label: "Stockage", used: 38, limit: 50, unit: " GB" },
    { label: "Membres actifs", used: 9, limit: 10 },
  ]}
  onUpgrade={() => router.push("/upgrade")}
/>`}
      propsTable={[
        { prop: "label", type: "string", required: true, description: t("docs.usageMeter.props.label") },
        { prop: "used", type: "number", required: true, description: t("docs.usageMeter.props.used") },
        { prop: "limit", type: "number", required: true, description: t("docs.usageMeter.props.limit") },
        { prop: "unit", type: "string", default: '""', description: t("docs.usageMeter.props.unit") },
        { prop: "warnThreshold", type: "number", default: "75", description: t("docs.usageMeter.props.warnThreshold") },
        { prop: "dangerThreshold", type: "number", default: "90", description: t("docs.usageMeter.props.dangerThreshold") },
        { prop: "onUpgrade", type: "() => void", description: t("docs.usageMeter.props.onUpgrade") },
        { prop: "showUpgrade", type: "boolean", default: "true", description: t("docs.usageMeter.props.showUpgrade") },
      ]}
      notes={t("docs.usageMeter.notes", { returnObjects: true }) as string[]}
      prevDoc={{ name: "TrialBanner", path: "/docs/trial-banner" }}
      nextDoc={{ name: "OnboardingSteps", path: "/docs/onboarding-steps" }}
    />
  );
}
