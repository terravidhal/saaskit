import { ComponentDocPage } from "@/components/ComponentDocPage";
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
  const { t } = useTranslation();

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
            console.log("Invité :", email, role);
          }}
        />
      }
      usageCode={`import { TeamInvite } from "@/components/saaskit/team-invite";

<TeamInvite
  members={team.members}
  pendingInvites={team.pendingInvites}
  maxMembers={plan === "pro" ? 10 : 1}
  onInvite={async (email, role) => {
    await api.inviteTeamMember({ email, role });
    toast.success(\`Invitation envoyée à \${email}\`);
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
        { prop: "onInvite", type: "(email, role) => Promise<void>", description: t("docs.teamInvite.props.onInvite") },
        { prop: "onRevokeInvite", type: "(email) => void", description: t("docs.teamInvite.props.onRevokeInvite") },
        { prop: "onChangeMemberRole", type: "(email, role) => void", description: t("docs.teamInvite.props.onChangeMemberRole") },
        { prop: "maxMembers", type: "number", description: t("docs.teamInvite.props.maxMembers") },
      ]}
      notes={t("docs.teamInvite.notes", { returnObjects: true }) as string[]}
      prevDoc={{ name: "UpgradeModal", path: "/docs/upgrade-modal" }}
      nextDoc={{ name: "InvoiceRow", path: "/docs/invoice-row" }}
    />
  );
}
