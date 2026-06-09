"use client";

import { Check, Zap, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Lang = "en" | "fr";

interface UpgradeModalLabels {
  unlockFeature?: (feature: string) => string;
  featureAvailableIn?: (plan: string) => string;
  passToPlan?: (plan: string) => string;
  subtitle?: string;
  featureTitle?: string;
  startingFrom?: string;
  perMonth?: string;
  billedAnnual?: string;
  savePercent?: (percent: string) => string;
  cta?: (plan: string) => string;
  stayOnPlan?: (plan: string) => string;
  defaultFeaturesPro?: string[];
  defaultFeaturesEnterprise?: string[];
}

const T: Record<Lang, Required<UpgradeModalLabels>> = {
  en: {
    unlockFeature: (feature) => `Unlock ${feature}`,
    featureAvailableIn: (plan) => `This feature is available from the ${plan} plan.`,
    passToPlan: (plan) => `Upgrade to ${plan}`,
    subtitle: "Access advanced features to accelerate your growth.",
    featureTitle: "Unlock this feature",
    startingFrom: "Starting from",
    perMonth: "/month",
    billedAnnual: "Billed annually",
    savePercent: (percent) => `Save ${percent}`,
    cta: (plan) => `Upgrade to ${plan} now`,
    stayOnPlan: (plan) => `Stay on ${plan} plan`,
    defaultFeaturesPro: [
      "Unlimited team members",
      "500,000 API calls / month",
      "50 GB storage",
      "Priority support",
      "Audit logs",
    ],
    defaultFeaturesEnterprise: [
      "Everything in Pro",
      "SSO / SAML",
      "99.9% guaranteed SLA",
      "Dedicated account manager",
      "Unlimited API calls",
      "Custom contracts",
    ],
  },
  fr: {
    unlockFeature: (feature) => `Débloquez ${feature}`,
    featureAvailableIn: (plan) => `Cette fonctionnalité est disponible à partir du plan ${plan}.`,
    passToPlan: (plan) => `Passez au plan ${plan}`,
    subtitle: "Accédez à des fonctionnalités avancées pour accélérer votre croissance.",
    featureTitle: "Débloquer cette fonctionnalité",
    startingFrom: "À partir de",
    perMonth: "/mois",
    billedAnnual: "Facturé annuellement",
    savePercent: (percent) => `Économisez ${percent}`,
    cta: (plan) => `Passer au ${plan} maintenant`,
    stayOnPlan: (plan) => `Rester sur le plan ${plan}`,
    defaultFeaturesPro: [
      "Membres d'équipe illimités",
      "500 000 appels API / mois",
      "50 GB de stockage",
      "Support prioritaire",
      "Audit logs",
    ],
    defaultFeaturesEnterprise: [
      "Tout le plan Pro",
      "SSO / SAML",
      "SLA garanti 99.9%",
      "Gestionnaire de compte dédié",
      "Appels API illimités",
      "Contrats personnalisés",
    ],
  },
};

interface UpgradeModalProps {
  open: boolean;
  onClose: () => void;
  onUpgrade: () => void;
  featureName?: string;
  currentPlan?: "free" | "pro";
  targetPlan?: "pro" | "enterprise";
  features?: string[];
  price?: { monthly: number; annual: number };
  lang?: Lang;
  labels?: UpgradeModalLabels;
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
  lang = "en",
  labels,
  className,
}: UpgradeModalProps) {
  if (!open) return null;

  const base = T[lang];
  const L = {
    unlockFeature: labels?.unlockFeature ?? base.unlockFeature,
    featureAvailableIn: labels?.featureAvailableIn ?? base.featureAvailableIn,
    passToPlan: labels?.passToPlan ?? base.passToPlan,
    subtitle: labels?.subtitle ?? base.subtitle,
    startingFrom: labels?.startingFrom ?? base.startingFrom,
    perMonth: labels?.perMonth ?? base.perMonth,
    billedAnnual: labels?.billedAnnual ?? base.billedAnnual,
    savePercent: labels?.savePercent ?? base.savePercent,
    cta: labels?.cta ?? base.cta,
    stayOnPlan: labels?.stayOnPlan ?? base.stayOnPlan,
    defaultFeaturesPro: labels?.defaultFeaturesPro ?? base.defaultFeaturesPro,
    defaultFeaturesEnterprise: labels?.defaultFeaturesEnterprise ?? base.defaultFeaturesEnterprise,
  };

  const defaultFeatures = { pro: L.defaultFeaturesPro, enterprise: L.defaultFeaturesEnterprise };
  const featureList = features ?? defaultFeatures[targetPlan];
  const planLabel = targetPlan === "pro" ? "Pro" : "Enterprise";
  const planBadgeClass =
    targetPlan === "pro"
      ? "bg-primary/15 text-primary border border-primary/30"
      : "bg-[oklch(0.75_0.15_80/15%)] text-[oklch(0.80_0.15_80)] border border-[oklch(0.75_0.15_80/30%)]";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div
        className={cn(
          "relative z-10 w-full max-w-md rounded-xl border border-border bg-card shadow-2xl",
          "animate-fade-in-up",
          className
        )}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-6">
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
                  {L.unlockFeature(featureName)}
                </h2>
                <p className="text-sm text-muted-foreground">{L.featureAvailableIn(planLabel)}</p>
              </>
            ) : (
              <>
                <h2 className="text-lg font-bold text-foreground font-[Fraunces] mb-1">
                  {L.passToPlan(planLabel)}
                </h2>
                <p className="text-sm text-muted-foreground">{L.subtitle}</p>
              </>
            )}
          </div>

          <ul className="space-y-2 mb-5">
            {featureList.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="rounded-lg bg-muted/30 border border-border p-3 mb-5 flex items-center justify-between">
            <div>
              <span className="text-xs text-muted-foreground">{L.startingFrom}</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-foreground font-[Fraunces]">
                  ${price.annual}
                </span>
                <span className="text-sm text-muted-foreground">{L.perMonth}</span>
              </div>
              <span className="text-xs text-muted-foreground">{L.billedAnnual}</span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-primary/15 text-primary border border-primary/30">
                {L.savePercent("20%")}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={onUpgrade}
              className="w-full py-2.5 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <Zap className="h-4 w-4" />
              {L.cta(planLabel)}
            </button>
            <button
              onClick={onClose}
              className="w-full py-2 px-4 rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {L.stayOnPlan(currentPlan === "free" ? "Free" : "Pro")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
