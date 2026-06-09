import { ComponentDocPage, containerSection, themeSection, langSection } from "@/components/ComponentDocPage";
import { TeamInvite } from "@/components/saaskit/TeamInvite";
import { useTranslation } from "react-i18next";

const demoMembers = [
  { name: "Alice Martin", email: "alice@company.com", role: "admin" as const },
  { name: "Bob Dupont", email: "bob@company.com", role: "member" as const },
];

const demoPending = [
  { email: "charlie@startup.io", role: "viewer" as const, sentAt: new Date("2024-01-15") },
];

export default function TeamInviteDoc() {
  const { t, i18n } = useTranslation();
  const isFr = i18n.language.startsWith("fr");

  return (
    <ComponentDocPage
      name="TeamInvite"
      category={t("docs.teamInvite.category")}
      categoryColor="bg-cyan-400/10 text-cyan-400 border-cyan-400/25"
      description={t("docs.teamInvite.description")}
      installCmd="npx shadcn add @saaskit/team-invite"
      preview={
        <TeamInvite
          members={demoMembers}
          pendingInvites={demoPending}
          maxMembers={10}
          onInvite={async (email, role) => {
            await new Promise((r) => setTimeout(r, 500));
            console.log("Invited:", email, role);
          }}
        />
      }
      usageCode={`import { TeamInvite } from "@/components/saaskit/team-invite";

<TeamInvite
  members={team.members}
  pendingInvites={team.pendingInvites}
  maxMembers={plan === "pro" ? 10 : 1}
  lang="en"
  onInvite={async (email, role) => {
    await api.inviteTeamMember({ email, role });
    toast.success(\`Invitation sent to \${email}\`);
  }}
  onRevokeInvite={(email) => {
    api.revokeInvite(email);
  }}
  onChangeMemberRole={(email, role) => {
    api.updateMemberRole({ email, role });
  }}
/>`}
      propsTable={[
        { prop: "members", type: "TeamMember[]", description: t("docs.teamInvite.props.members") },
        { prop: "pendingInvites", type: "PendingInvite[]", description: t("docs.teamInvite.props.pendingInvites") },
        { prop: "maxMembers", type: "number", description: t("docs.teamInvite.props.maxMembers") },
        { prop: "lang", type: '"en" | "fr"', default: '"en"', description: isFr ? 'Langue des textes. "en" = anglais (défaut), "fr" = français. Affecte aussi le formatage des dates.' : 'Text language. "en" = English (default), "fr" = French. Also affects date formatting.' },
        { prop: "labels", type: "TeamInviteLabels", default: "—", description: isFr ? "Surcharge fins de libellés, y compris les rôles." : "Fine-grained text overrides, including role names." },
        { prop: "onInvite", type: "(email, role) => Promise<void>", description: t("docs.teamInvite.props.onInvite") },
        { prop: "onRevokeInvite", type: "(email) => void", description: t("docs.teamInvite.props.onRevokeInvite") },
        { prop: "onChangeMemberRole", type: "(email, role) => void", description: t("docs.teamInvite.props.onChangeMemberRole") },
      ]}
      notes={t("docs.teamInvite.notes", { returnObjects: true }) as string[]}
      extraSections={[
        containerSection(isFr, "TeamInvite"),
        themeSection(isFr),
        langSection(
          isFr,
          "TeamInvite",
          `<TeamInvite
  members={members}
  lang="fr"
/>

// ${isFr ? "Surcharger certains libellés (y compris les rôles)" : "Override specific labels (including role names)"}
<TeamInvite
  members={members}
  lang="fr"
  labels={{
    title: "Inviter des collaborateurs",
    inviteButton: "Envoyer",
    roles: { admin: "Administrateur", member: "Collaborateur", viewer: "Observateur" },
  }}
/>`,
        ),
      ]}
      prevDoc={{ name: "UpgradeModal", path: "/docs/upgrade-modal" }}
      nextDoc={{ name: "InvoiceRow", path: "/docs/invoice-row" }}
    />
  );
}
