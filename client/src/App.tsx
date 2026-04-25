/**
 * @saaskit — App.tsx
 * Design: Developer-first Brutalism Doux
 * Routes: Home + 11 pages de documentation composants
 */

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ScrollToTop } from "./components/ScrollToTop";

// Pages
import Home from "./pages/Home";
import InstallationDoc from "./pages/docs/InstallationDoc";
import PricingTableDoc from "./pages/docs/PricingTableDoc";
import TrialBannerDoc from "./pages/docs/TrialBannerDoc";
import UsageMeterDoc from "./pages/docs/UsageMeterDoc";
import OnboardingStepsDoc from "./pages/docs/OnboardingStepsDoc";
import UpgradeModalDoc from "./pages/docs/UpgradeModalDoc";
import TeamInviteDoc from "./pages/docs/TeamInviteDoc";
import InvoiceRowDoc from "./pages/docs/InvoiceRowDoc";
import PlanBadgeDoc from "./pages/docs/PlanBadgeDoc";
import ApiKeyCardDoc from "./pages/docs/ApiKeyCardDoc";
import FeatureGateDoc from "./pages/docs/FeatureGateDoc";
import LandingPage from "./pages/LandingPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/docs/introduction" component={Home} />
      <Route path="/docs/installation" component={InstallationDoc} />
      <Route path="/docs/pricing-table" component={PricingTableDoc} />
      <Route path="/docs/trial-banner" component={TrialBannerDoc} />
      <Route path="/docs/usage-meter" component={UsageMeterDoc} />
      <Route path="/docs/onboarding-steps" component={OnboardingStepsDoc} />
      <Route path="/docs/upgrade-modal" component={UpgradeModalDoc} />
      <Route path="/docs/team-invite" component={TeamInviteDoc} />
      <Route path="/docs/invoice-row" component={InvoiceRowDoc} />
      <Route path="/docs/plan-badge" component={PlanBadgeDoc} />
      <Route path="/docs/api-key-card" component={ApiKeyCardDoc} />
      <Route path="/docs/feature-gate" component={FeatureGateDoc} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" switchable={true}>
        <TooltipProvider>
          <Toaster />
          <ScrollToTop />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
