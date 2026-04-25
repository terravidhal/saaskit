import { ComponentDocPage } from "@/components/ComponentDocPage";
import { PlanBadge, PlanBadgeWithCTA } from "@/components/saaskit/PlanBadge";
import { useTranslation } from "react-i18next";

export default function PlanBadgeDoc() {
  const { t } = useTranslation();

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
            <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wide">{t("common.sizes", { defaultValue: "Tailles" })}</p>
            <div className="flex flex-wrap items-center gap-3">
              <PlanBadge plan="pro" size="sm" />
              <PlanBadge plan="pro" size="md" />
              <PlanBadge plan="pro" size="lg" />
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wide">{t("components.planBadge.withCTA", { defaultValue: "Avec CTA upgrade" })}</p>
            <div className="flex flex-wrap items-center gap-4">
              <PlanBadgeWithCTA plan="free" onUpgrade={() => {}} />
              <PlanBadgeWithCTA plan="trial" onUpgrade={() => {}} upgradeLabel={t("components.pricingTable.upgradePro")} />
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wide">{t("components.planBadge.headerSim", { defaultValue: "Dans un header simulé" })}</p>
            <div className="flex items-center justify-between px-4 py-2.5 rounded-lg border border-border bg-card">
              <span className="text-sm font-semibold text-foreground font-mono">Mon Application</span>
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

// Dans le header
<header>
  <nav>...</nav>
  <div className="flex items-center gap-3">
    <PlanBadge plan={user.plan} size="sm" />
    <UserAvatar />
  </div>
</header>

// Avec CTA d'upgrade (pour Free / Trial)
<PlanBadgeWithCTA
  plan={user.plan}
  onUpgrade={() => router.push("/upgrade")}
  upgradeLabel="Passer au Pro"
/>`}
      propsTable={[
        { prop: "plan", type: '"free" | "trial" | "pro" | "enterprise"', required: true, description: t("docs.planBadge.props.plan") },
        { prop: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: t("docs.planBadge.props.size") },
        { prop: "showIcon", type: "boolean", default: "true", description: t("docs.planBadge.props.showIcon") },
        { prop: "onClick", type: "() => void", description: t("docs.planBadge.props.onClick") },
      ]}
      notes={t("docs.planBadge.notes", { returnObjects: true }) as string[]}
      prevDoc={{ name: "InvoiceRow", path: "/docs/invoice-row" }}
      nextDoc={{ name: "ApiKeyCard", path: "/docs/api-key-card" }}
    />
  );
}
