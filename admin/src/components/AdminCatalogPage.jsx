import { X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

/** Table header — violet / purple accent, all catalog pages */
const CATALOG_TABLE_HEAD =
  "bg-gradient-to-r from-violet-950 via-purple-950/95 to-indigo-950/90 text-[11px] font-semibold uppercase tracking-wider text-violet-100/90 border-b border-violet-500/25";

/** Catalog pages: violet primary + readable neutrals */
const CATALOG_UI = {
  title:
    "bg-gradient-to-r from-violet-200 via-fuchsia-200 to-purple-200 bg-clip-text text-2xl font-bold tracking-tight text-transparent",
  bar: "h-1 w-20 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-purple-500",
  rowHover: "transition-colors hover:bg-violet-500/[0.06]",
  tableFrame:
    "overflow-hidden rounded-xl border border-violet-500/20 bg-gradient-to-b from-violet-950/15 to-[#080a10] shadow-[0_0_36px_-14px_rgba(109,40,217,0.45)]",
  primary:
    "rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-900/35 hover:from-violet-500 hover:to-fuchsia-500 disabled:opacity-50",
  ghost:
    "rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-white/90 hover:bg-white/[0.08]",
  view: "rounded-md border border-sky-400/35 bg-sky-500/10 px-2.5 py-1 text-xs font-medium text-sky-200 hover:bg-sky-500/20",
  edit: "rounded-md border border-violet-400/35 bg-violet-500/10 px-2.5 py-1 text-xs font-medium text-violet-200 hover:bg-violet-500/20",
  delete:
    "rounded-md border border-rose-400/40 bg-rose-500/10 px-2.5 py-1 text-xs font-medium text-rose-200 hover:bg-rose-500/20",
  formCard:
    "rounded-xl border border-violet-500/20 bg-gradient-to-br from-violet-950/20 via-[#0c0e14] to-indigo-950/10 p-6",
  inputFocus: "focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20",
  modalHeader:
    "border-b border-violet-500/20 bg-gradient-to-r from-violet-950/40 to-transparent px-5 py-4",
};

function castValue(value, type) {
  if (type === "number") {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
  }
  if (type === "checkbox") return Boolean(value);
  return value;
}

function buildPayload(formFields, formData) {
  const payload = {};
  formFields.forEach((field) => {
    payload[field.key] = castValue(formData[field.key], field.type);
  });
  return payload;
}

function prettyLabel(key) {
  if (key === "_id") return "ID";
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

function formatDetailValue(key, value) {
  if (value === null || value === undefined) return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "object") return JSON.stringify(value, null, 2);
  if (typeof value === "string" && /At$/.test(key)) {
    const d = new Date(value);
    if (!Number.isNaN(d.getTime())) return d.toLocaleString();
  }
  return String(value);
}

function FormFields({ formFields, formData, setFormData, disabled }) {
  const baseInput = `rounded-lg border border-white/12 bg-[#0f1419] px-3 py-2 text-sm text-white outline-none ${CATALOG_UI.inputFocus}`;
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {formFields.map((field) => (
        <label
          key={field.key}
          className={`flex flex-col gap-1.5 text-sm ${field.fullWidth ? "md:col-span-2" : ""}`}
        >
          <span className="font-medium text-white/70">{field.label}</span>
          {field.type === "checkbox" ? (
            <input
              type="checkbox"
              disabled={disabled}
              checked={Boolean(formData[field.key])}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, [field.key]: e.target.checked }))
              }
              className="h-4 w-4 rounded accent-violet-500"
            />
          ) : field.type === "textarea" ? (
            <textarea
              disabled={disabled}
              rows={field.rows || 3}
              value={formData[field.key] ?? ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, [field.key]: e.target.value }))
              }
              className={`${baseInput} min-h-[4.5rem] resize-y`}
            />
          ) : (
            <input
              type={field.type === "number" ? "number" : "text"}
              disabled={disabled}
              value={
                field.type === "number"
                  ? formData[field.key] === "" || formData[field.key] === undefined
                    ? ""
                    : formData[field.key]
                  : (formData[field.key] ?? "")
              }
              onChange={(e) => {
                const raw = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  [field.key]:
                    field.type === "number" ? (raw === "" ? "" : Number(raw)) : raw,
                }));
              }}
              className={baseInput}
            />
          )}
        </label>
      ))}
    </div>
  );
}

/**
 * Admin CRUD for catalog entities (API services, games, platforms).
 */
export default function AdminCatalogPage({
  title,
  subtitle = "Manage catalog entries. Changes save to the database and refresh this table.",
  entityPlural,
  entitySingular,
  fetchAllItems,
  /** Used when admin list fails with 401/403 (e.g. not signed in): show active items from public API. */
  fetchPublicFallback,
  createItem,
  updateItem,
  deleteItem,
  formFields,
  columns,
  getEmptyForm,
}) {
  const a = CATALOG_UI;
  const [searchParams, setSearchParams] = useSearchParams();
  const panel = searchParams.get("panel") === "add" ? "add" : "list";

  const goList = useCallback(() => {
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState(() => getEmptyForm());
  const [detailItem, setDetailItem] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (panel === "add") {
      setFormData(getEmptyForm());
      setEditItem(null);
    }
  }, [panel, getEmptyForm]);

  const load = useCallback(() => {
    setLoading(true);
    setError("");
    return fetchAllItems()
      .then((res) => {
        setItems(Array.isArray(res?.data) ? res.data : []);
      })
      .catch((err) => {
        const status = err?.status;
        const unauthorized = status === 401 || status === 403;
        if (unauthorized && typeof fetchPublicFallback === "function") {
          return fetchPublicFallback()
            .then((res) => {
              setItems(Array.isArray(res?.data) ? res.data : []);
              setError("");
            })
            .catch((fallbackErr) => {
              setError(fallbackErr.message || "Failed to load data");
              setItems([]);
            });
        }
        setError(err.message || "Failed to load data");
        setItems([]);
      })
      .finally(() => setLoading(false));
  }, [fetchAllItems, fetchPublicFallback]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") {
        setDetailItem(null);
        setEditItem(null);
        if (panel === "add") goList();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [panel, goList]);

  const onCreate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = buildPayload(formFields, formData);
      await createItem(payload);
      setFormData(getEmptyForm());
      goList();
      await load();
    } catch (err) {
      setError(err.message || "Failed to create");
    } finally {
      setSaving(false);
    }
  };

  const onSaveEdit = async (e) => {
    e.preventDefault();
    if (!editItem?._id) return;
    setSaving(true);
    setError("");
    try {
      const payload = buildPayload(formFields, formData);
      const res = await updateItem(editItem._id, payload);
      const updated = res?.data;
      if (updated?._id) {
        setItems((prev) => prev.map((row) => (row._id === updated._id ? updated : row)));
      } else {
        await load();
      }
      setEditItem(null);
      setFormData(getEmptyForm());
    } catch (err) {
      setError(err.message || "Failed to update");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id) => {
    if (!window.confirm(`Delete this ${entitySingular}?`)) return;
    setError("");
    try {
      await deleteItem(id);
      setItems((prev) => prev.filter((row) => row._id !== id));
      if (detailItem?._id === id) setDetailItem(null);
      if (editItem?._id === id) {
        setEditItem(null);
        setFormData(getEmptyForm());
      }
    } catch (err) {
      setError(err.message || "Failed to delete");
    }
  };

  const openEdit = (item) => {
    const next = {};
    formFields.forEach((field) => {
      next[field.key] = item[field.key];
    });
    setFormData(next);
    setEditItem(item);
    setDetailItem(null);
  };

  const detailRows = detailItem
    ? Object.entries(detailItem)
        .filter(([k]) => k !== "__v")
        .sort(([a], [b]) => a.localeCompare(b))
    : [];

  return (
    <section className="space-y-6">
      <div>
        <h2 className={`text-3xl font-bold tracking-tight ${a.title}`}>{title}</h2>
        <div className={`mt-3 ${a.bar}`} />
        <p className="mt-3 max-w-xl text-sm text-white/55">{subtitle}</p>
      </div>

      {error ? (
        <div className="rounded-xl border border-rose-500/35 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
          {error}
        </div>
      ) : null}

      {panel === "add" ? (
        <div className={a.formCard}>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-white">Add {entitySingular}</h3>
            <button
              type="button"
              className={a.ghost}
              onClick={() => {
                goList();
                setFormData(getEmptyForm());
              }}
            >
              Back to list
            </button>
          </div>
          <form onSubmit={onCreate} className="space-y-5">
            <FormFields
              formFields={formFields}
              formData={formData}
              setFormData={setFormData}
              disabled={saving}
            />
            <div className="flex flex-wrap gap-3">
              <button type="submit" disabled={saving} className={a.primary}>
                {saving ? "Saving…" : `Save ${entitySingular}`}
              </button>
            </div>
          </form>
        </div>
      ) : null}

      {panel === "list" ? (
        <div className={a.tableFrame}>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className={CATALOG_TABLE_HEAD}>
                <tr>
                  {columns.map((col) => (
                    <th key={col.key} className="whitespace-nowrap px-4 py-3.5">
                      {col.label}
                    </th>
                  ))}
                  <th className="whitespace-nowrap px-4 py-3.5">Actions</th>
                </tr>
              </thead>
              <tbody className="text-white/85">
                {loading ? (
                  <tr>
                    <td
                      className="px-4 py-8 text-center text-white/55"
                      colSpan={columns.length + 1}
                    >
                      Loading…
                    </td>
                  </tr>
                ) : items.length === 0 ? (
                  <tr>
                    <td
                      className="px-4 py-8 text-center text-white/55"
                      colSpan={columns.length + 1}
                    >
                      No {entityPlural} yet. Use the sidebar (Show / Add) to add one.
                    </td>
                  </tr>
                ) : (
                  items.map((item) => (
                    <tr key={item._id} className={`border-t border-white/[0.06] ${a.rowHover}`}>
                      {columns.map((col) => (
                        <td key={`${item._id}-${col.key}`} className="max-w-[14rem] px-4 py-3">
                          <div className="truncate">
                            {col.render
                              ? col.render(item[col.key], item)
                              : String(item[col.key] ?? "—")}
                          </div>
                        </td>
                      ))}
                      <td className="whitespace-nowrap px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            className={a.view}
                            onClick={() => setDetailItem(item)}
                          >
                            View detail
                          </button>
                          <button type="button" className={a.edit} onClick={() => openEdit(item)}>
                            Edit
                          </button>
                          <button
                            type="button"
                            className={a.delete}
                            onClick={() => onDelete(item._id)}
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
      ) : null}

      {detailItem ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="detail-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setDetailItem(null);
          }}
        >
          <div
            className="max-h-[85vh] w-full max-w-lg overflow-hidden rounded-xl border border-violet-500/20 bg-[#0b0f14] shadow-2xl shadow-violet-950/40"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`flex items-center justify-between ${a.modalHeader}`}>
              <h3 id="detail-modal-title" className={`text-lg font-semibold ${a.title}`}>
                {detailItem.title || "Details"}
              </h3>
              <button
                type="button"
                onClick={() => setDetailItem(null)}
                className="rounded-lg p-2 text-white/55 hover:bg-white/10 hover:text-white"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="max-h-[calc(85vh-5rem)] overflow-y-auto px-5 py-4">
              <dl className="space-y-3">
                {detailRows.map(([key, value]) => (
                  <div
                    key={key}
                    className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-2.5"
                  >
                    <dt className="text-[11px] font-semibold uppercase tracking-wide text-white/45">
                      {prettyLabel(key)}
                    </dt>
                    <dd className="mt-1 break-words text-sm text-white/88">
                      {formatDetailValue(key, value)}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      ) : null}

      {editItem ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setEditItem(null);
              setFormData(getEmptyForm());
            }
          }}
        >
          <div
            className="max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-xl border border-violet-500/20 bg-[#0b0f14] shadow-2xl shadow-violet-950/40"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`flex items-center justify-between ${a.modalHeader}`}>
              <h3 className={`text-lg font-semibold ${a.title}`}>Edit {entitySingular}</h3>
              <button
                type="button"
                onClick={() => {
                  setEditItem(null);
                  setFormData(getEmptyForm());
                }}
                className="rounded-lg p-2 text-white/55 hover:bg-white/10 hover:text-white"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="max-h-[calc(90vh-5rem)] overflow-y-auto px-5 py-5">
              <form onSubmit={onSaveEdit} className="space-y-5">
                <FormFields
                  formFields={formFields}
                  formData={formData}
                  setFormData={setFormData}
                  disabled={saving}
                />
                <div className="flex flex-wrap gap-3">
                  <button type="submit" disabled={saving} className={a.primary}>
                    {saving ? "Saving…" : "Save changes"}
                  </button>
                  <button
                    type="button"
                    className={a.ghost}
                    onClick={() => {
                      setEditItem(null);
                      setFormData(getEmptyForm());
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
