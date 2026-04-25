/**
 * @saaskit — Landing Page
 * Design: Developer-first Brutalism Doux
 * Hero section avec image générée, features, testimonials, CTA
 */

import { Link } from "wouter";
import { useTranslation, Trans } from "react-i18next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  ArrowRight,
  Package,
  Zap,
  Code2,
  Users,
  TrendingUp,
  Github,
  ExternalLink,
  Check,
  Star,
  Twitter,
  MessageCircle,
  BookOpen,
} from "lucide-react";

const HERO_BG = "https://d36hbw14aib5lz.cloudfront.net/310519663567950157/WPzUnUj6yx6AwSdeHZG6mm/hero-bg-DkjHqDgNLNL9KphK79xZf4.webp";

export default function LandingPage() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Package,
      title: t("features.items.npx.title"),
      description: t("features.items.npx.description"),
      color: "text-emerald-400",
    },
    {
      icon: Code2,
      title: t("features.items.ts.title"),
      description: t("features.items.ts.description"),
      color: "text-blue-400",
    },
    {
      icon: Zap,
      title: t("features.items.saas.title"),
      description: t("features.items.saas.description"),
      color: "text-yellow-400",
    },
    {
      icon: Users,
      title: t("features.items.responsive.title"),
      description: t("features.items.responsive.description"),
      color: "text-cyan-400",
    },
    {
      icon: TrendingUp,
      title: t("features.items.growth.title"),
      description: t("features.items.growth.description"),
      color: "text-pink-400",
    },
    {
      icon: Github,
      title: t("features.items.oss.title"),
      description: t("features.items.oss.description"),
      color: "text-purple-400",
    },
  ];

  const testimonials = [
    {
      name: t("testimonials.alice.name"),
      title: t("testimonials.alice.title"),
      avatar: "ON",
      quote: t("testimonials.alice.quote"),
      color: "bg-blue-500",
    },
    {
      name: t("testimonials.bob.name"),
      title: t("testimonials.bob.title"),
      avatar: "AT",
      quote: t("testimonials.bob.quote"),
      color: "bg-emerald-500",
    },
    {
      name: t("testimonials.charlie.name"),
      title: t("testimonials.charlie.title"),
      avatar: "MW",
      quote: t("testimonials.charlie.quote"),
      color: "bg-pink-500",
    },
  ];

  const stats = [
    { label: t("stats.components"), value: "10" },
    { label: t("stats.usage"), value: "170+" },
    { label: t("stats.installTime"), value: "< 1 min" },
    { label: t("stats.zeroDeps"), value: "✓" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="h-8 w-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
                {/* <Package className="h-4 w-4 text-primary" /> */}
                <img className="h-4 w-4 text-primary"  src="/images/logos/logo-white.svg" alt="logo-green" />
              </div>
              <span className="font-black text-lg font-[Fraunces] group-hover:text-primary transition-colors">Saaskit</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/docs/introduction">
              <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t("nav.docs")}
              </button>
            </Link>
            <a
              href="https://github.com/terravidhal/saaskit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              {t("nav.github")}
              <ExternalLink className="h-3 w-3" />
            </a>
            <div className="ml-2 pl-2 border-l border-border flex items-center gap-2">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />

        <div className="relative max-w-4xl mx-auto px-6 text-center animate-fade-in-up">
          {/* SaaS Kit Branding in Hero */}
          <div className="flex items-center justify-center gap-3 mb-6 bg-foreground/5 py-1.5 px-4 rounded-full border border-foreground/10 w-fit mx-auto">
            <div className="dark:hidden flex-shrink-0">
              <img src="/images/logos/logo-dark.svg" alt="Saaskit Logo" className="h-6 w-auto" />
            </div>
            <div className="hidden dark:block flex-shrink-0">
              <img src="/images/logos/logo-white.svg" alt="Saaskit Logo" className="h-6 w-auto" />
            </div>
            <div className="h-4 w-px bg-foreground/20" />
            <span className="text-sm font-black text-foreground tracking-tight">Saaskit</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl lg:text-7xl font-black text-foreground leading-[1.1] mb-6 font-[Fraunces]">
            <Trans i18nKey="hero.title">
              La registry shadcn/ui pour les <span className="text-primary italic">produits B2B SaaS</span>
            </Trans>
          </h1>

          {/* Subtitle */}
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            {t("hero.subtitle")}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/docs/introduction">
              <button className="flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground text-base font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all duration-200">
                {t("hero.getStarted")}
                <ArrowRight className="h-5 w-5" />
              </button>
            </Link>
            <a
              href="https://github.com/terravidhal/saaskit"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-border bg-background/50 backdrop-blur-sm text-base font-bold hover:bg-muted transition-all duration-200"
            >
              <Github className="h-5 w-5" />
              {/* {t("hero.viewGithub")} */}
              {t("Github")}
            </a>
          </div>

          {/* Stats - Now more subtle and at the bottom */}
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <div className="text-xl font-black text-foreground">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-border py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-foreground font-[Fraunces] mb-3">
              {t("features.title")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("features.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group rounded-lg border border-border bg-card hover:border-primary/30 hover:bg-card/80 transition-all duration-150 p-6"
                >
                  <div className={`h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`h-5 w-5 ${feature.color}`} />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Components Showcase */}
      <section className="border-t border-border py-20 bg-muted/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-foreground font-[Fraunces] mb-3">
              {t("showcase.title")}
            </h2>
            <p className="text-muted-foreground">
              {t("showcase.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {[
              { name: "PricingTable", category: t("common.category.monetization"), color: "text-yellow-400" },
              { name: "TrialBanner", category: t("common.category.conversion"), color: "text-orange-400" },
              { name: "UsageMeter", category: t("common.category.usage"), color: "text-blue-400" },
              { name: "OnboardingSteps", category: t("common.category.activation"), color: "text-green-400" },
              { name: "UpgradeModal", category: t("common.category.upsell"), color: "text-purple-400" },
              { name: "TeamInvite", category: t("common.category.collaboration"), color: "text-cyan-400" },
              { name: "InvoiceRow", category: t("common.category.billing"), color: "text-pink-400" },
              { name: "PlanBadge", category: t("common.category.identity"), color: "text-primary" },
              { name: "ApiKeyCard", category: t("common.category.developer"), color: "text-emerald-400" },
              { name: "FeatureGate", category: t("common.category.permissions"), color: "text-red-400" },
            ].map((comp) => (
              <Link key={comp.name} href={`/docs/${comp.name.toLowerCase().replace(/([A-Z])/g, "-$1").toLowerCase().slice(1)}`}>
                <div className="group rounded-lg border border-border bg-card hover:border-primary/30 p-4 cursor-pointer transition-all duration-150">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs font-semibold text-foreground font-mono group-hover:text-primary transition-colors">
                      {comp.name}
                    </span>
                    <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 ${comp.color}`}>
                      {comp.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                    <span className="font-mono">npx shadcn add @saaskit/</span>
                    <ArrowRight className="h-2.5 w-2.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/docs/introduction">
              <button className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:opacity-80 transition-opacity">
                {t("showcase.viewAll")}
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="border-t border-border py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-foreground font-[Fraunces] mb-3">
              {t("testimonials.title")}
            </h2>
            <p className="text-muted-foreground">
              {t("testimonials.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="rounded-lg border border-border bg-card p-6 hover:border-primary/30 transition-colors"
              >
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-full ${testimonial.color} flex items-center justify-center text-xs font-bold text-white`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black text-foreground font-[Fraunces] mb-4">
            {t("cta.title")}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            {t("cta.subtitle")}
          </p>

          <Link href="/docs/introduction">
            <button className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
              {t("cta.button")}
              <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-muted/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {/* <Package className="h-4 w-4 text-primary" /> */}
              <img className="h-4 w-4 text-primary"  src="/images/logos/logo-white.svg" alt="logo-green" />
              <span className="text-sm font-semibold text-foreground">saaskit</span>
            </div>
            <div className="flex items-center gap-6 text-xs text-muted-foreground">
              <a href="/docs/introduction" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                <BookOpen className="h-3.5 w-3.5" />
                {t("nav.docs")}
              </a>
              <a href="https://github.com/terravidhal/saaskit" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                <Github className="h-3.5 w-3.5" />
                {t("nav.github")}
              </a>
              <a href="#" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                <Twitter className="h-3.5 w-3.5" />
                Twitter
              </a>
              <a href="#" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                <MessageCircle className="h-3.5 w-3.5" />
                Discord
              </a>
            </div>
            <div className="text-xs text-muted-foreground">
              {t("footer.builtBy", { year: new Date().getFullYear() })}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
