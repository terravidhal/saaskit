# @saaskit

**The shadcn/ui registry for B2B SaaS products.**

10 essential components — pricing, trial, usage, onboarding, billing — ready to use, installable in one command.

```bash
npx shadcn add @saaskit/pricing-table
```

## Components

| Component | Category | Description |
|-----------|----------|-------------|
| `PricingTable` | Monetization | Plans, monthly/annual toggle, recommended plan highlight |
| `TrialBanner` | Conversion | "X days remaining" banner with upgrade CTA |
| `UsageMeter` | Usage | Quota bar with alert thresholds (warn / danger) |
| `OnboardingSteps` | Activation | Setup checklist with progress tracking and skip |
| `UpgradeModal` | Upsell | Modal for upgrading to a higher plan, with feature gate |
| `TeamInvite` | Collaboration | Email invitation with role selection |
| `InvoiceRow` | Billing | Invoice row with status, amount, and download |
| `PlanBadge` | Identity | Free / Pro / Enterprise badge in the header |
| `ApiKeyCard` | Developer | Display + rotation of a masked API key |
| `FeatureGate` | Permissions | Wrapper that blocks or reveals a slot based on the plan |

## Installation

### Prerequisites

- Next.js 14+
- shadcn/ui CLI 2.0+
- Tailwind CSS v4
- TypeScript 5+

### Usage

```bash
# Initialize shadcn/ui if needed
npx shadcn@latest init

# Install a component
npx shadcn add @saaskit/pricing-table
npx shadcn add @saaskit/trial-banner
npx shadcn add @saaskit/usage-meter
```

## Tech Stack

- **Next.js 15** — React framework
- **shadcn/ui CLI** — Registry-based distribution
- **Tailwind CSS v4** — Styling
- **TypeScript** — Strict typing
- **registry.json** — Registry configuration
- **Vercel** — Deployment
- **MDX** — Documentation

## Local Development

```bash
pnpm install
pnpm dev
```

## License

MIT
