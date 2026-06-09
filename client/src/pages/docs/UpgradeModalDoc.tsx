import { useState } from "react";
import { ComponentDocPage, containerSection, themeSection, langSection } from "@/components/ComponentDocPage";
import { UpgradeModal } from "@/components/saaskit/UpgradeModal";
import { useTranslation } from "react-i18next";

function UpgradeModalPreview() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
      >
        {t("components.upgradeModal.openPreview", { defaultValue: "Open UpgradeModal" })}
      </button>
      <p className="text-xs text-muted-foreground">{t("components.common.clickToPreview", { defaultValue: "Click to see the modal in action" })}</p>
      <UpgradeModal
        open={open}
        onClose={() => setOpen(false)}
        onUpgrade={() => { setOpen(false); }}
        featureName="Audit Logs"
        currentPlan="free"
        targetPlan="pro"
      />
    </div>
  );
}

export default function UpgradeModalDoc() {
  const { t, i18n } = useTranslation();
  const isFr = i18n.language.startsWith("fr");

  return (
    <ComponentDocPage
      name="UpgradeModal"
      category={t("docs.upgradeModal.category")}
      categoryColor="bg-purple-400/10 text-purple-400 border-purple-400/25"
      description={t("docs.upgradeModal.description")}
      installCmd="npx shadcn add @saaskit/upgrade-modal"
      preview={<UpgradeModalPreview />}
      usageCode={`import { UpgradeModal } from "@/components/saaskit/upgrade-modal";

function AuditLogsPage({ user }) {
  const [showUpgrade, setShowUpgrade] = useState(false);

  if (user.plan === "free") {
    return (
      <>
        <button onClick={() => setShowUpgrade(true)}>
          View audit logs
        </button>
        <UpgradeModal
          open={showUpgrade}
          onClose={() => setShowUpgrade(false)}
          onUpgrade={() => router.push("/checkout?plan=pro")}
          featureName="Audit Logs"
          currentPlan="free"
          targetPlan="pro"
          lang="en"
        />
      </>
    );
  }

  return <AuditLogsList />;
}`}
      propsTable={[
        { prop: "open", type: "boolean", required: true, description: t("docs.upgradeModal.props.open") },
        { prop: "onClose", type: "() => void", required: true, description: t("docs.upgradeModal.props.onClose") },
        { prop: "onUpgrade", type: "() => void", required: true, description: t("docs.upgradeModal.props.onUpgrade") },
        { prop: "featureName", type: "string", description: t("docs.upgradeModal.props.featureName") },
        { prop: "currentPlan", type: '"free" | "pro"', default: '"free"', description: t("docs.upgradeModal.props.currentPlan") },
        { prop: "targetPlan", type: '"pro" | "enterprise"', default: '"pro"', description: t("docs.upgradeModal.props.targetPlan") },
        { prop: "features", type: "string[]", description: t("docs.upgradeModal.props.features") },
        { prop: "lang", type: '"en" | "fr"', default: '"en"', description: isFr ? 'Langue des textes. "en" = anglais (défaut), "fr" = français.' : 'Text language. "en" = English (default), "fr" = French.' },
        { prop: "labels", type: "UpgradeModalLabels", default: "—", description: isFr ? "Surcharge fins de libellés." : "Fine-grained text overrides." },
      ]}
      notes={[
        ...(t("docs.upgradeModal.notes", { returnObjects: true }) as string[]),
        isFr
          ? "La police Fraunces se charge automatiquement depuis Google Fonts. Pour la remplacer, définissez --saaskit-font-display dans votre CSS : :root { --saaskit-font-display: 'Inter'; }"
          : "The Fraunces font loads automatically from Google Fonts. To replace it, set --saaskit-font-display in your CSS: :root { --saaskit-font-display: 'Inter'; }",
      ]}
      extraSections={[
        containerSection(isFr, "UpgradeModal"),
        themeSection(isFr),
        langSection(
          isFr,
          "UpgradeModal",
          `<UpgradeModal
  open={showUpgrade}
  onClose={() => setShowUpgrade(false)}
  onUpgrade={() => router.push("/checkout?plan=pro")}
  featureName="Audit Logs"
  currentPlan="free"
  targetPlan="pro"
  lang="fr"
/>

// ${isFr ? "Surcharger certains libellés" : "Override specific labels"}
<UpgradeModal
  open={showUpgrade}
  onClose={() => {}}
  onUpgrade={() => {}}
  lang="fr"
  labels={{
    title: "Passez à la vitesse supérieure",
    ctaBtn: (plan) => \`Activer \${plan} maintenant\`,
  }}
/>`,
        ),
      ]}
      prevDoc={{ name: "OnboardingSteps", path: "/docs/onboarding-steps" }}
      nextDoc={{ name: "TeamInvite", path: "/docs/team-invite" }}
    />
  );
}
