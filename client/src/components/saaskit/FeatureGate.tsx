/**
 * @saaskit/feature-gate
 * Design: Developer-first Brutalism Doux — dark bg, emerald accent
 * Usage: npx shadcn add @saaskit/feature-gate
 *
 * Wrapper qui bloque ou affiche un slot selon le plan
 */

import { Lock, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Plan } from "./PlanBadge";

type GateMode = "blur" | "overlay" | "replace" | "hide";

interface FeatureGateProps {
  /** Plan actuel de l'utilisateur */
  currentPlan: Plan;
  /** Plans qui ont accès à cette fonctionnalité */
  requiredPlans: Plan[];
  /** Contenu à afficher si accès autorisé */
  children: React.ReactNode;
  /** Mode de blocage */
  mode?: GateMode;
  /** Nom de la fonctionnalité (affiché dans le message) */
  featureName?: string;
  /** Plan minimum requis (pour le CTA) */
  requiredPlan?: "pro" | "enterprise";
  /** Callback upgrade */
  onUpgrade?: () => void;
  /** Contenu de remplacement personnalisé (mode "replace") */
  fallback?: React.ReactNode;
  className?: string;
}

const planHierarchy: Record<Plan, number> = {
  free: 0,
  trial: 1,
  pro: 2,
  enterprise: 3,
};

export function FeatureGate({
  currentPlan,
  requiredPlans,
  children,
  mode = "overlay",
  featureName,
  requiredPlan = "pro",
  onUpgrade,
  fallback,
  className,
}: FeatureGateProps) {
  const hasAccess = requiredPlans.includes(currentPlan);

  if (hasAccess) {
    return <>{children}</>;
  }

  if (mode === "hide") {
    return null;
  }

  if (mode === "replace") {
    if (fallback) return <>{fallback}</>;
    return (
      <GateMessage
        featureName={featureName}
        requiredPlan={requiredPlan}
        onUpgrade={onUpgrade}
        className={className}
      />
    );
  }

  const planLabel = requiredPlan === "pro" ? "Pro" : "Enterprise";

  return (
    <div className={cn("relative", className)}>
      {/* Blurred content */}
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

      {/* Gate overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="rounded-lg border border-border bg-card/95 backdrop-blur-sm shadow-xl p-5 text-center max-w-xs mx-4">
          <div className="mx-auto mb-3 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Lock className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-sm font-semibold text-foreground mb-1">
            {featureName ? `${featureName} — Plan ${planLabel}` : `Fonctionnalité ${planLabel}`}
          </h3>
          <p className="text-xs text-muted-foreground mb-4">
            Passez au plan {planLabel} pour accéder à cette fonctionnalité.
          </p>
          {onUpgrade && (
            <button
              onClick={onUpgrade}
              className="flex items-center gap-1.5 mx-auto text-xs font-semibold px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <Zap className="h-3 w-3" />
              Passer au {planLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* Helper: GateMessage standalone */
function GateMessage({
  featureName,
  requiredPlan = "pro",
  onUpgrade,
  className,
}: {
  featureName?: string;
  requiredPlan?: "pro" | "enterprise";
  onUpgrade?: () => void;
  className?: string;
}) {
  const planLabel = requiredPlan === "pro" ? "Pro" : "Enterprise";

  return (
    <div
      className={cn(
        "rounded-lg border border-dashed border-border bg-muted/20 p-6 text-center",
        className
      )}
    >
      <Lock className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
      <p className="text-sm text-muted-foreground mb-3">
        {featureName
          ? `${featureName} est disponible avec le plan ${planLabel}.`
          : `Cette fonctionnalité nécessite le plan ${planLabel}.`}
      </p>
      {onUpgrade && (
        <button
          onClick={onUpgrade}
          className="text-sm font-semibold text-primary hover:underline"
        >
          Passer au {planLabel} →
        </button>
      )}
    </div>
  );
}

/**
 * Hook utilitaire : vérifie si l'utilisateur a accès à une fonctionnalité
 */
export function useFeatureAccess(currentPlan: Plan, requiredPlans: Plan[]): boolean {
  return requiredPlans.includes(currentPlan);
}

/**
 * Hook utilitaire : vérifie si l'utilisateur a un plan >= au plan requis
 */
export function usePlanAccess(currentPlan: Plan, minimumPlan: Plan): boolean {
  return planHierarchy[currentPlan] >= planHierarchy[minimumPlan];
}
