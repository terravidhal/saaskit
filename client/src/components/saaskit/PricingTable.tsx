"use client";

import type * as React from "react";
import { useState, useEffect } from "react";
import { Check, Minus, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

function useSaaskitFont() {
  useEffect(() => {
    const id = "__saaskit_font";
    if (typeof document === "undefined" || document.getElementById(id)) return;
    const link = Object.assign(document.createElement("link"), {
      id,
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,100..900&display=swap",
    });
    document.head.appendChild(link);
  }, []);
}

type Lang = "en" | "fr";

interface PricingFeature {
  name: string;
  free: boolean | string;
  pro: boolean | string;
  enterprise: boolean | string;
}

interface PricingTableLabels {
  monthly?: string;
  annual?: string;
  recommended?: string;
  free?: string;
  pro?: string;
  enterprise?: string;
  perMonth?: string;
  startFree?: string;
  upgradePro?: string;
  contactSales?: string;
  feature?: string;
  billedAnnual?: (amount: string) => string;
  descriptions?: { free?: string; pro?: string; enterprise?: string };
}

const T: Record<Lang, Required<Omit<PricingTableLabels, "descriptions">> & { descriptions: Required<NonNullable<PricingTableLabels["descriptions"]>> }> = {
  en: {
    monthly: "Monthly",
    annual: "Annual",
    recommended: "Recommended",
    free: "FREE",
    pro: "PRO",
    enterprise: "ENTERPRISE",
    perMonth: "/month",
    startFree: "Get started free",
    upgradePro: "Upgrade to Pro",
    contactSales: "Contact sales",
    feature: "Feature",
    billedAnnual: (amount) => `Billed ${amount}/year`,
    descriptions: {
      free: "For getting started.",
      pro: "For growing teams.",
      enterprise: "For large organizations.",
    },
  },
  fr: {
    monthly: "Mensuel",
    annual: "Annuel",
    recommended: "Recommandé",
    free: "GRATUIT",
    pro: "PRO",
    enterprise: "ENTERPRISE",
    perMonth: "/mois",
    startFree: "Commencer gratuitement",
    upgradePro: "Passer au Pro",
    contactSales: "Contacter les ventes",
    feature: "Fonctionnalité",
    billedAnnual: (amount) => `Facturé ${amount}/an`,
    descriptions: {
      free: "Pour démarrer et tester.",
      pro: "Pour les équipes en croissance.",
      enterprise: "Pour les grandes organisations.",
    },
  },
};

interface PricingTableProps extends Omit<React.ComponentProps<"div">, "children"> {
  features?: PricingFeature[];
  onSelectPlan?: (plan: "free" | "pro" | "enterprise", billing: "monthly" | "annual") => void;
  lang?: Lang;
  labels?: PricingTableLabels;
}

export function PricingTable({ features, onSelectPlan, lang = "en", labels, className, ...rest }: PricingTableProps) {
  useSaaskitFont();
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  const base = T[lang];
  const L = {
    monthly: labels?.monthly ?? base.monthly,
    annual: labels?.annual ?? base.annual,
    recommended: labels?.recommended ?? base.recommended,
    free: labels?.free ?? base.free,
    pro: labels?.pro ?? base.pro,
    enterprise: labels?.enterprise ?? base.enterprise,
    perMonth: labels?.perMonth ?? base.perMonth,
    startFree: labels?.startFree ?? base.startFree,
    upgradePro: labels?.upgradePro ?? base.upgradePro,
    contactSales: labels?.contactSales ?? base.contactSales,
    feature: labels?.feature ?? base.feature,
    billedAnnual: labels?.billedAnnual ?? base.billedAnnual,
    descriptions: {
      free: labels?.descriptions?.free ?? base.descriptions.free,
      pro: labels?.descriptions?.pro ?? base.descriptions.pro,
      enterprise: labels?.descriptions?.enterprise ?? base.descriptions.enterprise,
    },
  };

  const unlimited = lang === "fr" ? "Illimité" : "Unlimited";
  const defaultFeatures: PricingFeature[] = [
    { name: lang === "fr" ? "Projets actifs" : "Active projects", free: "3", pro: unlimited, enterprise: unlimited },
    { name: lang === "fr" ? "Membres d'équipe" : "Team members", free: "1", pro: "10", enterprise: unlimited },
    { name: lang === "fr" ? "Appels API / mois" : "API calls / month", free: "10,000", pro: "500,000", enterprise: unlimited },
    { name: lang === "fr" ? "Stockage" : "Storage", free: "1 GB", pro: "50 GB", enterprise: "500 GB" },
    { name: lang === "fr" ? "Support prioritaire" : "Priority support", free: false, pro: true, enterprise: true },
    { name: "SSO / SAML", free: false, pro: false, enterprise: true },
    { name: lang === "fr" ? "Audit logs" : "Audit logs", free: false, pro: true, enterprise: true },
    { name: lang === "fr" ? "SLA garanti" : "Guaranteed SLA", free: false, pro: false, enterprise: true },
  ];

  const displayFeatures = features ?? defaultFeatures;

  const prices = {
    free: { monthly: 0, annual: 0 },
    pro: { monthly: 29, annual: 23 },
    enterprise: { monthly: 99, annual: 79 },
  };

  return (
    <div className={cn("w-full", className)} {...rest}>
      {/* Billing toggle */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <button
          onClick={() => setBilling("monthly")}
          className={cn(
            "text-sm font-medium transition-colors",
            billing === "monthly" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
          )}
        >
          {L.monthly}
        </button>
        <button
          onClick={() => setBilling(billing === "monthly" ? "annual" : "monthly")}
          className={cn(
            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            billing === "annual" ? "bg-primary" : "bg-muted"
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
          {L.annual}
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
            <span className="bg-muted text-muted-foreground border border-border text-xs font-semibold px-2 py-0.5 rounded-full">
              {L.free}
            </span>
          </div>
          <div className="mb-1">
            <span className="text-3xl font-bold text-foreground font-[family-name:var(--saaskit-font-display,Fraunces)]">$0</span>
            <span className="text-muted-foreground text-sm ml-1">{L.perMonth}</span>
          </div>
          <p className="text-sm text-muted-foreground mb-6">{L.descriptions.free}</p>
          <button
            onClick={() => onSelectPlan?.("free", billing)}
            className="w-full py-2 px-4 rounded-md border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors mt-auto"
          >
            {L.startFree}
          </button>
        </div>

        {/* Pro — highlighted */}
        <div className="rounded-lg border border-primary/50 bg-card p-6 flex flex-col relative ring-1 ring-primary/20 shadow-lg shadow-primary/10">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-primary text-primary-foreground shadow-sm">
              <Zap className="h-3 w-3" />
              {L.recommended}
            </span>
          </div>
          <div className="mb-4">
            <span className="bg-primary/15 text-primary border border-primary/30 text-xs font-semibold px-2 py-0.5 rounded-full">
              {L.pro}
            </span>
          </div>
          <div className="mb-1">
            <span className="text-3xl font-bold text-foreground font-[family-name:var(--saaskit-font-display,Fraunces)]">
              ${prices.pro[billing]}
            </span>
            <span className="text-muted-foreground text-sm ml-1">{L.perMonth}</span>
          </div>
          {billing === "annual" && (
            <p className="text-xs text-primary mb-1">{L.billedAnnual(`$${prices.pro.annual * 12}`)}</p>
          )}
          <p className="text-sm text-muted-foreground mb-6">{L.descriptions.pro}</p>
          <button
            onClick={() => onSelectPlan?.("pro", billing)}
            className="w-full py-2 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity mt-auto"
          >
            {L.upgradePro}
          </button>
        </div>

        {/* Enterprise */}
        <div className="rounded-lg border border-border bg-card p-6 flex flex-col">
          <div className="mb-4">
            <span className="bg-[oklch(0.75_0.15_80/15%)] text-[oklch(0.80_0.15_80)] border border-[oklch(0.75_0.15_80/30%)] text-xs font-semibold px-2 py-0.5 rounded-full">
              {L.enterprise}
            </span>
          </div>
          <div className="mb-1">
            <span className="text-3xl font-bold text-foreground font-[family-name:var(--saaskit-font-display,Fraunces)]">
              ${prices.enterprise[billing]}
            </span>
            <span className="text-muted-foreground text-sm ml-1">{L.perMonth}</span>
          </div>
          {billing === "annual" && (
            <p className="text-xs text-yellow-400/80 mb-1">{L.billedAnnual(`$${prices.enterprise.annual * 12}`)}</p>
          )}
          <p className="text-sm text-muted-foreground mb-6">{L.descriptions.enterprise}</p>
          <button
            onClick={() => onSelectPlan?.("enterprise", billing)}
            className="w-full py-2 px-4 rounded-md border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors mt-auto"
          >
            {L.contactSales}
          </button>
        </div>
      </div>

      {/* Feature comparison table */}
      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left px-4 py-3 text-muted-foreground font-medium">{L.feature}</th>
              <th className="text-center px-4 py-3 text-muted-foreground font-medium">{L.free}</th>
              <th className="text-center px-4 py-3 text-primary font-semibold">{L.pro}</th>
              <th className="text-center px-4 py-3 text-muted-foreground font-medium">{L.enterprise}</th>
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
                <td className="px-4 py-3 text-center"><FeatureValue value={feature.free} /></td>
                <td className="px-4 py-3 text-center"><FeatureValue value={feature.pro} /></td>
                <td className="px-4 py-3 text-center"><FeatureValue value={feature.enterprise} /></td>
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
