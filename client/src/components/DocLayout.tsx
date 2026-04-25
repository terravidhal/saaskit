/**
 * @saaskit — DocLayout
 * Design: Developer-first Brutalism Doux
 * Sidebar fixe à gauche, contenu centré, table des matières flottante à droite
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import {
  Menu,
  X,
  Github,
  ExternalLink,
  ChevronRight,
  Package,
  Layers,
  BookOpen,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
  path: string;
  badge?: string;
  category?: string;
}

function Sidebar({ onClose }: { onClose?: () => void }) {
  const [location] = useLocation();
  const { t } = useTranslation();

  const navItems: NavItem[] = [
    { id: "home", label: t("sidebar.intro"), path: "/docs/introduction", category: t("sidebar.categories.start") },
    { id: "install", label: t("sidebar.install"), path: "/docs/installation", category: t("sidebar.categories.start") },
    { id: "pricing-table", label: "PricingTable", path: "/docs/pricing-table", badge: "monetization", category: t("sidebar.categories.components") },
    { id: "trial-banner", label: "TrialBanner", path: "/docs/trial-banner", badge: "conversion", category: t("sidebar.categories.components") },
    { id: "usage-meter", label: "UsageMeter", path: "/docs/usage-meter", badge: "usage", category: t("sidebar.categories.components") },
    { id: "onboarding-steps", label: "OnboardingSteps", path: "/docs/onboarding-steps", badge: "activation", category: t("sidebar.categories.components") },
    { id: "upgrade-modal", label: "UpgradeModal", path: "/docs/upgrade-modal", badge: "upsell", category: t("sidebar.categories.components") },
    { id: "team-invite", label: "TeamInvite", path: "/docs/team-invite", badge: "collaboration", category: t("sidebar.categories.components") },
    { id: "invoice-row", label: "InvoiceRow", path: "/docs/invoice-row", badge: "billing", category: t("sidebar.categories.components") },
    { id: "plan-badge", label: "PlanBadge", path: "/docs/plan-badge", badge: "identity", category: t("sidebar.categories.components") },
    { id: "api-key-card", label: "ApiKeyCard", path: "/docs/api-key-card", badge: "developer", category: t("sidebar.categories.components") },
    { id: "feature-gate", label: "FeatureGate", path: "/docs/feature-gate", badge: "permissions", category: t("sidebar.categories.components") },
  ];

  const categoryOrder = [t("sidebar.categories.start"), t("sidebar.categories.components")];

  const badgeColors: Record<string, string> = {
    monetization: "text-yellow-400/80",
    conversion: "text-orange-400/80",
    usage: "text-blue-400/80",
    activation: "text-green-400/80",
    upsell: "text-purple-400/80",
    collaboration: "text-cyan-400/80",
    billing: "text-pink-400/80",
    identity: "text-primary",
    developer: "text-emerald-400/80",
    permissions: "text-red-400/80",
  };

  const grouped = categoryOrder.map((cat) => ({
    category: cat,
    items: navItems.filter((n) => n.category === cat),
  }));

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-sidebar-border">
        <Link href="/" onClick={onClose}>
          <div className="flex items-center gap-2.5 group">
            <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center">
              {/* <Layers className="h-4 w-4 text-primary-foreground" /> */}
              <img className="dark:hidden h-4 w-4 text-primary-foreground"  src="/images/logos/blanc-logo.svg" alt="logo-green" />
              <img className="hidden dark:block h-4 w-4 text-primary-foreground"  src="/images/logos/noire-logo.svg" alt="logo-green" />
            </div>
            <div>
              <span className="text-sm font-bold text-foreground font-mono">saaskit</span>
              <div className="text-xs text-muted-foreground leading-none">registry shadcn/ui</div>
            </div>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
        {grouped.map(({ category, items }) => (
          <div key={category}>
            <div className="px-2 mb-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                {category}
              </span>
            </div>
            <div className="space-y-0.5">
              {items.map((item) => {
                const isActive = location === item.path;
                return (
                  <Link key={item.id} href={item.path} onClick={onClose}>
                    <div
                      className={cn(
                        "nav-item",
                        isActive && "active"
                      )}
                    >
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.badge && (
                        <span
                          className={cn(
                            "text-xs font-mono hidden lg:block",
                            badgeColors[item.badge] ?? "text-muted-foreground"
                          )}
                        >
                          {t(`common.category.${item.badge.toLowerCase()}`)}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-sidebar-border space-y-2">
        <div className="flex items-center justify-between px-2 mb-2">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
            {t("sidebar.theme", { defaultValue: "Thème" })}
          </span>
          <ThemeToggle />
        </div>
        <div className="flex items-center justify-between px-2 mb-2">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
            {t("sidebar.language", { defaultValue: "Langue" })}
          </span>
          <LanguageSwitcher />
        </div>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-item"
        >
          <Github className="h-4 w-4" />
          GitHub
          <ExternalLink className="h-3 w-3 ml-auto" />
        </a>
        <a
          href="https://ui.shadcn.com/registry"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-item"
        >
          <Package className="h-4 w-4" />
          {t("sidebar.registry", { defaultValue: "shadcn registry" })}
          <ExternalLink className="h-3 w-3 ml-auto" />
        </a>
      </div>
    </div>
  );
}

interface DocLayoutProps {
  children: React.ReactNode;
}

export function DocLayout({ children }: DocLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useTranslation();

  // Close mobile sidebar on route change
  const [location] = useLocation();
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 flex-shrink-0 border-r border-sidebar-border bg-sidebar fixed top-0 left-0 h-screen z-30">
        <Sidebar />
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-72 bg-sidebar border-r border-sidebar-border flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-sidebar-border">
              <span className="text-sm font-bold font-mono text-foreground">Saaskit</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1 rounded hover:bg-muted/50 text-muted-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <Sidebar onClose={() => setMobileOpen(false)} />
            </div>
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        {/* Mobile header */}
        <header className="lg:hidden sticky top-0 z-20 flex items-center justify-between px-4 py-3 border-b border-border bg-background/95 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-1.5 rounded hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
            <span className="text-sm font-bold font-mono text-foreground">Saaskit</span>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 animate-fade-in-up">
          {children}
        </main>
      </div>
    </div>
  );
}
