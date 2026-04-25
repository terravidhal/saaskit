import { DocLayout } from "@/components/DocLayout";
import { CodeBlock, InstallBlock } from "@/components/CodeBlock";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function InstallationDoc() {
  const { t } = useTranslation();

  return (
    <DocLayout>
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-foreground font-[Fraunces] mb-3">{t("installPage.title")}</h1>
          <p className="text-base text-muted-foreground">
            {t("installPage.description")}
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-widest mb-4">{t("installPage.prerequisites")}</h2>
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

        <section className="mb-8">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-widest mb-4">
            {t("installPage.step1.title")}
          </h2>
          <p className="text-sm text-muted-foreground mb-3">
            {t("installPage.step1.description")}
          </p>
          <InstallBlock command="npx shadcn@latest init" />
        </section>

        <section className="mb-8">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-widest mb-4">
            {t("installPage.step2.title")}
          </h2>
          <p className="text-sm text-muted-foreground mb-3">
            {t("installPage.step2.description")}
          </p>
          <div className="space-y-2">
            {[
              "npx shadcn add @saaskit/pricing-table",
              "npx shadcn add @saaskit/trial-banner",
              "npx shadcn add @saaskit/usage-meter",
              "npx shadcn add @saaskit/onboarding-steps",
              "npx shadcn add @saaskit/upgrade-modal",
            ].map((cmd) => (
              <InstallBlock key={cmd} command={cmd} />
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-widest mb-4">
            {t("installPage.step3.title")}
          </h2>
          <p className="text-sm text-muted-foreground mb-3">
            {t("installPage.step3.description")}
          </p>
          <CodeBlock
            code={`import { PricingTable } from "@/components/saaskit/pricing-table";

export function PricingPage() {
  return (
    <main>
      <PricingTable
        onSelectPlan={(plan, billing) => {
          // Redirige vers le checkout
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

        <section className="mb-8">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-widest mb-4">
            {t("installPage.step3.fileStructure")}
          </h2>
          <CodeBlock
            code={`your-project/
├── components/
│   └── saaskit/
│       ├── pricing-table.tsx    ← npx shadcn add @saaskit/pricing-table
│       ├── trial-banner.tsx     ← npx shadcn add @saaskit/trial-banner
│       ├── usage-meter.tsx      ← npx shadcn add @saaskit/usage-meter
│       └── ...
├── app/
│   └── pricing/
│       └── page.tsx
└── ...`}
            language="bash"
          />
        </section>

        <section className="mb-8">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-widest mb-4">
            registry.json
          </h2>
          <p className="text-sm text-muted-foreground mb-3">
            {t("installPage.step1.description", { defaultValue: "La configuration de la registry pour la CLI shadcn :" })}
          </p>
          <CodeBlock
            code={`{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "@saaskit",
  "homepage": "https://github.com/terravidhal/saaskit",
  "items": [
    {
      "name": "pricing-table",
      "type": "registry:component",
      "title": "PricingTable",
      "description": "Plans, toggle mensuel/annuel, highlight plan recommandé",
      "files": [
        {
          "path": "components/saaskit/pricing-table.tsx",
          "type": "registry:component"
        }
      ]
    }
  ]
}`}
            language="json"
            filename="registry.json"
          />
        </section>

        <div className="border-t border-border pt-6">
          <Link href="/docs/pricing-table">
            <button className="flex items-center gap-2 text-sm font-medium text-primary hover:opacity-80 transition-opacity">
              {t("installPage.exploreNext")}
              <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </div>
      </div>
    </DocLayout>
  );
}
