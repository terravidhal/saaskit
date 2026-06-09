import { ComponentDocPage, containerSection, themeSection, langSection } from "@/components/ComponentDocPage";
import { OnboardingSteps } from "@/components/saaskit/OnboardingSteps";
import { useTranslation } from "react-i18next";

export default function OnboardingStepsDoc() {
  const { t, i18n } = useTranslation();
  const isFr = i18n.language.startsWith("fr");

  const demoSteps = [
    {
      id: "profile",
      title: t("components.onboardingSteps.demo.profile.title", { defaultValue: "Complete your profile" }),
      description: t("components.onboardingSteps.demo.profile.desc", { defaultValue: "Add your name, photo and contact info." }),
      completed: true,
      action: { label: t("components.onboardingSteps.demo.profile.btn", { defaultValue: "Go to profile" }), onClick: () => {} },
    },
    {
      id: "workspace",
      title: t("components.onboardingSteps.demo.workspace.title", { defaultValue: "Create your first workspace" }),
      description: t("components.onboardingSteps.demo.workspace.desc", { defaultValue: "Organize your projects in dedicated workspaces." }),
      action: { label: t("components.onboardingSteps.demo.workspace.btn", { defaultValue: "Create workspace" }), onClick: () => {} },
    },
    {
      id: "invite",
      title: t("components.onboardingSteps.demo.invite.title", { defaultValue: "Invite members" }),
      description: t("components.onboardingSteps.demo.invite.desc", { defaultValue: "Collaborate by inviting your colleagues." }),
      action: { label: t("components.onboardingSteps.demo.invite.btn", { defaultValue: "Invite members" }), onClick: () => {} },
      skippable: true,
    },
    {
      id: "api",
      title: t("components.onboardingSteps.demo.api.title", { defaultValue: "Generate your first API key" }),
      description: t("components.onboardingSteps.demo.api.desc", { defaultValue: "Integrate our API with a secure key." }),
      action: { label: t("components.onboardingSteps.demo.api.btn", { defaultValue: "Generate key" }), onClick: () => {} },
      skippable: true,
    },
  ];

  return (
    <ComponentDocPage
      name="OnboardingSteps"
      category={t("docs.onboardingSteps.category")}
      categoryColor="bg-green-400/10 text-green-400 border-green-400/25"
      description={t("docs.onboardingSteps.description")}
      installCmd="npx shadcn add @saaskit/onboarding-steps"
      preview={<OnboardingSteps steps={demoSteps} />}
      usageCode={`import { OnboardingSteps } from "@/components/saaskit/onboarding-steps";

const steps = [
  {
    id: "profile",
    title: "Complete your profile",
    description: "Add your name and profile picture.",
    completed: user.profileComplete,
    action: {
      label: "Go to profile",
      onClick: () => router.push("/settings/profile"),
    },
  },
  {
    id: "invite",
    title: "Invite members",
    description: "Collaborate with your team.",
    skippable: true,
    action: {
      label: "Invite",
      onClick: () => openInviteModal(),
    },
  },
];

<OnboardingSteps
  steps={steps}
  lang="en"
  onStepComplete={(id) => trackEvent("onboarding_step_complete", { id })}
  onAllComplete={() => router.push("/dashboard")}
/>`}
      propsTable={[
        { prop: "steps", type: "OnboardingStep[]", required: true, description: t("docs.onboardingSteps.props.steps") },
        { prop: "lang", type: '"en" | "fr"', default: '"en"', description: isFr ? 'Langue des textes. "en" = anglais (défaut), "fr" = français.' : 'Text language. "en" = English (default), "fr" = French.' },
        { prop: "labels", type: "OnboardingStepsLabels", default: "—", description: isFr ? "Surcharge fins de libellés." : "Fine-grained text overrides." },
        { prop: "onStepComplete", type: "(stepId: string) => void", description: t("docs.onboardingSteps.props.onStepComplete") },
        { prop: "onStepSkip", type: "(stepId: string) => void", description: t("docs.onboardingSteps.props.onStepSkip") },
        { prop: "onAllComplete", type: "() => void", description: t("docs.onboardingSteps.props.onAllComplete") },
        { prop: "className", type: "string", description: t("docs.onboardingSteps.props.className") },
      ]}
      notes={t("docs.onboardingSteps.notes", { returnObjects: true }) as string[]}
      extraSections={[
        containerSection(isFr, "OnboardingSteps"),
        themeSection(isFr),
        langSection(
          isFr,
          "OnboardingSteps",
          `<OnboardingSteps
  steps={steps}
  lang="fr"
/>

// ${isFr ? "Surcharger certains libellés" : "Override specific labels"}
<OnboardingSteps
  steps={steps}
  lang="fr"
  labels={{
    complete: "Configuration terminée !",
    completeDesc: "Vous êtes prêt à utiliser toutes les fonctionnalités.",
    markDone: "Marquer comme fait",
    skip: "Ignorer",
  }}
/>`,
        ),
      ]}
      prevDoc={{ name: "UsageMeter", path: "/docs/usage-meter" }}
      nextDoc={{ name: "UpgradeModal", path: "/docs/upgrade-modal" }}
    />
  );
}
