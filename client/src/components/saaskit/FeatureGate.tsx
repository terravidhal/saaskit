"use client";

import { Lock, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Plan } from "./PlanBadge";

type Lang = "en" | "fr";
type GateMode = "blur" | "overlay" | "replace" | "hide";

interface FeatureGateLabels {
  featurePlan?: (feature: string | undefined, plan: string) => string;
  upgradeDesc?: (plan: string) => string;
  upgradeBtn?: (plan: string) => string;
  featureAvailable?: (feature: string | undefined, plan: string) => string;
  upgradeLink?: (plan: string) => string;
}

const T: Record<Lang, Required<FeatureGateLabels>> = {
  en: {
    featurePlan: (feature, plan) => feature ? `${feature} — ${plan} plan` : `${plan} feature`,
    upgradeDesc: (plan) => `Upgrade to the ${plan} plan to access this feature.`,
    upgradeBtn: (plan) => `Upgrade to ${plan}`,
    featureAvailable: (feature, plan) => feature
      ? `${feature} is available with the ${plan} plan.`
      : `This feature requires the ${plan} plan.`,
    upgradeLink: (plan) => `Upgrade to ${plan} →`,
  },
  fr: {
    featurePlan: (feature, plan) => feature ? `${feature} — Plan ${plan}` : `Fonctionnalité ${plan}`,
    upgradeDesc: (plan) => `Passez au plan ${plan} pour accéder à cette fonctionnalité.`,
    upgradeBtn: (plan) => `Passer au ${plan}`,
    featureAvailable: (feature, plan) => feature
      ? `${feature} est disponible avec le plan ${plan}.`
      : `Cette fonctionnalité nécessite le plan ${plan}.`,
    upgradeLink: (plan) => `Passer au ${plan} →`,
  },
};

interface FeatureGateProps {
  currentPlan: Plan;
  requiredPlans: Plan[];
  children: React.ReactNode;
  mode?: GateMode;
  featureName?: string;
  requiredPlan?: "pro" | "enterprise";
  onUpgrade?: () => void;
  fallback?: React.ReactNode;
  lang?: Lang;
  labels?: FeatureGateLabels;
  className?: string;
}

const planHierarchy: Record<Plan, number> = { free: 0, trial: 1, pro: 2, enterprise: 3 };

export function FeatureGate({
  currentPlan,
  requiredPlans,
  children,
  mode = "overlay",
  featureName,
  requiredPlan = "pro",
  onUpgrade,
  fallback,
  lang = "en",
  labels,
  className,
}: FeatureGateProps) {
  const hasAccess = requiredPlans.includes(currentPlan);
  if (hasAccess) return <>{children}</>;
  if (mode === "hide") return null;

  const base = T[lang];
  const L = {
    featurePlan: labels?.featurePlan ?? base.featurePlan,
    upgradeDesc: labels?.upgradeDesc ?? base.upgradeDesc,
    upgradeBtn: labels?.upgradeBtn ?? base.upgradeBtn,
    featureAvailable: labels?.featureAvailable ?? base.featureAvailable,
    upgradeLink: labels?.upgradeLink ?? base.upgradeLink,
  };

  if (mode === "replace") {
    if (fallback) return <>{fallback}</>;
    return <GateMessage featureName={featureName} requiredPlan={requiredPlan} onUpgrade={onUpgrade} L={L} className={className} />;
  }

  const planLabel = requiredPlan === "pro" ? "Pro" : "Enterprise";

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "pointer-events-none select-none",
          mode === "blur" && "blur-sm opacity-50",
          mode === "overlay" && "opacity-30"
        )}
        aria-hidden="true"
      >
        {children}
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="rounded-lg border border-border bg-card/95 backdrop-blur-sm shadow-xl p-5 text-center max-w-xs mx-4">
          <div className="mx-auto mb-3 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Lock className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-sm font-semibold text-foreground mb-1">
            {L.featurePlan(featureName, planLabel)}
          </h3>
          <p className="text-xs text-muted-foreground mb-4">{L.upgradeDesc(planLabel)}</p>
          {onUpgrade && (
            <button
              onClick={onUpgrade}
              className="flex items-center gap-1.5 mx-auto text-xs font-semibold px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <Zap className="h-3 w-3" />
              {L.upgradeBtn(planLabel)}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function GateMessage({
  featureName, requiredPlan = "pro", onUpgrade, L, className,
}: {
  featureName?: string;
  requiredPlan?: "pro" | "enterprise";
  onUpgrade?: () => void;
  L: Required<FeatureGateLabels>;
  className?: string;
}) {
  const planLabel = requiredPlan === "pro" ? "Pro" : "Enterprise";
  return (
    <div className={cn("rounded-lg border border-dashed border-border bg-muted/20 p-6 text-center", className)}>
      <Lock className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
      <p className="text-sm text-muted-foreground mb-3">{L.featureAvailable(featureName, planLabel)}</p>
      {onUpgrade && (
        <button onClick={onUpgrade} className="text-sm font-semibold text-primary hover:underline">
          {L.upgradeLink(planLabel)}
        </button>
      )}
    </div>
  );
}

export function useFeatureAccess(currentPlan: Plan, requiredPlans: Plan[]): boolean {
  return requiredPlans.includes(currentPlan);
}

export function usePlanAccess(currentPlan: Plan, minimumPlan: Plan): boolean {
  return planHierarchy[currentPlan] >= planHierarchy[minimumPlan];
}
