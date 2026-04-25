import { ComponentDocPage } from "@/components/ComponentDocPage";
import { OnboardingSteps } from "@/components/saaskit/OnboardingSteps";
import { useTranslation } from "react-i18next";

export default function OnboardingStepsDoc() {
  const { t } = useTranslation();

  const demoSteps = [
    {
      id: "profile",
      title: t("components.onboardingSteps.demo.profile.title", { defaultValue: "Compléter votre profil" }),
      description: t("components.onboardingSteps.demo.profile.desc", { defaultValue: "Ajoutez votre nom, photo et informations de contact pour personnaliser votre espace." }),
      completed: true,
      action: { label: t("components.onboardingSteps.demo.profile.btn", { defaultValue: "Aller au profil" }), onClick: () => {} },
    },
    {
      id: "workspace",
      title: t("components.onboardingSteps.demo.workspace.title", { defaultValue: "Créer votre premier espace de travail" }),
      description: t("components.onboardingSteps.demo.workspace.desc", { defaultValue: "Organisez vos projets dans des espaces de travail dédiés pour votre équipe." }),
      action: { label: t("components.onboardingSteps.demo.workspace.btn", { defaultValue: "Créer un espace" }), onClick: () => {} },
    },
    {
      id: "invite",
      title: t("components.onboardingSteps.demo.invite.title", { defaultValue: "Inviter des membres" }),
      description: t("components.onboardingSteps.demo.invite.desc", { defaultValue: "Collaborez en invitant vos collègues à rejoindre votre espace de travail." }),
      action: { label: t("components.onboardingSteps.demo.invite.btn", { defaultValue: "Inviter des membres" }), onClick: () => {} },
      skippable: true,
    },
    {
      id: "api",
      title: t("components.onboardingSteps.demo.api.title", { defaultValue: "Générer votre première clé API" }),
      description: t("components.onboardingSteps.demo.api.desc", { defaultValue: "Intégrez notre API dans vos applications avec une clé d'authentification sécurisée." }),
      action: { label: t("components.onboardingSteps.demo.api.btn", { defaultValue: "Générer une clé" }), onClick: () => {} },
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
    title: "Compléter votre profil",
    description: "Ajoutez votre nom et photo de profil.",
    completed: user.profileComplete,
    action: {
      label: "Aller au profil",
      onClick: () => router.push("/settings/profile"),
    },
  },
  {
    id: "invite",
    title: "Inviter des membres",
    description: "Collaborez avec votre équipe.",
    skippable: true,
    action: {
      label: "Inviter",
      onClick: () => openInviteModal(),
    },
  },
];

<OnboardingSteps
  steps={steps}
  onStepComplete={(id) => trackEvent("onboarding_step_complete", { id })}
  onAllComplete={() => router.push("/dashboard")}
/>`}
      propsTable={[
        { prop: "steps", type: "OnboardingStep[]", required: true, description: t("docs.onboardingSteps.props.steps") },
        { prop: "onStepComplete", type: "(stepId: string) => void", description: t("docs.onboardingSteps.props.onStepComplete") },
        { prop: "onStepSkip", type: "(stepId: string) => void", description: t("docs.onboardingSteps.props.onStepSkip") },
        { prop: "onAllComplete", type: "() => void", description: t("docs.onboardingSteps.props.onAllComplete") },
        { prop: "className", type: "string", description: t("docs.onboardingSteps.props.className") },
      ]}
      notes={t("docs.onboardingSteps.notes", { returnObjects: true }) as string[]}
      prevDoc={{ name: "UsageMeter", path: "/docs/usage-meter" }}
      nextDoc={{ name: "UpgradeModal", path: "/docs/upgrade-modal" }}
    />
  );
}
