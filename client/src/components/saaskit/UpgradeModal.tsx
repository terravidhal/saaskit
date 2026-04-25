import { Check, Zap, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface UpgradeModalProps {
  open: boolean;
  onClose: () => void;
  onUpgrade: () => void;
  featureName?: string;
  currentPlan?: "free" | "pro";
  targetPlan?: "pro" | "enterprise";
  features?: string[];
  price?: { monthly: number; annual: number };
  className?: string;
}

export function UpgradeModal({
  open,
  onClose,
  onUpgrade,
  featureName,
  currentPlan = "free",
  targetPlan = "pro",
  features,
  price = { monthly: 29, annual: 23 },
  className,
}: UpgradeModalProps) {
  const { t } = useTranslation();

  if (!open) return null;

  const defaultFeatures = {
    pro: [
      t("components.upgradeModal.features.pro.0", { defaultValue: "Membres d'équipe illimités" }),
      t("components.upgradeModal.features.pro.1", { defaultValue: "500 000 appels API / mois" }),
      t("components.upgradeModal.features.pro.2", { defaultValue: "50 GB de stockage" }),
      t("components.upgradeModal.features.pro.3", { defaultValue: "Support prioritaire" }),
      t("components.upgradeModal.features.pro.4", { defaultValue: "Audit logs" }),
    ],
    enterprise: [
      t("components.upgradeModal.features.enterprise.0", { defaultValue: "Tout le plan Pro" }),
      t("components.upgradeModal.features.enterprise.1", { defaultValue: "SSO / SAML" }),
      t("components.upgradeModal.features.enterprise.2", { defaultValue: "SLA garanti 99.9%" }),
      t("components.upgradeModal.features.enterprise.3", { defaultValue: "Gestionnaire de compte dédié" }),
      t("components.upgradeModal.features.enterprise.4", { defaultValue: "Appels API illimités" }),
      t("components.upgradeModal.features.enterprise.5", { defaultValue: "Contrats personnalisés" }),
    ],
  };

  const featureList = features ?? defaultFeatures[targetPlan];
  const planLabel = targetPlan === "pro" ? "Pro" : "Enterprise";
  const planBadgeClass = targetPlan === "pro" ? "plan-badge-pro" : "plan-badge-enterprise";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={cn(
          "relative z-10 w-full max-w-md rounded-xl border border-border bg-card shadow-2xl",
          "animate-fade-in-up",
          className
        )}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-6">
          {/* Header */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-8 w-8 rounded-lg bg-primary/15 flex items-center justify-center">
                <Zap className="h-4 w-4 text-primary" />
              </div>
              <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", planBadgeClass)}>
                {planLabel.toUpperCase()}
              </span>
            </div>

            {featureName ? (
              <>
                <h2 className="text-lg font-bold text-foreground font-[Fraunces] mb-1">
                  {t("components.upgradeModal.unlockFeature", { feature: featureName, defaultValue: `Débloquez ${featureName}` })}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {t("components.upgradeModal.featureAvailableIn", { plan: planLabel, defaultValue: `Cette fonctionnalité est disponible à partir du plan ${planLabel}.` })}
                </p>
              </>
            ) : (
              <>
                <h2 className="text-lg font-bold text-foreground font-[Fraunces] mb-1">
                  {t("components.upgradeModal.passToPlan", { plan: planLabel, defaultValue: `Passez au plan ${planLabel}` })}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {t("components.upgradeModal.subtitle", { defaultValue: "Accédez à des fonctionnalités avancées pour accélérer votre croissance." })}
                </p>
              </>
            )}
          </div>

          {/* Feature list */}
          <ul className="space-y-2 mb-5">
            {featureList.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{feature}</span>
              </li>
            ))}
          </ul>

          {/* Price */}
          <div className="rounded-lg bg-muted/30 border border-border p-3 mb-5 flex items-center justify-between">
            <div>
              <span className="text-xs text-muted-foreground">{t("components.upgradeModal.startingFrom", { defaultValue: "À partir de" })}</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-foreground font-[Fraunces]">
                  ${price.annual}
                </span>
                <span className="text-sm text-muted-foreground">{t("components.pricingTable.perMonth", { defaultValue: "/mois" })}</span>
              </div>
              <span className="text-xs text-muted-foreground">{t("components.upgradeModal.billedAnnual", { defaultValue: "Facturé annuellement" })}</span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-primary/15 text-primary border border-primary/30">
                {t("components.upgradeModal.savePercent", { percent: "20%", defaultValue: "Économisez 20%" })}
              </span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-2">
            <button
              onClick={onUpgrade}
              className="w-full py-2.5 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <Zap className="h-4 w-4" />
              {t("components.upgradeModal.cta", { plan: planLabel, defaultValue: `Passer au ${planLabel} maintenant` })}
            </button>
            <button
              onClick={onClose}
              className="w-full py-2 px-4 rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("components.upgradeModal.stayOnPlan", { plan: currentPlan === "free" ? "Free" : "Pro", defaultValue: `Rester sur le plan ${currentPlan === "free" ? "Free" : "Pro"}` })}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
