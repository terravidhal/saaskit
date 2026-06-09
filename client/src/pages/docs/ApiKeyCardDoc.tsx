import { ComponentDocPage, containerSection, themeSection, langSection } from "@/components/ComponentDocPage";
import { ApiKeyCard } from "@/components/saaskit/ApiKeyCard";
import { useTranslation } from "react-i18next";

export default function ApiKeyCardDoc() {
  const { t, i18n } = useTranslation();
  const isFr = i18n.language.startsWith("fr");

  return (
    <ComponentDocPage
      name="ApiKeyCard"
      category={t("docs.apiKeyCard.category")}
      categoryColor="bg-emerald-400/10 text-emerald-400 border-emerald-400/25"
      description={t("docs.apiKeyCard.description")}
      installCmd="npx shadcn add @saaskit/api-key-card"
      preview={
        <div className="space-y-3">
          <ApiKeyCard
            name={t("components.apiKeyCard.prodKey", { defaultValue: "Production Key" })}
            keyValue="sk_live_4xKj9mN2pQ8rT5vW1yZ3aB6cD0eF7gH"
            environment="production"
            createdAt={new Date("2024-01-15")}
            lastUsedAt={new Date("2024-03-10")}
            onRotate={async () => {
              await new Promise((r) => setTimeout(r, 1000));
            }}
          />
          <ApiKeyCard
            name={t("components.apiKeyCard.devKey", { defaultValue: "Development Key" })}
            keyValue="sk_test_9mN2pQ8rT5vW1yZ3aB6cD0eF7gH4xKj"
            environment="development"
            createdAt={new Date("2024-02-01")}
          />
        </div>
      }
      usageCode={`import { ApiKeyCard } from "@/components/saaskit/api-key-card";

<ApiKeyCard
  name="Production Key"
  keyValue={apiKey.value}
  environment="production"
  createdAt={new Date(apiKey.createdAt)}
  lastUsedAt={apiKey.lastUsedAt ? new Date(apiKey.lastUsedAt) : undefined}
  lang="en"
  onRotate={async () => {
    const newKey = await api.rotateApiKey(apiKey.id);
    setApiKey(newKey);
    toast.success("API key rotated successfully");
  }}
  onCopy={(key) => {
    trackEvent("api_key_copied");
  }}
  onRevoke={() => {
    if (confirm("Revoke this key?")) {
      api.revokeApiKey(apiKey.id);
    }
  }}
/>`}
      propsTable={[
        { prop: "name", type: "string", required: true, description: t("docs.apiKeyCard.props.name") },
        { prop: "keyValue", type: "string", required: true, description: t("docs.apiKeyCard.props.keyValue") },
        { prop: "environment", type: '"production" | "development" | "test"', default: '"production"', description: t("docs.apiKeyCard.props.environment") },
        { prop: "createdAt", type: "Date", description: t("docs.apiKeyCard.props.createdAt") },
        { prop: "lastUsedAt", type: "Date", description: t("docs.apiKeyCard.props.lastUsedAt") },
        { prop: "lang", type: '"en" | "fr"', default: '"en"', description: isFr ? 'Langue des textes. "en" = anglais (défaut), "fr" = français. Affecte aussi le formatage des dates.' : 'Text language. "en" = English (default), "fr" = French. Also affects date formatting.' },
        { prop: "labels", type: "ApiKeyCardLabels", default: "—", description: isFr ? "Surcharge fins de libellés." : "Fine-grained text overrides." },
        { prop: "onRotate", type: "() => Promise<void>", description: t("docs.apiKeyCard.props.onRotate") },
        { prop: "onCopy", type: "(key: string) => void", description: t("docs.apiKeyCard.props.onCopy") },
        { prop: "onRevoke", type: "() => void", description: t("docs.apiKeyCard.props.onRevoke") },
      ]}
      notes={t("docs.apiKeyCard.notes", { returnObjects: true }) as string[]}
      extraSections={[
        containerSection(isFr, "ApiKeyCard"),
        themeSection(isFr),
        langSection(
          isFr,
          "ApiKeyCard",
          `<ApiKeyCard
  name="Production Key"
  keyValue={apiKey.value}
  lang="fr"
/>

// ${isFr ? "Surcharger certains libellés" : "Override specific labels"}
<ApiKeyCard
  name="Clé de production"
  keyValue={apiKey.value}
  lang="fr"
  labels={{
    revoke: "Désactiver",
    rotate: "Renouveler",
    copied: "Clé copiée !",
  }}
/>`,
        ),
      ]}
      prevDoc={{ name: "PlanBadge", path: "/docs/plan-badge" }}
      nextDoc={{ name: "FeatureGate", path: "/docs/feature-gate" }}
    />
  );
}
