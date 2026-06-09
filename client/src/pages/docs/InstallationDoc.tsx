import { DocLayout } from "@/components/DocLayout";
import { CodeBlock, PackageManagerBlock } from "@/components/CodeBlock";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";


export default function InstallationDoc() {
  const { t } = useTranslation();

  return (
    <DocLayout>
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-foreground font-[Fraunces] mb-3">
            {t("installPage.title", { defaultValue: "Installation" })}
          </h1>
          <p className="text-base text-muted-foreground">
            {t("installPage.description", {
              defaultValue:
                "Add @saaskit components to any Next.js + shadcn/ui project in seconds. No provider, no extra setup — components are self-contained.",
            })}
          </p>
        </div>

        {/* Prerequisites */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-widest mb-4">
            {t("installPage.prerequisites", { defaultValue: "Prerequisites" })}
          </h2>
          <div className="rounded-lg border border-border bg-card p-4 space-y-2">
            {[
              { label: "Next.js", version: "14+" },
              { label: "shadcn/ui", version: "CLI 2.0+" },
              { label: "Tailwind CSS", version: "v4" },
              { label: "TypeScript", version: "5+" },
            ].map((req) => (
              <div key={req.label} className="flex items-center justify-between text-sm">
                <span className="text-foreground font-mono">{req.label}</span>
                <span className="text-muted-foreground font-mono text-xs">{req.version}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Step 1 — shadcn init */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-widest mb-4">
            {t("installPage.step1.title", { defaultValue: "Step 1 — Initialize shadcn/ui" })}
          </h2>
          <p className="text-sm text-muted-foreground mb-3">
            {t("installPage.step1.description", {
              defaultValue: "If shadcn/ui is not yet set up in your project, run:",
            })}
          </p>
          <PackageManagerBlock args="init" />
        </section>

        {/* Step 2 — Add the registry */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-widest mb-4">
            {t("installPage.step2.title", { defaultValue: "Step 2 — Add the @saaskit registry" })}
          </h2>
          <p className="text-sm text-muted-foreground mb-3">
            {t("installPage.step2.description", {
              defaultValue:
                "Register @saaskit as a remote registry so the CLI can resolve all components automatically:",
            })}
          </p>
          <PackageManagerBlock args="registry add @saaskit" />
          <p className="text-xs text-muted-foreground mt-3">
            This adds{" "}
            <code className="font-mono text-primary">https://saaskit-theta.vercel.app/r</code> to your{" "}
            <code className="font-mono text-primary">components.json</code> registry list.
          </p>
        </section>

        {/* Step 3 — Install individual components */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-widest mb-4">
            {t("installPage.step3.title", { defaultValue: "Step 3 — Add a component" })}
          </h2>
          <p className="text-sm text-muted-foreground mb-3">
            {t("installPage.step3.description", {
              defaultValue:
                "Install any component individually. The file is placed in components/saaskit/ — no extra config needed.",
            })}
          </p>
          <div className="space-y-3">
            <div>
              <p className="text-xs font-mono text-muted-foreground mb-1.5">@saaskit/pricing-table</p>
              <PackageManagerBlock args="add @saaskit/pricing-table" />
            </div>
            <div>
              <p className="text-xs font-mono text-muted-foreground mb-1.5">@saaskit/upgrade-modal</p>
              <PackageManagerBlock args="add @saaskit/upgrade-modal" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Replace <code className="font-mono text-primary">pricing-table</code> with any component name.
            Browse all components in the sidebar.
          </p>
        </section>

        {/* Usage */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-widest mb-4">
            {t("installPage.usage.title", { defaultValue: "Usage" })}
          </h2>
          <CodeBlock
            code={`import { PricingTable } from "@/components/saaskit/pricing-table";

export function PricingPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <PricingTable
        lang="en"
        onSelectPlan={(plan, billing) => {
          router.push(\`/checkout?plan=\${plan}&billing=\${billing}\`);
        }}
      />
    </main>
  );
}`}
            language="tsx"
            showLineNumbers
          />
        </section>

        {/* File structure */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-widest mb-4">
            {t("installPage.step3.fileStructure", { defaultValue: "File structure" })}
          </h2>
          <CodeBlock
            code={`your-project/
├── components/
│   └── saaskit/
│       ├── pricing-table.tsx
│       ├── trial-banner.tsx
│       ├── usage-meter.tsx
│       ├── onboarding-steps.tsx
│       ├── upgrade-modal.tsx
│       ├── plan-badge.tsx
│       ├── api-key-card.tsx
│       ├── team-invite.tsx
│       ├── invoice-row.tsx
│       └── feature-gate.tsx
├── app/
│   └── pricing/
│       └── page.tsx
└── ...`}
            language="bash"
          />
        </section>

        {/* Fraunces font */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-widest mb-4">
            Fraunces font — auto-loaded
          </h2>
          <p className="text-sm text-muted-foreground mb-3">
            <code className="font-mono text-primary">PricingTable</code> and{" "}
            <code className="font-mono text-primary">UpgradeModal</code> use the{" "}
            <code className="font-mono text-primary">Fraunces</code> display font on prices and headings.
            The font loads automatically from Google Fonts on first render — no setup required.
          </p>
          <p className="text-sm text-muted-foreground mb-3">
            To replace it with your own font, set the{" "}
            <code className="font-mono text-primary">--saaskit-font-display</code> CSS variable:
          </p>
          <CodeBlock
            code={`/* globals.css — override the display font */
:root {
  --saaskit-font-display: 'Inter';
}

/* Or with a Next.js font variable */
:root {
  --saaskit-font-display: var(--font-your-font);
}`}
            language="css"
            showLineNumbers
          />
          <p className="text-xs text-muted-foreground mt-2">
            If <code className="font-mono">--saaskit-font-display</code> is not set, Fraunces is used as the default.
          </p>
        </section>

        {/* Optional: saaskit theme */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-widest mb-4">
            Optional — Saaskit emerald theme
          </h2>
          <p className="text-sm text-muted-foreground mb-3">
            Components use <code className="font-mono text-primary">var(--primary)</code> and adapt to your
            existing theme. To get the exact emerald green seen on this site, add to your{" "}
            <code className="font-mono text-primary">globals.css</code>:
          </p>
          <CodeBlock
            code={`@layer base {
  :root {
    --primary: oklch(0.65 0.19 155);
    --primary-foreground: oklch(0.98 0.01 155);
    --ring: oklch(0.65 0.19 155);
  }
  .dark {
    --primary: oklch(0.72 0.19 155);
    --primary-foreground: oklch(0.15 0.04 155);
    --ring: oklch(0.72 0.19 155);
  }
}`}
            language="css"
            showLineNumbers
          />
        </section>

        <div className="border-t border-border pt-6">
          <Link href="/docs/pricing-table">
            <button className="flex items-center gap-2 text-sm font-medium text-primary hover:opacity-80 transition-opacity">
              {t("installPage.exploreNext", { defaultValue: "Browse components →" })}
              <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </div>
      </div>
    </DocLayout>
  );
}
