import { ComponentDocPage, containerSection, themeSection, langSection } from "@/components/ComponentDocPage";
import { UsageMeterGroup } from "@/components/saaskit/UsageMeter";
import { useTranslation } from "react-i18next";

export default function UsageMeterDoc() {
  const { t, i18n } = useTranslation();
  const isFr = i18n.language.startsWith("fr");

  return (
    <ComponentDocPage
      name="UsageMeter"
      category={t("docs.usageMeter.category")}
      categoryColor="bg-blue-400/10 text-blue-400 border-blue-400/25"
      description={t("docs.usageMeter.description")}
      installCmd="npx shadcn add @saaskit/usage-meter"
      preview={
        <UsageMeterGroup
          title={t("components.usageMeter.monthUsage", { defaultValue: "Usage this month" })}
          meters={[
            { label: t("components.usageMeter.demo.api", { defaultValue: "API Calls" }), used: 12500, limit: 500000, unit: "" },
            { label: t("components.usageMeter.demo.storage", { defaultValue: "Storage" }), used: 38, limit: 50, unit: " GB" },
            { label: t("components.usageMeter.demo.team", { defaultValue: "Active Members" }), used: 9, limit: 10, unit: "" },
            { label: t("components.usageMeter.demo.webhooks", { defaultValue: "Webhooks" }), used: 980, limit: 1000, unit: "" },
          ]}
          onUpgrade={() => {}}
        />
      }
      usageCode={`import { UsageMeter, UsageMeterGroup } from "@/components/saaskit/usage-meter";

// Single meter
<UsageMeter
  label="API Calls"
  used={12500}
  limit={500000}
  warnThreshold={75}
  dangerThreshold={90}
  lang="en"
  onUpgrade={() => router.push("/upgrade")}
/>

// Meter group
<UsageMeterGroup
  title="Usage this month"
  meters={[
    { label: "API Calls", used: 12500, limit: 500000 },
    { label: "Storage", used: 38, limit: 50, unit: " GB" },
    { label: "Active Members", used: 9, limit: 10 },
  ]}
  lang="en"
  onUpgrade={() => router.push("/upgrade")}
/>`}
      propsTable={[
        { prop: "label", type: "string", required: true, description: t("docs.usageMeter.props.label") },
        { prop: "used", type: "number", required: true, description: t("docs.usageMeter.props.used") },
        { prop: "limit", type: "number", required: true, description: t("docs.usageMeter.props.limit") },
        { prop: "unit", type: "string", default: '""', description: t("docs.usageMeter.props.unit") },
        { prop: "warnThreshold", type: "number", default: "75", description: t("docs.usageMeter.props.warnThreshold") },
        { prop: "dangerThreshold", type: "number", default: "90", description: t("docs.usageMeter.props.dangerThreshold") },
        { prop: "lang", type: '"en" | "fr"', default: '"en"', description: isFr ? 'Langue des textes. "en" = anglais (défaut), "fr" = français.' : 'Text language. "en" = English (default), "fr" = French.' },
        { prop: "labels", type: "UsageMeterLabels", default: "—", description: isFr ? "Surcharge fins de libellés." : "Fine-grained text overrides." },
        { prop: "onUpgrade", type: "() => void", description: t("docs.usageMeter.props.onUpgrade") },
        { prop: "showUpgrade", type: "boolean", default: "true", description: t("docs.usageMeter.props.showUpgrade") },
      ]}
      notes={t("docs.usageMeter.notes", { returnObjects: true }) as string[]}
      extraSections={[
        containerSection(isFr, "UsageMeterGroup"),
        themeSection(isFr),
        langSection(
          isFr,
          "UsageMeter",
          `<UsageMeter
  label="Appels API"
  used={12500}
  limit={500000}
  lang="fr"
/>

// ${isFr ? "Surcharger certains libellés" : "Override specific labels"}
<UsageMeter
  label="API Calls"
  used={980}
  limit={1000}
  lang="fr"
  labels={{
    increase: "Augmenter la limite",
    limitDanger: "Limite presque atteinte — les nouvelles requêtes seront bloquées.",
  }}
/>`,
        ),
      ]}
      prevDoc={{ name: "TrialBanner", path: "/docs/trial-banner" }}
      nextDoc={{ name: "OnboardingSteps", path: "/docs/onboarding-steps" }}
    />
  );
}
