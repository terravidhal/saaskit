import { ComponentDocPage } from "@/components/ComponentDocPage";
import { TrialBanner } from "@/components/saaskit/TrialBanner";
import { useTranslation } from "react-i18next";

export default function TrialBannerDoc() {
  const { t } = useTranslation();

  return (
    <ComponentDocPage
      name="TrialBanner"
      category={t("docs.trialBanner.category")}
      categoryColor="bg-orange-400/10 text-orange-400 border-orange-400/25"
      description={t("docs.trialBanner.description")}
      installCmd="npx shadcn add @saaskit/trial-banner"
      preview={
        <div className="space-y-3">
          <div className="rounded-lg overflow-hidden border border-border">
            <TrialBanner daysRemaining={12} onUpgrade={() => {}} />
          </div>
          <div className="rounded-lg overflow-hidden border border-border">
            <TrialBanner daysRemaining={5} onUpgrade={() => {}} />
          </div>
          <div className="rounded-lg overflow-hidden border border-border">
            <TrialBanner daysRemaining={1} onUpgrade={() => {}} />
          </div>
        </div>
      }
      usageCode={`import { TrialBanner } from "@/components/saaskit/trial-banner";

export function AppLayout({ children, user }) {
  const daysLeft = getDaysRemainingInTrial(user.trialEndsAt);

  return (
    <div>
      {user.plan === "trial" && (
        <TrialBanner
          daysRemaining={daysLeft}
          planName="Pro"
          onUpgrade={() => router.push("/upgrade")}
          onDismiss={() => trackEvent("trial_banner_dismissed")}
        />
      )}
      <main>{children}</main>
    </div>
  );
}`}
      propsTable={[
        { prop: "daysRemaining", type: "number", required: true, description: t("docs.trialBanner.props.daysRemaining") },
        { prop: "planName", type: "string", default: '"Pro"', description: t("docs.trialBanner.props.planName") },
        { prop: "onUpgrade", type: "() => void", description: t("docs.trialBanner.props.onUpgrade") },
        { prop: "onDismiss", type: "() => void", description: t("docs.trialBanner.props.onDismiss") },
        { prop: "className", type: "string", description: t("docs.trialBanner.props.className") },
      ]}
      notes={t("docs.trialBanner.notes", { returnObjects: true }) as string[]}
      prevDoc={{ name: "PricingTable", path: "/docs/pricing-table" }}
      nextDoc={{ name: "UsageMeter", path: "/docs/usage-meter" }}
    />
  );
}
