import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import DashboardOverview from "../components/DashboardOverview.jsx";
import { api } from "../lib/api.js";

const emptyStats = { apiServices: 0, games: 0, platforms: 0, users: 0 };

export default function AdminDashboard() {
  const { user } = useOutletContext() || {};
  const [stats, setStats] = useState(emptyStats);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    Promise.all([api.getApiServices(), api.getGames(), api.getPlatforms(), api.getUsers()])
      .then(([a, g, p, u]) => {
        if (cancelled) return;
        setStats({
          apiServices: a?.count || a?.data?.length || 0,
          games: g?.count || g?.data?.length || 0,
          platforms: p?.count || p?.data?.length || 0,
          users: u?.total || u?.count || u?.data?.length || 0,
        });
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Failed to load dashboard data");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <DashboardOverview stats={stats} error={error} basePath="" adminName={user?.name} />
  );
}
