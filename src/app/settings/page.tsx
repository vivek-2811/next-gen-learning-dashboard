import React from "react";
import { AlertCircle, User, Mail, ShieldAlert, Sparkles } from "lucide-react";
import { getProfile } from "@/actions/getProfile";
import DashboardShell from "@/components/DashboardShell";
import LogoutButton from "@/components/auth/LogoutButton";
import { CardBackgroundMesh } from "@/components/CardBackgroundMesh";

// Force dynamic render
export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const profileResult = await getProfile();

  if (profileResult.status === "error") {
    return (
      <DashboardShell>
        <div className="space-y-6 max-w-2xl py-4">
          <div className="bg-zinc-900/80 border border-red-500/20 rounded-3xl p-8 backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-500/50 via-rose-500/50 to-red-500/50" />
            
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 mt-1 shrink-0">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-extrabold text-white">Database Query Failed</h2>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  The settings server encountered an error while querying your profile.
                </p>
              </div>
            </div>

            <div className="mt-6 p-4.5 bg-black/60 rounded-2xl border border-zinc-800/80 font-mono text-xs text-red-300/90 leading-relaxed overflow-x-auto">
              Error: {profileResult.message}
            </div>
          </div>
        </div>
      </DashboardShell>
    );
  }

  const profile = profileResult.data;

  return (
    <DashboardShell
      title="Settings"
      subtitle="Manage your profile settings and application preferences."
      userName={profile.full_name || "Learner"}
    >
      <div className="max-w-2xl space-y-6">
        {/* Profile Card */}
        <section className="p-6 sm:p-8 bg-zinc-900/40 border border-white/[0.06] rounded-3xl relative overflow-hidden group">
          <CardBackgroundMesh />
          <div className="relative z-10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/[0.05] pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/15 text-blue-400">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Profile Details</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">Your registered personal data</p>
                </div>
              </div>
              <span className="text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                Active Student
              </span>
            </div>

            <div className="space-y-4">
              {/* Name Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block">Full Name</label>
                <div className="flex items-center gap-3 p-3.5 bg-zinc-950/50 border border-white/[0.03] rounded-xl text-sm font-semibold text-zinc-200">
                  <User className="h-4 w-4 text-zinc-650 animate-pulse" />
                  <span>{profile.full_name || "Not specified"}</span>
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block">Email Address</label>
                <div className="flex items-center gap-3 p-3.5 bg-zinc-950/50 border border-white/[0.03] rounded-xl text-sm font-semibold text-zinc-200">
                  <Mail className="h-4 w-4 text-zinc-650" />
                  <span>{profile.email || "No email available"}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Account Controls Card */}
        <section className="p-6 sm:p-8 bg-zinc-900/40 border border-white/[0.06] rounded-3xl relative overflow-hidden group">
          <CardBackgroundMesh />
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3 border-b border-white/[0.05] pb-4">
              <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/15 text-red-400">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Account Management</h3>
                <p className="text-xs text-zinc-500 mt-0.5">Sensitive control panel actions</p>
              </div>
            </div>

            <div className="w-48 bg-zinc-950/40 border border-white/[0.03] rounded-xl p-1">
              <LogoutButton />
            </div>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
