import { useEffect, useState } from "react";

function castValue(value, type) {
  if (type === "number") return Number(value);
  if (type === "checkbox") return Boolean(value);
  return value;
}

/** Match catalog pages (API Services / Games / Platforms) */
const CATALOG_TABLE_HEAD =
  "bg-gradient-to-r from-violet-950 via-purple-950/95 to-indigo-950/90 text-[11px] font-semibold uppercase tracking-wider text-violet-100/90 border-b border-violet-500/25";
const CATALOG_TABLE_FRAME =
  "overflow-hidden rounded-xl border border-violet-500/20 bg-gradient-to-b from-violet-950/15 to-[#080a10] shadow-[0_0_36px_-14px_rgba(109,40,217,0.45)]";
const CATALOG_ROW_HOVER = "transition-colors hover:bg-violet-500/[0.06]";
const CATALOG_TITLE =
  "bg-gradient-to-r from-violet-200 via-fuchsia-200 to-purple-200 bg-clip-text text-3xl font-bold tracking-tight text-transparent";
const CATALOG_BAR =
  "h-1 w-20 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-purple-500";
const BTN_DELETE =
  "rounded-md border border-rose-400/40 bg-rose-500/10 px-2.5 py-1 text-xs font-medium text-rose-200 hover:bg-rose-500/20";

export default function AdminResourcePage({
  title,
  subtitle = "Data is loaded from existing backend routes/controllers.",
  fetchItems,
  columns,
  editFields = [],
  updateItem,
  deleteItem,
  /** When true, no edit form or Edit button (delete only if deleteItem is set). */
  hideEdit = false,
  /** When "catalog", table and title match API Services / Games / Platforms styling. */
  tableVariant = "default",
  emptyMessage = "No data found.",
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState("");
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");

    fetchItems()
      .then((res) => {
        if (cancelled) return;
        setItems(Array.isArray(res?.data) ? res.data : []);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message || "Failed to fetch data");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [fetchItems]);

  const onEdit = (item) => {
    setEditingId(item._id);
    const next = {};
    editFields.forEach((field) => {
      next[field.key] = item[field.key];
    });
    setFormData(next);
  };

  const onCancel = () => {
    setEditingId("");
    setFormData({});
  };

  const onSave = async () => {
    if (!editingId || hideEdit || !updateItem) return;
    setSaving(true);
    setError("");
    try {
      const payload = {};
      editFields.forEach((field) => {
        payload[field.key] = castValue(formData[field.key], field.type);
      });
      const res = await updateItem(editingId, payload);
      const updated = res?.data;
      if (updated?._id) {
        setItems((prev) => prev.map((row) => (row._id === updated._id ? updated : row)));
      }
      onCancel();
    } catch (err) {
      setError(err.message || "Failed to update record");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id) => {
    if (!window.confirm("Delete this record?")) return;
    setError("");
    try {
      await deleteItem(id);
      setItems((prev) => prev.filter((row) => row._id !== id));
      if (id === editingId) onCancel();
    } catch (err) {
      setError(err.message || "Failed to delete record");
    }
  };

  const isCatalog = tableVariant === "catalog";

  return (
    <section className="space-y-6">
      <div>
        <h2 className={isCatalog ? CATALOG_TITLE : "text-2xl font-semibold text-white"}>{title}</h2>
        {isCatalog ? <div className={`mt-3 ${CATALOG_BAR}`} /> : null}
        <p className={`mt-3 max-w-xl text-sm ${isCatalog ? "text-white/55" : "mt-1 text-xs text-white/60"}`}>
          {subtitle}
        </p>
      </div>

      {error ? (
        <div className="rounded-xl border border-rose-500/35 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
          {error}
        </div>
      ) : null}

      {!hideEdit && editingId ? (
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="mb-3 text-sm font-medium">Edit record</p>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {editFields.map((field) => (
              <label key={field.key} className="flex flex-col gap-1 text-sm">
                <span className="text-white/75">{field.label}</span>
                {field.type === "checkbox" ? (
                  <input
                    type="checkbox"
                    checked={Boolean(formData[field.key])}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, [field.key]: e.target.checked }))
                    }
                    className="h-4 w-4 rounded accent-emerald-500"
                  />
                ) : (
                  <input
                    type={field.type || "text"}
                    value={formData[field.key] ?? ""}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, [field.key]: e.target.value }))
                    }
                    className="rounded-lg border border-white/15 bg-[#111827] px-3 py-2 text-white outline-none focus:border-emerald-500/50"
                  />
                )}
              </label>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={onSave}
              disabled={saving}
              className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-black hover:bg-emerald-400 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/90 hover:bg-white/5"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}

      <div className={isCatalog ? CATALOG_TABLE_FRAME : "overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]"}>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead
              className={
                isCatalog
                  ? CATALOG_TABLE_HEAD
                  : "bg-white/[0.04] text-xs uppercase tracking-wide text-white/60"
              }
            >
              <tr>
                {columns.map((col) => (
                  <th key={col.key} className="whitespace-nowrap px-4 py-3.5 font-medium">
                    {col.label}
                  </th>
                ))}
                <th className="whitespace-nowrap px-4 py-3.5 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className={isCatalog ? "text-white/85" : ""}>
              {loading ? (
                <tr>
                  <td
                    className={`px-4 py-8 ${isCatalog ? "text-center text-white/55" : "py-5 text-white/70"}`}
                    colSpan={columns.length + 1}
                  >
                    Loading…
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td
                    className={`px-4 py-8 ${isCatalog ? "text-center text-white/55" : "py-5 text-white/70"}`}
                    colSpan={columns.length + 1}
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr
                    key={item._id}
                    className={`border-t border-white/[0.06] ${isCatalog ? CATALOG_ROW_HOVER : "border-white/10"}`}
                  >
                    {columns.map((col) => (
                      <td key={`${item._id}-${col.key}`} className="max-w-[14rem] px-4 py-3">
                        <div className={isCatalog ? "truncate" : ""}>
                          {col.render
                            ? col.render(item[col.key], item)
                            : String(item[col.key] ?? "—")}
                        </div>
                      </td>
                    ))}
                    <td className="whitespace-nowrap px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        {!hideEdit ? (
                          <button
                            type="button"
                            onClick={() => onEdit(item)}
                            className="rounded-md border border-sky-400/35 bg-sky-500/10 px-2.5 py-1 text-xs font-medium text-sky-200 hover:bg-sky-500/20"
                          >
                            Edit
                          </button>
                        ) : null}
                        <button
                          type="button"
                          onClick={() => onDelete(item._id)}
                          className={isCatalog ? BTN_DELETE : "rounded border border-rose-400/40 px-2.5 py-1 text-xs text-rose-300 hover:bg-rose-400/10"}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
