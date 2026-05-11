import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Lock, Mail } from "lucide-react";
import { api } from "../lib/api.js";

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from && location.state.from !== "/login" ? location.state.from : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.login(email.trim(), password);
      const token = res?.token;
      if (!token) throw new Error("No token returned");
      localStorage.setItem("token", token);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-[#0b0e14] px-4 py-12 text-white">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-700 shadow-lg shadow-violet-600/30 ring-1 ring-violet-400/25">
          <Box className="size-6 text-white" strokeWidth={2} />
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-wide">Orange</p>
          <p className="text-xs text-white/45">Admin sign in</p>
        </div>
      </div>

      <div className="w-full max-w-md rounded-xl border-2 border-violet-500/50 bg-gradient-to-br from-violet-950/30 via-[#0c0e14] to-indigo-950/20 p-8 shadow-[0_0_40px_-12px_rgba(109,40,217,0.4)]">
        <h1 className="text-xl font-semibold text-white">Sign in</h1>
        <p className="mt-1 text-sm text-white/55">
          Use an account with the <span className="text-violet-300">admin</span> role (create or
          update the user in your database, then sign in here).
        </p>

        {error ? (
          <div className="mt-4 rounded-lg border border-rose-500/35 bg-rose-500/10 px-3 py-2 text-sm text-rose-100">
            {error}
          </div>
        ) : null}

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-1.5 flex items-center gap-2 text-xs font-medium text-white/70">
              <Mail className="size-3.5" strokeWidth={2} />
              Email
            </span>
            <input
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-white/12 bg-[#0f1419] px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 flex items-center gap-2 text-xs font-medium text-white/70">
              <Lock className="size-3.5" strokeWidth={2} />
              Password
            </span>
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-white/12 bg-[#0f1419] px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-900/35 hover:from-violet-500 hover:to-fuchsia-500 disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>

      <p className="mt-8 text-center text-xs text-white/40">
        Trouble signing in? Confirm <code className="text-violet-300/90">role: &quot;admin&quot;</code>{" "}
        for your user in MongoDB.
      </p>
    </div>
  );
}
