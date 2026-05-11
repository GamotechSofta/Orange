import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Settings, UserCircle } from "lucide-react";
import { api } from "../lib/api.js";

/** Password is never returned from the API — show a fixed masked line */
const PASSWORD_MASK = "\u2022".repeat(10);

export default function AdminSettings() {
  const [savedName, setSavedName] = useState("");
  const [savedEmail, setSavedEmail] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setError("");
    api
      .getMe()
      .then((res) => {
        if (cancelled) return;
        const u = res?.data;
        if (u) {
          const n = u.name || "";
          const e = u.email || "";
          setName(n);
          setEmail(e);
          setSavedName(n);
          setSavedEmail(e);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Could not load profile");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const startEdit = () => {
    setError("");
    setSuccess("");
    setName(savedName);
    setEmail(savedEmail);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setName(savedName);
    setEmail(savedEmail);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    setIsEditing(false);
  };

  const onSave = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (newPassword || confirmPassword) {
      if (newPassword !== confirmPassword) {
        setError("New password and confirmation do not match");
        return;
      }
      if (!currentPassword) {
        setError("Enter your current password to set a new password");
        return;
      }
    }
    setSaving(true);
    try {
      const payload = { name: name.trim(), email: email.trim() };
      if (newPassword) {
        payload.currentPassword = currentPassword;
        payload.newPassword = newPassword;
      }
      const res = await api.updateMe(payload);
      const u = res?.data;
      if (u) {
        const n = u.name || "";
        const e = u.email || "";
        setName(n);
        setEmail(e);
        setSavedName(n);
        setSavedEmail(e);
      }
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setSuccess("Profile updated.");
      setIsEditing(false);
      window.dispatchEvent(new Event("admin-profile-updated"));
    } catch (err) {
      setError(err.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="text-sm text-white/60">
        <p>Loading profile…</p>
      </section>
    );
  }

  const cardClass =
    "space-y-5 rounded-xl border-2 border-violet-500/50 bg-gradient-to-br from-violet-950/25 via-[#0c0e14] to-indigo-950/15 p-6 shadow-[0_0_32px_-10px_rgba(109,40,217,0.45)]";

  const rowClass =
    "rounded-lg border border-white/[0.08] bg-[#0f1419]/80 px-3 py-3 sm:px-4";

  return (
    <section className="mx-auto max-w-xl space-y-6">
      <div className="flex items-start gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/20 text-violet-200 ring-1 ring-violet-400/30">
          <Settings className="size-5" strokeWidth={1.75} />
        </div>
        <div>
          <h1 className="bg-gradient-to-r from-violet-200 to-fuchsia-200 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
            Account settings
          </h1>
          <p className="mt-1 text-sm text-white/55">
            {isEditing
              ? "Edit your details below, then save."
              : "Name and email are shown below; only the password is masked. Use Edit to change anything."}
          </p>
        </div>
      </div>

      <Link
        to="/"
        className="inline-block text-sm text-violet-400/90 hover:text-violet-300"
      >
        ← Back to dashboard
      </Link>

      {error ? (
        <div className="rounded-lg border border-rose-500/35 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
          {error}
        </div>
      ) : null}
      {success ? (
        <div className="rounded-lg border border-emerald-500/35 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
          {success}
        </div>
      ) : null}

      {!isEditing ? (
        <div className={cardClass}>
          <div className="flex items-center gap-2 text-white/80">
            <UserCircle className="size-5 text-violet-300" strokeWidth={1.75} />
            <span className="text-sm font-medium">Profile</span>
          </div>

          <div className="space-y-3">
            <div className={rowClass}>
              <p className="text-[11px] font-medium uppercase tracking-wide text-white/45">Name</p>
              <p className="mt-1.5 break-words text-base font-medium text-white">
                {savedName || "—"}
              </p>
            </div>
            <div className={rowClass}>
              <p className="text-[11px] font-medium uppercase tracking-wide text-white/45">Email</p>
              <p className="mt-1.5 break-all text-base font-medium text-violet-200/95">
                {savedEmail || "—"}
              </p>
            </div>
            <div className={rowClass}>
              <p className="text-[11px] font-medium uppercase tracking-wide text-white/45">
                Password
              </p>
              <p className="mt-1.5 font-mono text-lg tracking-[0.25em] text-violet-200/90">
                {PASSWORD_MASK}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={startEdit}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-900/35 hover:from-violet-500 hover:to-fuchsia-500 sm:w-auto sm:px-8"
          >
            <Pencil className="size-4" strokeWidth={2} />
            Edit / update
          </button>
        </div>
      ) : (
        <form onSubmit={onSave} className={cardClass}>
          <div className="flex items-center gap-2 text-white/80">
            <UserCircle className="size-5 text-violet-300" strokeWidth={1.75} />
            <span className="text-sm font-medium">Edit profile</span>
          </div>

          <label className="block">
            <span className="mb-1 block text-xs font-medium text-white/65">Name</span>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-white/12 bg-[#0f1419] px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-white/65">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-white/12 bg-[#0f1419] px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
            />
          </label>

          <div className="border-t border-white/10 pt-5">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-white/45">
              Change password (optional)
            </p>
            <div className="space-y-3">
              <label className="block">
                <span className="mb-1 block text-xs text-white/55">Current password</span>
                <input
                  type="password"
                  autoComplete="current-password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full rounded-lg border border-white/12 bg-[#0f1419] px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs text-white/55">New password</span>
                <input
                  type="password"
                  autoComplete="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-lg border border-white/12 bg-[#0f1419] px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs text-white/55">Confirm new password</span>
                <input
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-lg border border-white/12 bg-[#0f1419] px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
                />
              </label>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-900/35 hover:from-violet-500 hover:to-fuchsia-500 disabled:opacity-50"
            >
              {saving ? "Saving…" : "Update"}
            </button>
            <button
              type="button"
              onClick={cancelEdit}
              disabled={saving}
              className="rounded-lg border border-white/15 bg-transparent px-6 py-2.5 text-sm font-medium text-white/85 hover:bg-white/[0.06] disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
