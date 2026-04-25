# @saaskit

**La registry shadcn/ui pour les produits B2B SaaS.**

10 composants essentiels — pricing, trial, usage, onboarding, billing — prêts à l'emploi, installables en une commande.

```bash
npx shadcn add @saaskit/pricing-table
```

## Composants

| Composant | Catégorie | Description |
|-----------|-----------|-------------|
| `PricingTable` | Monetisation | Plans, toggle mensuel/annuel, highlight plan recommandé |
| `TrialBanner` | Conversion | Bandeau "J jours restants" avec CTA upgrade |
| `UsageMeter` | Usage | Barre de quota avec seuils d'alerte (warn / danger) |
| `OnboardingSteps` | Activation | Checklist de setup avec progression et skip |
| `UpgradeModal` | Upsell | Modal de passage au plan supérieur, avec feature gate |
| `TeamInvite` | Collaboration | Invitation par email avec sélection de rôle |
| `InvoiceRow` | Billing | Ligne de facture avec statut, montant, téléchargement |
| `PlanBadge` | Identity | Badge Free / Pro / Enterprise dans le header |
| `ApiKeyCard` | Developer | Affichage + rotation de clé API masquée |
| `FeatureGate` | Permissions | Wrapper qui bloque ou affiche un slot selon le plan |

## Installation

### Prérequis

- Next.js 14+
- shadcn/ui CLI 2.0+
- Tailwind CSS v4
- TypeScript 5+

### Utilisation

```bash
# Initialiser shadcn/ui si nécessaire
npx shadcn@latest init

# Installer un composant
npx shadcn add @saaskit/pricing-table
npx shadcn add @saaskit/trial-banner
npx shadcn add @saaskit/usage-meter
```

## Stack technique

- **Next.js 15** — Framework React
- **shadcn/ui CLI** — Distribution via registry
- **Tailwind CSS v4** — Styling
- **TypeScript** — Typage strict
- **registry.json** — Configuration de la registry
- **Vercel** — Déploiement
- **MDX** — Documentation

## Roadmap

### Phase 1 — Semaine 1-2 (en cours)
- [x] Repo Next.js + configuration registry.json
- [x] 10 composants prioritaires
- [x] Site de documentation avec previews live
- [ ] Déploiement sur Vercel
- [ ] Soumission au directory shadcn/ui

### Phase 2 — Semaine 3-4
- [ ] Documentation MDX complète
- [ ] Tests de composants
- [ ] Soumission officielle au directory shadcn/ui

### Phase 3 — Mois 2+
- [ ] Composants premium (payants)
- [ ] Thèmes personnalisés
- [ ] Blocs complets (pages entières)
- [ ] SEO + newsletter
- [ ] Communauté Discord

## Développement local

```bash
pnpm install
pnpm dev
```

## Licence

MIT
