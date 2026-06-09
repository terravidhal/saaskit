"use client";

import { useState } from "react";
import { X, Clock, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrialBannerLabels {
  expireToday?: string;
  oneDayLeft?: string;
  daysLeft?: (count: number) => string;
  upgradeContinue?: (plan: string) => string;
  upgradeBtn?: (plan: string) => string;
  close?: string;
}

interface TrialBannerProps extends Omit<React.ComponentProps<"div">, "children"> {
  daysRemaining: number;
  onUpgrade?: () => void;
  onDismiss?: () => void;
  planName?: string;
  labels?: TrialBannerLabels;
}

export function TrialBanner({
  daysRemaining,
  onUpgrade,
  onDismiss,
  planName = "Pro",
  labels,
  className,
  ...rest
}: TrialBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const L = {
    expireToday: labels?.expireToday ?? "Votre essai expire aujourd'hui",
    oneDayLeft: labels?.oneDayLeft ?? "Il reste 1 jour à votre essai",
    daysLeft: labels?.daysLeft ?? ((count: number) => `Il reste ${count} jours à votre essai`),
    upgradeContinue: labels?.upgradeContinue ?? ((plan: string) => `— Passez au plan ${plan} pour continuer sans interruption.`),
    upgradeBtn: labels?.upgradeBtn ?? ((plan: string) => `Passer au ${plan}`),
    close: labels?.close ?? "Fermer",
  };

  const urgency = daysRemaining <= 3 ? "danger" : daysRemaining <= 7 ? "warn" : "normal";

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  const getMessage = () => {
    if (daysRemaining === 0) return L.expireToday;
    if (daysRemaining === 1) return L.oneDayLeft;
    return L.daysLeft(daysRemaining);
  };

  return (
    <div
      className={cn(
        "relative flex items-center justify-between gap-3 px-4 py-2.5 text-sm",
        urgency === "danger" && "bg-destructive/15 border-b border-destructive/30",
        urgency === "warn" && "bg-yellow-500/10 border-b border-yellow-500/20",
        urgency === "normal" && "bg-primary/10 border-b border-primary/20",
        className
      )}
      {...rest}
    >
      <div className="flex items-center gap-2 min-w-0">
        <Clock
          className={cn(
            "h-4 w-4 flex-shrink-0",
            urgency === "danger" && "text-destructive",
            urgency === "warn" && "text-yellow-400",
            urgency === "normal" && "text-primary"
          )}
        />
        <span
          className={cn(
            "font-medium",
            urgency === "danger" && "text-destructive",
            urgency === "warn" && "text-yellow-400",
            urgency === "normal" && "text-primary"
          )}
        >
          {getMessage()}
        </span>
        <span className="text-muted-foreground hidden sm:inline">
          {L.upgradeContinue(planName)}
        </span>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={onUpgrade}
          className={cn(
            "flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md transition-colors",
            urgency === "danger" && "bg-destructive text-white hover:bg-destructive/90",
            urgency === "warn" && "bg-yellow-500 text-black hover:bg-yellow-400",
            urgency === "normal" && "bg-primary text-primary-foreground hover:opacity-90"
          )}
        >
          <Zap className="h-3 w-3" />
          {L.upgradeBtn(planName)}
        </button>
        <button
          onClick={handleDismiss}
          className="p-1 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
          aria-label={L.close}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
