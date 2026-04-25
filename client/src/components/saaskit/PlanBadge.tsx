/**
 * @saaskit/plan-badge
 * Design: Developer-first Brutalism Doux — dark bg, emerald accent
 * Usage: npx shadcn add @saaskit/plan-badge
 *
 * Badge Free / Pro / Enterprise dans le header
 */

import { Zap, Building2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export type Plan = "free" | "pro" | "enterprise" | "trial";

interface PlanBadgeProps {
  plan: Plan;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  onClick?: () => void;
  className?: string;
}

const planConfig: Record<
  Plan,
  { label: string; icon: React.ElementType; className: string }
> = {
  free: {
    label: "Free",
    icon: Sparkles,
    className: "plan-badge-free",
  },
  trial: {
    label: "Trial",
    icon: Zap,
    className:
      "bg-yellow-500/10 text-yellow-400 border border-yellow-500/25",
  },
  pro: {
    label: "Pro",
    icon: Zap,
    className: "plan-badge-pro",
  },
  enterprise: {
    label: "Enterprise",
    icon: Building2,
    className: "plan-badge-enterprise",
  },
};

const sizeConfig = {
  sm: {
    badge: "text-xs px-1.5 py-0.5 gap-1",
    icon: "h-2.5 w-2.5",
  },
  md: {
    badge: "text-xs px-2 py-0.5 gap-1.5",
    icon: "h-3 w-3",
  },
  lg: {
    badge: "text-sm px-2.5 py-1 gap-1.5",
    icon: "h-3.5 w-3.5",
  },
};

export function PlanBadge({
  plan,
  size = "md",
  showIcon = true,
  onClick,
  className,
}: PlanBadgeProps) {
  const config = planConfig[plan];
  const sizes = sizeConfig[size];
  const Icon = config.icon;

  const Component = onClick ? "button" : "span";

  return (
    <Component
      onClick={onClick}
      className={cn(
        "inline-flex items-center rounded-full font-semibold font-mono transition-opacity",
        sizes.badge,
        config.className,
        onClick && "hover:opacity-80 cursor-pointer",
        className
      )}
    >
      {showIcon && <Icon className={cn(sizes.icon, "flex-shrink-0")} />}
      {config.label}
    </Component>
  );
}

/* Compound: PlanBadgeWithCTA — badge cliquable avec tooltip upgrade */
interface PlanBadgeWithCTAProps extends PlanBadgeProps {
  onUpgrade?: () => void;
  upgradeLabel?: string;
}

export function PlanBadgeWithCTA({
  plan,
  onUpgrade,
  upgradeLabel = "Passer au Pro",
  ...props
}: PlanBadgeWithCTAProps) {
  if (plan === "free" || plan === "trial") {
    return (
      <button
        onClick={onUpgrade}
        className="group flex items-center gap-1.5"
        title={upgradeLabel}
      >
        <PlanBadge plan={plan} {...props} />
        <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors hidden sm:inline">
          → {upgradeLabel}
        </span>
      </button>
    );
  }

  return <PlanBadge plan={plan} {...props} />;
}
