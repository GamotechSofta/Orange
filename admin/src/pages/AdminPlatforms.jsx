import AdminCatalogPage from "../components/AdminCatalogPage.jsx";
import { api } from "../lib/api.js";

const entityPlural = "platforms";
const entitySingular = "platform";

const columns = [
  { key: "title", label: "Title" },
  {
    key: "description",
    label: "Description",
    render: (v) =>
      !v ? "—" : v.length > 48 ? `${String(v).slice(0, 48)}…` : String(v),
  },
  { key: "iconName", label: "Icon" },
  { key: "order", label: "Order" },
  { key: "active", label: "Active", render: (v) => (v ? "Yes" : "No") },
];

const formFields = [
  { key: "title", label: "Title", type: "text" },
  { key: "description", label: "Description", type: "textarea", rows: 4, fullWidth: true },
  { key: "iconName", label: "Icon name", type: "text" },
  { key: "iconClass", label: "Icon class", type: "text" },
  { key: "glowTop", label: "Glow top", type: "text", fullWidth: true },
  { key: "gradient", label: "Gradient", type: "textarea", rows: 2, fullWidth: true },
  { key: "glow", label: "Glow", type: "text", fullWidth: true },
  { key: "borderHover", label: "Border hover", type: "text", fullWidth: true },
  { key: "linkClass", label: "Link class", type: "text", fullWidth: true },
  { key: "order", label: "Order", type: "number" },
  { key: "active", label: "Active", type: "checkbox" },
];

function getEmptyForm() {
  return {
    title: "",
    description: "",
    iconName: "ShipWheel",
    iconClass: "text-emerald-400",
    glowTop: "from-emerald-500/35 via-emerald-500/10",
    gradient:
      "from-emerald-500/[0.07] via-emerald-500/[0.02] to-transparent dark:from-emerald-500/10",
    glow: "shadow-[0_0_22px_-10px_rgba(34,197,94,0.16)]",
    borderHover: "hover:border-emerald-500/35",
    linkClass: "text-emerald-400 hover:text-emerald-300",
    order: 0,
    active: true,
  };
}

export default function AdminPlatforms() {
  return (
    <AdminCatalogPage
      title="Platforms"
      entityPlural={entityPlural}
      entitySingular={entitySingular}
      fetchAllItems={api.getPlatformsAll}
      fetchPublicFallback={api.getPlatforms}
      createItem={api.createPlatform}
      updateItem={api.updatePlatform}
      deleteItem={api.deletePlatform}
      formFields={formFields}
      columns={columns}
      getEmptyForm={getEmptyForm}
    />
  );
}
