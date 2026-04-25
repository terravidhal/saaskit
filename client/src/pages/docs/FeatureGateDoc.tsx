import { ComponentDocPage } from "@/components/ComponentDocPage";
import { FeatureGate } from "@/components/saaskit/FeatureGate";
import { useTranslation } from "react-i18next";

function FakeAuditLogs() {
  return (
    <div className="space-y-2 p-4 rounded-lg border border-border bg-card">
      {["alice@company.com a créé un projet", "bob@company.com a invité charlie@...", "alice@company.com a modifié les paramètres"].map((log, i) => (
        <div key={i} className="flex items-center gap-3 text-sm">
          <span className="text-xs font-mono text-muted-foreground">2024-03-{10 + i}</span>
          <span className="text-foreground">{log}</span>
        </div>
      ))}
    </div>
  );
}

export default function FeatureGateDoc() {
  const { t } = useTranslation();

  return (
    <ComponentDocPage
      name="FeatureGate"
      category={t("docs.featureGate.category")}
      categoryColor="bg-red-400/10 text-red-400 border-red-400/25"
      description={t("docs.featureGate.description")}
      installCmd="npx shadcn add @saaskit/feature-gate"
      preview={
        <div className="space-y-4">
          <div>
            <p className="text-xs text-muted-foreground mb-2">{t("components.featureGate.overlayMode", { defaultValue: "Mode overlay (plan Free)" })}</p>
            <FeatureGate
              currentPlan="free"
              requiredPlans={["pro", "enterprise"]}
              mode="overlay"
              featureName="Audit Logs"
              requiredPlan="pro"
              onUpgrade={() => {}}
            >
              <FakeAuditLogs />
            </FeatureGate>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2">{t("components.featureGate.replaceMode", { defaultValue: "Mode replace (plan Free)" })}</p>
            <FeatureGate
              currentPlan="free"
              requiredPlans={["pro", "enterprise"]}
              mode="replace"
              featureName="Webhooks"
              requiredPlan="pro"
              onUpgrade={() => {}}
            >
              <FakeAuditLogs />
            </FeatureGate>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2">{t("components.featureGate.allowedAccess", { defaultValue: "Accès autorisé (plan Pro)" })}</p>
            <FeatureGate
              currentPlan="pro"
              requiredPlans={["pro", "enterprise"]}
              mode="overlay"
            >
              <FakeAuditLogs />
            </FeatureGate>
          </div>
        </div>
      }
      usageCode={`import { FeatureGate, useFeatureAccess } from "@/components/saaskit/feature-gate";

// Mode overlay — contenu visible mais bloqué
<FeatureGate
  currentPlan={user.plan}
  requiredPlans={["pro", "enterprise"]}
  mode="overlay"
  featureName="Audit Logs"
  onUpgrade={() => router.push("/upgrade")}
>
  <AuditLogsList />
</FeatureGate>

// Mode replace — remplace le contenu par un message
<FeatureGate
  currentPlan={user.plan}
  requiredPlans={["enterprise"]}
  mode="replace"
  featureName="SSO / SAML"
  requiredPlan="enterprise"
  onUpgrade={() => router.push("/upgrade")}
>
  <SSOSettings />
</FeatureGate>

// Hook utilitaire
const canAccessWebhooks = useFeatureAccess(user.plan, ["pro", "enterprise"]);`}
      propsTable={[
        { prop: "currentPlan", type: "Plan", required: true, description: t("docs.featureGate.props.currentPlan") },
        { prop: "requiredPlans", type: "Plan[]", required: true, description: t("docs.featureGate.props.requiredPlans") },
        { prop: "children", type: "ReactNode", required: true, description: t("docs.featureGate.props.children") },
        { prop: "mode", type: '"blur" | "overlay" | "replace" | "hide"', default: '"overlay"', description: t("docs.featureGate.props.mode") },
        { prop: "featureName", type: "string", description: t("docs.featureGate.props.featureName") },
        { prop: "requiredPlan", type: '"pro" | "enterprise"', default: '"pro"', description: t("docs.featureGate.props.requiredPlan") },
        { prop: "onUpgrade", type: "() => void", description: t("docs.featureGate.props.onUpgrade") },
        { prop: "fallback", type: "ReactNode", description: t("docs.featureGate.props.fallback") },
      ]}
      notes={t("docs.featureGate.notes", { returnObjects: true }) as string[]}
      prevDoc={{ name: "ApiKeyCard", path: "/docs/api-key-card" }}
    />
  );
}
