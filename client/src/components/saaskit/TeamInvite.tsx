/**
 * @saaskit/team-invite
 * Design: Developer-first Brutalism Doux — dark bg, emerald accent
 * Usage: npx shadcn add @saaskit/team-invite
 *
 * Invitation par email avec sélection de rôle
 */

import { useState } from "react";
import { UserPlus, X, Mail, ChevronDown, Check, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export type TeamRole = "admin" | "member" | "viewer";

interface PendingInvite {
  email: string;
  role: TeamRole;
  sentAt: Date;
}

interface TeamMember {
  name: string;
  email: string;
  role: TeamRole;
  avatarUrl?: string;
}

interface TeamInviteProps {
  members?: TeamMember[];
  pendingInvites?: PendingInvite[];
  onInvite?: (email: string, role: TeamRole) => Promise<void> | void;
  onRevokeInvite?: (email: string) => void;
  onChangeMemberRole?: (email: string, role: TeamRole) => void;
  maxMembers?: number;
  className?: string;
}

const roleLabels: Record<TeamRole, string> = {
  admin: "Admin",
  member: "Membre",
  viewer: "Lecteur",
};

const roleDescriptions: Record<TeamRole, string> = {
  admin: "Accès complet, gestion des membres",
  member: "Peut créer et modifier",
  viewer: "Lecture seule",
};

function RoleSelect({
  value,
  onChange,
}: {
  value: TeamRole;
  onChange: (role: TeamRole) => void;
}) {
  const [open, setOpen] = useState(false);
  const roles: TeamRole[] = ["admin", "member", "viewer"];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-muted/50"
      >
        {roleLabels[value]}
        <ChevronDown className="h-3 w-3" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 z-20 w-48 rounded-lg border border-border bg-popover shadow-xl overflow-hidden">
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => {
                  onChange(role);
                  setOpen(false);
                }}
                className="w-full flex items-start gap-2 px-3 py-2.5 hover:bg-muted/50 transition-colors text-left"
              >
                <Check
                  className={cn(
                    "h-4 w-4 mt-0.5 flex-shrink-0",
                    value === role ? "text-primary" : "opacity-0"
                  )}
                />
                <div>
                  <div className="text-sm font-medium text-foreground">{roleLabels[role]}</div>
                  <div className="text-xs text-muted-foreground">{roleDescriptions[role]}</div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function Avatar({ name, avatarUrl }: { name: string; avatarUrl?: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        className="h-8 w-8 rounded-full object-cover"
      />
    );
  }

  return (
    <div className="h-8 w-8 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center flex-shrink-0">
      <span className="text-xs font-semibold text-primary">{initials}</span>
    </div>
  );
}

export function TeamInvite({
  members = [],
  pendingInvites: initialPending = [],
  onInvite,
  onRevokeInvite,
  onChangeMemberRole,
  maxMembers,
  className,
}: TeamInviteProps) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<TeamRole>("member");
  const [pending, setPending] = useState<PendingInvite[]>(initialPending);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalCount = members.length + pending.length;
  const atLimit = maxMembers !== undefined && totalCount >= maxMembers;

  const handleInvite = async () => {
    if (!email.trim()) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Adresse email invalide");
      return;
    }
    if (members.some((m) => m.email === email) || pending.some((p) => p.email === email)) {
      setError("Cette adresse est déjà invitée ou membre");
      return;
    }

    setError(null);
    setLoading(true);
    try {
      await onInvite?.(email, role);
      setPending((prev) => [...prev, { email, role, sentAt: new Date() }]);
      setEmail("");
    } finally {
      setLoading(false);
    }
  };

  const handleRevoke = (inviteEmail: string) => {
    setPending((prev) => prev.filter((p) => p.email !== inviteEmail));
    onRevokeInvite?.(inviteEmail);
  };

  return (
    <div className={cn("rounded-lg border border-border bg-card overflow-hidden", className)}>
      {/* Invite form */}
      <div className="p-4 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <UserPlus className="h-4 w-4 text-primary" />
          Inviter des membres
          {maxMembers && (
            <span className="ml-auto text-xs font-mono text-muted-foreground">
              {totalCount}/{maxMembers}
            </span>
          )}
        </h3>

        {atLimit ? (
          <div className="text-sm text-muted-foreground bg-muted/30 rounded-lg p-3 text-center">
            Limite de membres atteinte.{" "}
            <button className="text-primary hover:underline font-medium">
              Augmenter la limite →
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError(null);
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleInvite()}
                  placeholder="colleague@company.com"
                  className={cn(
                    "w-full pl-9 pr-3 py-2 text-sm rounded-md bg-input border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring transition-colors",
                    error ? "border-destructive" : "border-border"
                  )}
                />
              </div>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as TeamRole)}
                className="px-3 py-2 text-sm rounded-md bg-input border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              >
                {(["admin", "member", "viewer"] as TeamRole[]).map((r) => (
                  <option key={r} value={r}>
                    {roleLabels[r]}
                  </option>
                ))}
              </select>
              <button
                onClick={handleInvite}
                disabled={loading || !email.trim()}
                className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                {loading ? "..." : "Inviter"}
              </button>
            </div>
            {error && <p className="text-xs text-destructive">{error}</p>}
          </div>
        )}
      </div>

      {/* Members list */}
      {members.length > 0 && (
        <div className="divide-y divide-border">
          {members.map((member) => (
            <div key={member.email} className="flex items-center gap-3 px-4 py-3">
              <Avatar name={member.name} avatarUrl={member.avatarUrl} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground truncate">{member.name}</div>
                <div className="text-xs text-muted-foreground truncate">{member.email}</div>
              </div>
              <RoleSelect
                value={member.role}
                onChange={(newRole) => onChangeMemberRole?.(member.email, newRole)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Pending invites */}
      {pending.length > 0 && (
        <div className="border-t border-border">
          <div className="px-4 py-2 bg-muted/20">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Invitations en attente
            </span>
          </div>
          <div className="divide-y divide-border">
            {pending.map((invite) => (
              <div key={invite.email} className="flex items-center gap-3 px-4 py-3">
                <div className="h-8 w-8 rounded-full bg-muted/50 border border-border flex items-center justify-center flex-shrink-0">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-foreground truncate">{invite.email}</div>
                  <div className="text-xs text-muted-foreground">
                    {roleLabels[invite.role]} · Envoyé{" "}
                    {invite.sentAt.toLocaleDateString("fr-FR")}
                  </div>
                </div>
                <button
                  onClick={() => handleRevoke(invite.email)}
                  className="p-1 rounded hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Révoquer l'invitation"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
