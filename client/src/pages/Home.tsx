/**
 * @saaskit — Page d'accueil
 * Design: Developer-first Brutalism Doux
 * Hero avec image générée, présentation des 10 composants
 */

import { Link } from "wouter";
import {
  ArrowRight,
  Package,
  Layers,
  Zap,
  Github,
  ExternalLink,
  CheckCircle2,
  Code2,
} from "lucide-react";
import { DocLayout } from "@/components/DocLayout";
import { InstallBlock } from "@/components/CodeBlock";
import { useTranslation, Trans } from "react-i18next";

//const HERO_BG = "https://d36hbw14aib5lz.cloudfront.net/310519663567950157/WPzUnUj6yx6AwSdeHZG6mm/hero-bg-DkjHqDgNLNL9KphK79xZf4.webp";
//const HERO_BG = "/images/hero/bg-hero.png";
const HERO_BG = "";
// Image générée : grille perspective emerald avec composants UI flottants en wireframe


/*
const components = [
  {
    id: "pricing-table",
    name: "PricingTable",
    category: "Monetisation",
    description: "Plans, toggle mensuel/annuel, highlight plan recommandé.",
    path: "/docs/pricing-table",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10 border-yellow-400/20",
  },
  {
    id: "trial-banner",
    name: "TrialBanner",
    category: "Conversion",
    description: "Bandeau \"J jours restants\" avec CTA upgrade.",
    path: "/docs/trial-banner",
    color: "text-orange-400",
    bg: "bg-orange-400/10 border-orange-400/20",
  },
  {
    id: "usage-meter",
    name: "UsageMeter",
    category: "Usage",
    description: "Barre de quota avec seuils d'alerte (warn / danger).",
    path: "/docs/usage-meter",
    color: "text-blue-400",
    bg: "bg-blue-400/10 border-blue-400/20",
  },
  {
    id: "onboarding-steps",
    name: "OnboardingSteps",
    category: "Activation",
    description: "Checklist de setup avec progression et skip.",
    path: "/docs/onboarding-steps",
    color: "text-green-400",
    bg: "bg-green-400/10 border-green-400/20",
  },
  {
    id: "upgrade-modal",
    name: "UpgradeModal",
    category: "Upsell",
    description: "Modal de passage au plan supérieur, avec feature gate.",
    path: "/docs/upgrade-modal",
    color: "text-purple-400",
    bg: "bg-purple-400/10 border-purple-400/20",
  },
  {
    id: "team-invite",
    name: "TeamInvite",
    category: "Collaboration",
    description: "Invitation par email avec sélection de rôle.",
    path: "/docs/team-invite",
    color: "text-cyan-400",
    bg: "bg-cyan-400/10 border-cyan-400/20",
  },
  {
    id: "invoice-row",
    name: "InvoiceRow",
    category: "Billing",
    description: "Ligne de facture avec statut, montant, téléchargement.",
    path: "/docs/invoice-row",
    color: "text-pink-400",
    bg: "bg-pink-400/10 border-pink-400/20",
  },
  {
    id: "plan-badge",
    name: "PlanBadge",
    category: "Identity",
    description: "Badge Free / Pro / Enterprise dans le header.",
    path: "/docs/plan-badge",
    color: "text-primary",
    bg: "bg-primary/10 border-primary/20",
  },
  {
    id: "api-key-card",
    name: "ApiKeyCard",
    category: "Developer",
    description: "Affichage + rotation de clé API masquée.",
    path: "/docs/api-key-card",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10 border-emerald-400/20",
  },
  {
    id: "feature-gate",
    name: "FeatureGate",
    category: "Permissions",
    description: "Wrapper qui bloque ou affiche un slot selon le plan.",
    path: "/docs/feature-gate",
    color: "text-red-400",
    bg: "bg-red-400/10 border-red-400/20",
  },
];

*/

export default function Home() {
  const { t } = useTranslation();

  const components = [
    {
      id: "pricing-table",
      name: "PricingTable",
      category: t("common.category.monetization"),
      description: t("components.pricingTable.description", { defaultValue: "Plans, toggle mensuel/annuel, highlight plan recommandé." }),
      path: "/docs/pricing-table",
      color: "text-yellow-400",
      bg: "bg-yellow-400/10 border-yellow-400/20",
    },
    {
      id: "trial-banner",
      name: "TrialBanner",
      category: t("common.category.conversion"),
      description: t("components.trialBanner.description", { defaultValue: "Bandeau \"J jours restants\" avec CTA upgrade." }),
      path: "/docs/trial-banner",
      color: "text-orange-400",
      bg: "bg-orange-400/10 border-orange-400/20",
    },
    {
      id: "usage-meter",
      name: "UsageMeter",
      category: t("common.category.usage"),
      description: t("components.usageMeter.description", { defaultValue: "Barre de quota avec seuils d'alerte (warn / danger)." }),
      path: "/docs/usage-meter",
      color: "text-blue-400",
      bg: "bg-blue-400/10 border-blue-400/20",
    },
    {
      id: "onboarding-steps",
      name: "OnboardingSteps",
      category: t("common.category.activation"),
      description: t("components.onboardingSteps.description", { defaultValue: "Checklist de setup avec progression et skip." }),
      path: "/docs/onboarding-steps",
      color: "text-green-400",
      bg: "bg-green-400/10 border-green-400/20",
    },
    {
      id: "upgrade-modal",
      name: "UpgradeModal",
      category: t("common.category.upsell"),
      description: t("components.upgradeModal.description", { defaultValue: "Modal de passage au plan supérieur, avec feature gate." }),
      path: "/docs/upgrade-modal",
      color: "text-purple-400",
      bg: "bg-purple-400/10 border-purple-400/20",
    },
    {
      id: "team-invite",
      name: "TeamInvite",
      category: t("common.category.collaboration"),
      description: t("components.teamInvite.description", { defaultValue: "Invitation par email avec sélection de rôle." }),
      path: "/docs/team-invite",
      color: "text-cyan-400",
      bg: "bg-cyan-400/10 border-cyan-400/20",
    },
    {
      id: "invoice-row",
      name: "InvoiceRow",
      category: t("common.category.billing"),
      description: t("components.invoiceRow.description", { defaultValue: "Ligne de facture avec statut, montant, téléchargement." }),
      path: "/docs/invoice-row",
      color: "text-pink-400",
      bg: "bg-pink-400/10 border-pink-400/20",
    },
    {
      id: "plan-badge",
      name: "PlanBadge",
      category: t("common.category.identity"),
      description: t("components.planBadge.description", { defaultValue: "Badge Free / Pro / Enterprise dans le header." }),
      path: "/docs/plan-badge",
      color: "text-primary",
      bg: "bg-primary/10 border-primary/20",
    },
    {
      id: "api-key-card",
      name: "ApiKeyCard",
      category: t("common.category.developer"),
      description: t("components.apiKeyCard.description", { defaultValue: "Affichage + rotation de clé API masquée." }),
      path: "/docs/api-key-card",
      color: "text-emerald-400",
      bg: "bg-emerald-400/10 border-emerald-400/20",
    },
    {
      id: "feature-gate",
      name: "FeatureGate",
      category: t("common.category.permissions"),
      description: t("components.featureGate.description", { defaultValue: "Wrapper qui bloque ou affiche un slot selon le plan." }),
      path: "/docs/feature-gate",
      color: "text-red-400",
      bg: "bg-red-400/10 border-red-400/20",
    },
  ];

  const highlights = [
    t("highlights.npx", { defaultValue: "Installable via npx shadcn add" }),
    t("highlights.ts", { defaultValue: "TypeScript + Tailwind CSS v4" }),
    t("highlights.saas", { defaultValue: "Composants orientés B2B SaaS" }),
    t("highlights.dark", { defaultValue: "Dark mode natif" }),
    t("highlights.radix", { defaultValue: "Accessible (Radix UI)" }),
    t("highlights.deps", { defaultValue: "Zéro dépendance externe" }),
  ];

  return (
    <DocLayout>
      {/* Hero section */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />

        <div className="relative max-w-4xl mx-auto px-6 py-20 lg:py-28">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/15 text-primary border border-primary/30 font-mono">
              registry.shadcn.ui
            </span>
            <span className="text-xs text-muted-foreground">{t("hero.badge")}</span>
          </div>

          {/* Title */}
          <div className="flex items-center gap-4 mb-6">
            <div className="dark:hidden flex-shrink-0">
              <img src="/images/logos/logo-dark.svg" alt="Saaskit Logo" className="h-10 lg:h-14 w-auto" />
            </div>
            <div className="hidden dark:block flex-shrink-0">
              <img src="/images/logos/logo-white.svg" alt="Saaskit Logo" className="h-10 lg:h-14 w-auto" />
            </div>
            
            {/* Vertical Separator */}
            <div className="h-10 lg:h-12 w-px bg-foreground/20 self-center" />

            <h1 className="text-5xl lg:text-7xl font-black text-foreground leading-none font-[Fraunces]">
              Saaskit
            </h1>
          </div>
          <p className="text-xl lg:text-2xl text-muted-foreground font-light mb-2">
            <Trans i18nKey="intro.title">
              La registry shadcn/ui pour les <span className="text-foreground font-medium">produits B2B SaaS</span>.
            </Trans>
          </p>
          <p className="text-base text-muted-foreground mb-8 max-w-xl">
            {t("intro.subtitle")}
          </p>

          {/* Install command */}
          <div className="max-w-lg mb-8">
            <p className="text-xs text-muted-foreground mb-2 font-mono">{t("intro.install")}</p>
            <InstallBlock command="npx shadcn add @saaskit/pricing-table" />
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Link href="/docs/pricing-table">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
                {t("intro.explore")}
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
            <Link href="/docs/installation">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-secondary transition-colors">
                <Package className="h-4 w-4" />
                {t("intro.guide")}
              </button>
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-secondary transition-colors"
            >
              <Github className="h-4 w-4" />
              {t("nav.github")}
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
            </a>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {highlights.map((h) => (
              <div key={h} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                {h}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Components grid */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground font-[Fraunces] mb-2">
            {t("showcase.title")}
          </h2>
          <p className="text-muted-foreground text-sm">
            {t("showcase.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {components.map((comp) => (
            <Link key={comp.id} href={comp.path}>
              <div className="group rounded-lg border border-border bg-card hover:border-primary/30 hover:bg-card/80 transition-all duration-150 p-4 cursor-pointer">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="text-sm font-semibold text-foreground font-mono group-hover:text-primary transition-colors">
                      {comp.name}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${comp.bg} ${comp.color} flex-shrink-0`}
                  >
                    {comp.category}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{comp.description}</p>
                <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                  <span className="font-mono">npx shadcn add @saaskit/{comp.id}</span>
                  <ArrowRight className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Philosophy section */}
      <section className="border-t border-border">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-foreground font-[Fraunces] mb-8">{t("philosophy.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                id: "dx",
                icon: Code2,
                color: "text-blue-400",
                bg: "bg-blue-400/5 border-blue-400/20"
              },
              {
                id: "saas",
                icon: Zap,
                color: "text-emerald-400",
                bg: "bg-emerald-400/5 border-emerald-400/20"
              },
              {
                id: "brutalism",
                icon: Layers,
                color: "text-purple-400",
                bg: "bg-purple-400/5 border-purple-400/20"
              }
            ].map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.id} className={`rounded-xl border p-6 ${p.bg}`}>
                  <div className={`h-10 w-10 rounded-lg bg-card border border-border flex items-center justify-center mb-4`}>
                    <Icon className={`h-5 w-5 ${p.color}`} />
                  </div>
                  <h3 className="text-sm font-bold text-foreground mb-2">
                    {t(`philosophy.${p.id}.title`)}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {t(`philosophy.${p.id}.description`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stack technique */}
      <section className="border-t border-border">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <h2 className="text-lg font-bold text-foreground font-[Fraunces] mb-4">Stack technique</h2>
          <div className="flex flex-wrap gap-2">
            {["Next.js 15", "shadcn/ui CLI", "Tailwind CSS v4", "TypeScript", "registry.json", "Vercel", "MDX"].map(
              (tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-2.5 py-1 rounded-md bg-muted/50 border border-border text-muted-foreground"
                >
                  {tech}
                </span>
              )
            )}
          </div>
        </div>
      </section>
    </DocLayout>
  );
}
