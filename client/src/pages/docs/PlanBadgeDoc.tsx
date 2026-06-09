import { ComponentDocPage, containerSection, themeSection, langSection } from "@/components/ComponentDocPage";
import { PlanBadge, PlanBadgeWithCTA } from "@/components/saaskit/PlanBadge";
import { useTranslation } from "react-i18next";

export default function PlanBadgeDoc() {
  const { t, i18n } = useTranslation();
  const isFr = i18n.language.startsWith("fr");

  return (
    <ComponentDocPage
      name="PlanBadge"
      category={t("docs.planBadge.category")}
      categoryColor="bg-primary/10 text-primary border-primary/25"
      description={t("docs.planBadge.description")}
      installCmd="npx shadcn add @saaskit/plan-badge"
      preview={
        <div className="space-y-6">
          <div>
            <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wide">{t("common.plans.title", { defaultValue: "Plans" })}</p>
            <div className="flex flex-wrap items-center gap-3">
              <PlanBadge plan="free" size="lg" />
              <PlanBadge plan="trial" size="lg" />
              <PlanBadge plan="pro" size="lg" />
              <PlanBadge plan="enterprise" size="lg" />
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wide">{t("common.sizes", { defaultValue: "Sizes" })}</p>
            <div className="flex flex-wrap items-center gap-3">
              <PlanBadge plan="pro" size="sm" />
              <PlanBadge plan="pro" size="md" />
              <PlanBadge plan="pro" size="lg" />
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wide">{t("components.planBadge.withCTA", { defaultValue: "With upgrade CTA" })}</p>
            <div className="flex flex-wrap items-center gap-4">
              <PlanBadgeWithCTA plan="free" onUpgrade={() => {}} />
              <PlanBadgeWithCTA plan="trial" onUpgrade={() => {}} />
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wide">{t("components.planBadge.headerSim", { defaultValue: "In a simulated header" })}</p>
            <div className="flex items-center justify-between px-4 py-2.5 rounded-lg border border-border bg-card">
              <span className="text-sm font-semibold text-foreground font-mono">My App</span>
              <div className="flex items-center gap-3">
                <PlanBadge plan="pro" size="sm" />
                <div className="h-7 w-7 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      usageCode={`import { PlanBadge, PlanBadgeWithCTA } from "@/components/saaskit/plan-badge";

// In the header
<header>
  <nav>...</nav>
  <div className="flex items-center gap-3">
    <PlanBadge plan={user.plan} size="sm" />
    <UserAvatar />
  </div>
</header>

// With upgrade CTA (for Free / Trial plans)
<PlanBadgeWithCTA
  plan={user.plan}
  lang="en"
  onUpgrade={() => router.push("/upgrade")}
/>`}
      propsTable={[
        { prop: "plan", type: '"free" | "trial" | "pro" | "enterprise"', required: true, description: t("docs.planBadge.props.plan") },
        { prop: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: t("docs.planBadge.props.size") },
        { prop: "showIcon", type: "boolean", default: "true", description: t("docs.planBadge.props.showIcon") },
        { prop: "onClick", type: "() => void", description: t("docs.planBadge.props.onClick") },
        { prop: "lang", type: '"en" | "fr"', default: '"en"', description: isFr ? 'Langue du CTA upgrade (PlanBadgeWithCTA). Les labels Free/Pro/Enterprise sont universels.' : 'Language of the upgrade CTA (PlanBadgeWithCTA). Free/Pro/Enterprise labels are universal.' },
        { prop: "upgradeLabel", type: "string", default: "—", description: isFr ? 'Texte du CTA upgrade. Remplace le texte par défaut de lang.' : 'Upgrade CTA text. Overrides the default text from lang.' },
      ]}
      notes={t("docs.planBadge.notes", { returnObjects: true }) as string[]}
      extraSections={[
        containerSection(isFr, "PlanBadge"),
        themeSection(isFr),
        langSection(
          isFr,
          "PlanBadgeWithCTA",
          `// ${isFr ? "Le badge lui-même est universel (Free/Pro/Enterprise)" : "The badge itself is universal (Free/Pro/Enterprise)"}
<PlanBadge plan={user.plan} />

// ${isFr ? "Le CTA upgrade change selon la langue" : "The upgrade CTA changes by language"}
<PlanBadgeWithCTA plan="free" lang="en" onUpgrade={() => {}} />
// ${isFr ? "→ affiche" : "→ shows"} "Upgrade to Pro"

<PlanBadgeWithCTA plan="free" lang="fr" onUpgrade={() => {}} />
// ${isFr ? "→ affiche" : "→ shows"} "Passer au Pro"

// ${isFr ? "Libellé personnalisé" : "Custom label"}
<PlanBadgeWithCTA
  plan="free"
  upgradeLabel="${isFr ? "Mettre à niveau" : "Upgrade now"}"
  onUpgrade={() => {}}
/>`,
        ),
      ]}
      prevDoc={{ name: "InvoiceRow", path: "/docs/invoice-row" }}
      nextDoc={{ name: "ApiKeyCard", path: "/docs/api-key-card" }}
    />
  );
}
