import { cn } from "@/lib/utils";
import { TrendingUp, AlertTriangle, AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

interface UsageMeterProps {
  label: string;
  used: number;
  limit: number;
  unit?: string;
  warnThreshold?: number;  // 0-100, default 75
  dangerThreshold?: number; // 0-100, default 90
  showUpgrade?: boolean;
  onUpgrade?: () => void;
  className?: string;
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}k`;
  return n.toString();
}

export function UsageMeter({
  label,
  used,
  limit,
  unit = "",
  warnThreshold = 75,
  dangerThreshold = 90,
  showUpgrade = true,
  onUpgrade,
  className,
}: UsageMeterProps) {
  const { t } = useTranslation();
  const percentage = Math.min((used / limit) * 100, 100);
  const status =
    percentage >= dangerThreshold
      ? "danger"
      : percentage >= warnThreshold
      ? "warn"
      : "normal";

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          {status === "danger" && <AlertCircle className="h-3.5 w-3.5 text-destructive flex-shrink-0" />}
          {status === "warn" && <AlertTriangle className="h-3.5 w-3.5 text-yellow-400 flex-shrink-0" />}
          {status === "normal" && <TrendingUp className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />}
          <span className="text-sm font-medium text-foreground">{label}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              "text-xs font-mono font-medium",
              status === "danger" && "text-destructive",
              status === "warn" && "text-yellow-400",
              status === "normal" && "text-muted-foreground"
            )}
          >
            {formatNumber(used)}{unit}
          </span>
          <span className="text-xs text-muted-foreground">/</span>
          <span className="text-xs font-mono text-muted-foreground">
            {formatNumber(limit)}{unit}
          </span>
          <span
            className={cn(
              "text-xs font-semibold px-1.5 py-0.5 rounded font-mono",
              status === "danger" && "bg-destructive/15 text-destructive",
              status === "warn" && "bg-yellow-500/15 text-yellow-400",
              status === "normal" && "bg-muted text-muted-foreground"
            )}
          >
            {percentage.toFixed(0)}%
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            status === "danger" && "bg-destructive",
            status === "warn" && "bg-yellow-400",
            status === "normal" && "bg-primary"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Warning messages */}
      {status === "danger" && (
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-destructive">
            {t("components.usageMeter.limitDanger")}
          </p>
          {showUpgrade && (
            <button
              onClick={onUpgrade}
              className="text-xs font-semibold text-primary hover:underline flex-shrink-0"
            >
              {t("components.usageMeter.increase")} →
            </button>
          )}
        </div>
      )}
      {status === "warn" && (
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-yellow-400/80">
            {t("components.usageMeter.limitWarn")}
          </p>
          {showUpgrade && (
            <button
              onClick={onUpgrade}
              className="text-xs font-semibold text-primary hover:underline flex-shrink-0"
            >
              {t("components.usageMeter.increase")} →
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* Compound: UsageMeterGroup — plusieurs métriques groupées */
interface UsageMeterGroupProps {
  title?: string;
  meters: Omit<UsageMeterProps, "className">[];
  onUpgrade?: () => void;
  className?: string;
}

export function UsageMeterGroup({ title, meters, onUpgrade, className }: UsageMeterGroupProps) {
  return (
    <div className={cn("rounded-lg border border-border bg-card p-4 space-y-4", className)}>
      {title && (
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      )}
      {meters.map((meter, i) => (
        <UsageMeter key={i} {...meter} onUpgrade={onUpgrade} />
      ))}
    </div>
  );
}
