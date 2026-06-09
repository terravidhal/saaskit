import { ComponentDocPage, containerSection, themeSection, langSection } from "@/components/ComponentDocPage";
import { FeatureGate } from "@/components/saaskit/FeatureGate";
import { useTranslation } from "react-i18next";

function FakeAuditLogs() {
  return (
    <div className="space-y-2 p-4 rounded-lg border border-border bg-card">
      {["alice@company.com created a project", "bob@company.com invited charlie@...", "alice@company.com changed settings"].map((log, i) => (
        <div key={i} className="flex items-center gap-3 text-sm">
          <span className="text-xs font-mono text-muted-foreground">2024-03-{10 + i}</span>
          <span className="text-foreground">{log}</span>
        </div>
      ))}
    </div>
  );
}

export default function FeatureGateDoc() {
  const { t, i18n } = useTranslation();
  const isFr = i18n.language.startsWith("fr");

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
            <p className="text-xs text-muted-foreground mb-2">{t("components.featureGate.demo.overlay", { defaultValue: "Overlay mode (Free plan)" })}</p>
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
            <p className="text-xs text-muted-foreground mb-2">{t("components.featureGate.demo.replace", { defaultValue: "Replace mode (Free plan)" })}</p>
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
            <p className="text-xs text-muted-foreground mb-2">{t("components.featureGate.demo.allowed", { defaultValue: "Access granted (Pro plan)" })}</p>
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

// Overlay mode — content visible but blocked
<FeatureGate
  currentPlan={user.plan}
  requiredPlans={["pro", "enterprise"]}
  mode="overlay"
  featureName="Audit Logs"
  lang="en"
  onUpgrade={() => router.push("/upgrade")}
>
  <AuditLogsList />
</FeatureGate>

// Replace mode — replaces content with a message
<FeatureGate
  currentPlan={user.plan}
  requiredPlans={["enterprise"]}
  mode="replace"
  featureName="SSO / SAML"
  requiredPlan="enterprise"
  lang="en"
  onUpgrade={() => router.push("/upgrade")}
>
  <SSOSettings />
</FeatureGate>

// Utility hook
const canAccessWebhooks = useFeatureAccess(user.plan, ["pro", "enterprise"]);`}
      propsTable={[
        { prop: "currentPlan", type: "Plan", required: true, description: t("docs.featureGate.props.currentPlan") },
        { prop: "requiredPlans", type: "Plan[]", required: true, description: t("docs.featureGate.props.requiredPlans") },
        { prop: "children", type: "ReactNode", required: true, description: t("docs.featureGate.props.children") },
        { prop: "mode", type: '"blur" | "overlay" | "replace" | "hide"', default: '"overlay"', description: t("docs.featureGate.props.mode") },
        { prop: "featureName", type: "string", description: t("docs.featureGate.props.featureName") },
        { prop: "requiredPlan", type: '"pro" | "enterprise"', default: '"pro"', description: t("docs.featureGate.props.requiredPlan") },
        { prop: "lang", type: '"en" | "fr"', default: '"en"', description: isFr ? 'Langue des textes dans le panneau de blocage. "en" = anglais (défaut), "fr" = français.' : 'Language of the blocking panel texts. "en" = English (default), "fr" = French.' },
        { prop: "labels", type: "FeatureGateLabels", default: "—", description: isFr ? "Surcharge fins de libellés (fonctions)." : "Fine-grained text overrides (functions)." },
        { prop: "onUpgrade", type: "() => void", description: t("docs.featureGate.props.onUpgrade") },
        { prop: "fallback", type: "ReactNode", description: t("docs.featureGate.props.fallback") },
      ]}
      notes={t("docs.featureGate.notes", { returnObjects: true }) as string[]}
      extraSections={[
        containerSection(isFr, "FeatureGate"),
        themeSection(isFr),
        langSection(
          isFr,
          "FeatureGate",
          `<FeatureGate
  currentPlan={user.plan}
  requiredPlans={["pro", "enterprise"]}
  mode="overlay"
  featureName="Audit Logs"
  lang="fr"
  onUpgrade={() => {}}
>
  <AuditLogsList />
</FeatureGate>

// ${isFr ? "Surcharger les fonctions de libellés" : "Override label functions"}
<FeatureGate
  currentPlan={user.plan}
  requiredPlans={["pro", "enterprise"]}
  lang="fr"
  labels={{
    upgradeBtn: (plan) => \`Activer \${plan}\`,
    upgradeDesc: (plan) => \`Passez au plan \${plan} pour débloquer cette section.\`,
  }}
  onUpgrade={() => {}}
>
  <LockedContent />
</FeatureGate>`,
        ),
      ]}
      prevDoc={{ name: "ApiKeyCard", path: "/docs/api-key-card" }}
    />
  );
}
