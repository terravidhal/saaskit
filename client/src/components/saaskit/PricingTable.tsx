import { useState } from "react";
import { Check, Minus, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface PricingFeature {
  name: string;
  free: boolean | string;
  pro: boolean | string;
  enterprise: boolean | string;
}

interface PricingTableProps {
  features?: PricingFeature[];
  onSelectPlan?: (plan: "free" | "pro" | "enterprise", billing: "monthly" | "annual") => void;
  className?: string;
}

export function PricingTable({ features, onSelectPlan, className }: PricingTableProps) {
  const { t } = useTranslation();
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  const defaultFeatures: PricingFeature[] = [
    { name: t("components.pricingTable.features.projects", { defaultValue: "Projets actifs" }), free: "3", pro: "Illimité", enterprise: "Illimité" },
    { name: t("components.pricingTable.features.team", { defaultValue: "Membres d'équipe" }), free: "1", pro: "10", enterprise: "Illimité" },
    { name: t("components.pricingTable.features.api", { defaultValue: "Appels API / mois" }), free: "10 000", pro: "500 000", enterprise: "Illimité" },
    { name: t("components.pricingTable.features.storage", { defaultValue: "Stockage" }), free: "1 GB", pro: "50 GB", enterprise: "500 GB" },
    { name: t("components.pricingTable.features.support", { defaultValue: "Support prioritaire" }), free: false, pro: true, enterprise: true },
    { name: t("components.pricingTable.features.sso", { defaultValue: "SSO / SAML" }), free: false, pro: false, enterprise: true },
    { name: t("components.pricingTable.features.audit", { defaultValue: "Audit logs" }), free: false, pro: true, enterprise: true },
    { name: t("components.pricingTable.features.sla", { defaultValue: "SLA garanti" }), free: false, pro: false, enterprise: true },
  ];

  const displayFeatures = features || defaultFeatures;

  const prices = {
    free: { monthly: 0, annual: 0 },
    pro: { monthly: 29, annual: 23 },
    enterprise: { monthly: 99, annual: 79 },
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Billing toggle */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <button
          onClick={() => setBilling("monthly")}
          className={cn(
            "text-sm font-medium transition-colors",
            billing === "monthly" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
          )}
        >
          {t("components.pricingTable.monthly")}
        </button>
        <button
          onClick={() => setBilling(billing === "monthly" ? "annual" : "monthly")}
          className={cn(
            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            billing === "annual"
              ? "bg-primary"
              : "bg-muted"
          )}
          role="switch"
          aria-checked={billing === "annual"}
        >
          <span
            className={cn(
              "inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform",
              billing === "annual" ? "translate-x-6" : "translate-x-1"
            )}
          />
        </button>
        <button
          onClick={() => setBilling("annual")}
          className={cn(
            "text-sm font-medium transition-colors flex items-center gap-1.5",
            billing === "annual" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
          )}
        >
          {t("components.pricingTable.annual")}
          <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-primary/15 text-primary border border-primary/30">
            −20%
          </span>
        </button>
      </div>

      {/* Plans grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Free */}
        <div className="rounded-lg border border-border bg-card p-6 flex flex-col">
          <div className="mb-4">
            <span className="plan-badge-free text-xs font-semibold px-2 py-0.5 rounded-full">{t("components.pricingTable.free")}</span>
          </div>
          <div className="mb-1">
            <span className="text-3xl font-bold text-foreground font-[Fraunces]">$0</span>
            <span className="text-muted-foreground text-sm ml-1">{t("components.pricingTable.perMonth")}</span>
          </div>
          <p className="text-sm text-muted-foreground mb-6">{t("components.pricingTable.defaultDesc.free")}</p>
          <button
            onClick={() => onSelectPlan?.("free", billing)}
            className="w-full py-2 px-4 rounded-md border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors"
          >
            {t("components.pricingTable.startFree")}
          </button>
        </div>

        {/* Pro — highlighted */}
        <div className="rounded-lg border border-primary/50 bg-card p-6 flex flex-col relative shadow-[0_0_0_1px_var(--primary)/20%,0_8px_32px_var(--primary)/10%]">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-primary text-primary-foreground shadow-sm">
              <Zap className="h-3 w-3" />
              {t("components.pricingTable.recommended")}
            </span>
          </div>
          <div className="mb-4">
            <span className="plan-badge-pro text-xs font-semibold px-2 py-0.5 rounded-full">{t("components.pricingTable.pro")}</span>
          </div>
          <div className="mb-1">
            <span className="text-3xl font-bold text-foreground font-[Fraunces]">
              ${prices.pro[billing]}
            </span>
            <span className="text-muted-foreground text-sm ml-1">{t("components.pricingTable.perMonth")}</span>
          </div>
          {billing === "annual" && (
            <p className="text-xs text-primary mb-1">{t("components.pricingTable.billedAnnual", { amount: `$${prices.pro.annual * 12}` })}</p>
          )}
          <p className="text-sm text-muted-foreground mb-6">{t("components.pricingTable.defaultDesc.pro")}</p>
          <button
            onClick={() => onSelectPlan?.("pro", billing)}
            className="w-full py-2 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            {t("components.pricingTable.upgradePro")}
          </button>
        </div>

        {/* Enterprise */}
        <div className="rounded-lg border border-border bg-card p-6 flex flex-col">
          <div className="mb-4">
            <span className="plan-badge-enterprise text-xs font-semibold px-2 py-0.5 rounded-full">{t("components.pricingTable.enterprise")}</span>
          </div>
          <div className="mb-1">
            <span className="text-3xl font-bold text-foreground font-[Fraunces]">
              ${prices.enterprise[billing]}
            </span>
            <span className="text-muted-foreground text-sm ml-1">{t("components.pricingTable.perMonth")}</span>
          </div>
          {billing === "annual" && (
            <p className="text-xs text-yellow-400/80 mb-1">{t("components.pricingTable.billedAnnual", { amount: `$${prices.enterprise.annual * 12}` })}</p>
          )}
          <p className="text-sm text-muted-foreground mb-6">{t("components.pricingTable.defaultDesc.enterprise")}</p>
          <button
            onClick={() => onSelectPlan?.("enterprise", billing)}
            className="w-full py-2 px-4 rounded-md border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors"
          >
            {t("components.pricingTable.contactSales")}
          </button>
        </div>
      </div>

      {/* Feature comparison table */}
      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left px-4 py-3 text-muted-foreground font-medium">{t("components.pricingTable.feature")}</th>
              <th className="text-center px-4 py-3 text-muted-foreground font-medium">{t("components.pricingTable.free")}</th>
              <th className="text-center px-4 py-3 text-primary font-semibold">{t("components.pricingTable.pro")}</th>
              <th className="text-center px-4 py-3 text-muted-foreground font-medium">{t("components.pricingTable.enterprise")}</th>
            </tr>
          </thead>
          <tbody>
            {displayFeatures.map((feature, i) => (
              <tr
                key={feature.name}
                className={cn(
                  "border-b border-border last:border-0",
                  i % 2 === 0 ? "bg-transparent" : "bg-muted/10"
                )}
              >
                <td className="px-4 py-3 text-foreground">{feature.name}</td>
                <td className="px-4 py-3 text-center">
                  <FeatureValue value={feature.free} />
                </td>
                <td className="px-4 py-3 text-center">
                  <FeatureValue value={feature.pro} />
                </td>
                <td className="px-4 py-3 text-center">
                  <FeatureValue value={feature.enterprise} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FeatureValue({ value }: { value: boolean | string }) {
  if (value === false) return <Minus className="h-4 w-4 text-muted-foreground mx-auto" />;
  if (value === true) return <Check className="h-4 w-4 text-emerald-400 mx-auto" />;
  return <span className="text-sm text-foreground">{value}</span>;
}
