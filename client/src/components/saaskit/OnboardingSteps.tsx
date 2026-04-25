import { useState } from "react";
import { Check, ChevronRight, SkipForward, Circle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed?: boolean;
  skipped?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
  skippable?: boolean;
}

interface OnboardingStepsProps {
  steps: OnboardingStep[];
  onStepComplete?: (stepId: string) => void;
  onStepSkip?: (stepId: string) => void;
  onAllComplete?: () => void;
  className?: string;
}

export function OnboardingSteps({
  steps: initialSteps,
  onStepComplete,
  onStepSkip,
  onAllComplete,
  className,
}: OnboardingStepsProps) {
  const { t } = useTranslation();
  const [steps, setSteps] = useState(initialSteps);
  const [expandedStep, setExpandedStep] = useState<string | null>(
    initialSteps.find((s) => !s.completed && !s.skipped)?.id ?? null
  );

  const completedCount = steps.filter((s) => s.completed).length;
  const totalCount = steps.length;
  const progressPercent = (completedCount / totalCount) * 100;
  const allDone = completedCount === totalCount;

  const handleComplete = (stepId: string) => {
    setSteps((prev) =>
      prev.map((s) => (s.id === stepId ? { ...s, completed: true } : s))
    );
    onStepComplete?.(stepId);

    // Auto-expand next incomplete step
    const currentIndex = steps.findIndex((s) => s.id === stepId);
    const nextStep = steps.slice(currentIndex + 1).find((s) => !s.completed && !s.skipped);
    setExpandedStep(nextStep?.id ?? null);

    if (completedCount + 1 === totalCount) {
      onAllComplete?.();
    }
  };

  const handleSkip = (stepId: string) => {
    setSteps((prev) =>
      prev.map((s) => (s.id === stepId ? { ...s, skipped: true } : s))
    );
    onStepSkip?.(stepId);

    const currentIndex = steps.findIndex((s) => s.id === stepId);
    const nextStep = steps.slice(currentIndex + 1).find((s) => !s.completed && !s.skipped);
    setExpandedStep(nextStep?.id ?? null);
  };

  if (allDone) {
    return (
      <div className={cn("rounded-lg border border-primary/30 bg-primary/5 p-6 text-center", className)}>
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/15">
          <Check className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-base font-semibold text-foreground mb-1">{t("components.onboardingSteps.complete")}</h3>
        <p className="text-sm text-muted-foreground">{t("components.onboardingSteps.completeDesc")}</p>
      </div>
    );
  }

  return (
    <div className={cn("rounded-lg border border-border bg-card overflow-hidden", className)}>
      {/* Header with progress */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-foreground">{t("usageMeter.onboardingTitle", { defaultValue: "Mise en route" })}</h3>
          <span className="text-xs font-mono text-muted-foreground">
            {t("components.onboardingSteps.steps", { completed: completedCount, total: totalCount })}
          </span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Steps list */}
      <div className="divide-y divide-border">
        {steps.map((step) => {
          const isExpanded = expandedStep === step.id;
          const isDone = step.completed;
          const isSkipped = step.skipped;

          return (
            <div
              key={step.id}
              className={cn(
                "transition-colors",
                isDone && "opacity-60",
                isSkipped && "opacity-40"
              )}
            >
              <button
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/20 transition-colors"
                onClick={() => !isDone && !isSkipped && setExpandedStep(isExpanded ? null : step.id)}
              >
                {/* Step indicator */}
                <div className="flex-shrink-0">
                  {isDone ? (
                    <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </div>
                  ) : isSkipped ? (
                    <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center">
                      <SkipForward className="h-3 w-3 text-muted-foreground" />
                    </div>
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <span
                    className={cn(
                      "text-sm font-medium",
                      isDone || isSkipped ? "text-muted-foreground line-through" : "text-foreground"
                    )}
                  >
                    {step.title}
                  </span>
                </div>

                {!isDone && !isSkipped && (
                  <ChevronRight
                    className={cn(
                      "h-4 w-4 text-muted-foreground transition-transform flex-shrink-0",
                      isExpanded && "rotate-90"
                    )}
                  />
                )}
              </button>

              {/* Expanded content */}
              {isExpanded && !isDone && !isSkipped && (
                <div className="px-4 pb-4 pl-12">
                  <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                  <div className="flex items-center gap-2">
                    {step.action && (
                      <button
                        onClick={() => {
                          step.action?.onClick();
                          handleComplete(step.id);
                        }}
                        className="text-sm font-medium px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                      >
                        {step.action.label}
                      </button>
                    )}
                    <button
                      onClick={() => handleComplete(step.id)}
                      className="text-sm font-medium px-3 py-1.5 rounded-md border border-border text-foreground hover:bg-secondary transition-colors"
                    >
                      {t("components.onboardingSteps.markDone")}
                    </button>
                    {step.skippable !== false && (
                      <button
                        onClick={() => handleSkip(step.id)}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors ml-auto"
                      >
                        {t("components.onboardingSteps.skip")}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
