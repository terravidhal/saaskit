import { useState } from "react";
import { X, Clock, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface TrialBannerProps {
  daysRemaining: number;
  onUpgrade?: () => void;
  onDismiss?: () => void;
  planName?: string;
  className?: string;
}

export function TrialBanner({
  daysRemaining,
  onUpgrade,
  onDismiss,
  planName = "Pro",
  className,
}: TrialBannerProps) {
  const { t } = useTranslation();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const urgency = daysRemaining <= 3 ? "danger" : daysRemaining <= 7 ? "warn" : "normal";

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  const getMessage = () => {
    if (daysRemaining === 0) return t("components.trialBanner.expireToday");
    if (daysRemaining === 1) return t("components.trialBanner.oneDayLeft");
    return t("components.trialBanner.daysLeft", { count: daysRemaining });
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
          {t("components.trialBanner.upgradeContinue", { plan: planName })}
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
          {t("components.trialBanner.upgradeBtn", { plan: planName })}
        </button>
        <button
          onClick={handleDismiss}
          className="p-1 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
          aria-label={t("components.trialBanner.close")}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
