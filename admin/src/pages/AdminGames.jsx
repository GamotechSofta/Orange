import { useState } from "react";
import AdminCatalogPage from "../components/AdminCatalogPage.jsx";
import { api } from "../lib/api.js";

const entityPlural = "games";
const entitySingular = "game";

/** Absolute URL or site-root path; relative paths need VITE_FRONTEND_URL in admin/.env */
function resolveGameImageUrl(raw) {
  const s = String(raw ?? "").trim();
  if (!s) return null;
  if (/^https?:\/\//i.test(s)) return s;
  if (s.startsWith("/")) {
    const base = String(import.meta.env.VITE_FRONTEND_URL || "").replace(/\/+$/, "");
    return base ? `${base}${s}` : s;
  }
  return s;
}

function GameImageCell({ value }) {
  const [broken, setBroken] = useState(false);
  const resolved = resolveGameImageUrl(value);
  if (!resolved) return "—";
  if (broken) {
    const t = String(value);
    return (
      <span className="text-[11px] leading-snug text-amber-200/85" title={t}>
        {t.length > 42 ? `${t.slice(0, 42)}…` : t}
      </span>
    );
  }
  return (
    <img
      src={resolved}
      alt=""
      loading="lazy"
      className="h-14 w-[4.75rem] shrink-0 rounded-lg border border-white/10 bg-black/40 object-cover align-middle"
      onError={() => setBroken(true)}
    />
  );
}

const columns = [
  { key: "title", label: "Title" },
  {
    key: "description",
    label: "Description",
    render: (v) =>
      !v ? "—" : v.length > 48 ? `${String(v).slice(0, 48)}…` : String(v),
  },
  {
    key: "imageSrc",
    label: "Image",
    cellNoTruncate: true,
    cellWide: true,
    render: (v) => <GameImageCell value={v} />,
  },
  { key: "order", label: "Order" },
  { key: "active", label: "Active", render: (v) => (v ? "Yes" : "No") },
];

const formFields = [
  { key: "title", label: "Title", type: "text" },
  { key: "description", label: "Description", type: "textarea", rows: 4, fullWidth: true },
  { key: "imageSrc", label: "Image URL or upload", type: "imageUrl", fullWidth: true },
  { key: "order", label: "Order", type: "number" },
  { key: "active", label: "Active", type: "checkbox" },
];

function getEmptyForm() {
  return {
    title: "",
    description: "",
    imageSrc: "",
    order: 0,
    active: true,
  };
}

export default function AdminGames() {
  return (
    <AdminCatalogPage
      title="Games"
      entityPlural={entityPlural}
      entitySingular={entitySingular}
      fetchAllItems={api.getGamesAll}
      fetchPublicFallback={api.getGames}
      createItem={api.createGame}
      updateItem={api.updateGame}
      deleteItem={api.deleteGame}
      formFields={formFields}
      columns={columns}
      getEmptyForm={getEmptyForm}
    />
  );
}
