import AdminCatalogPage from "../components/AdminCatalogPage.jsx";
import { api } from "../lib/api.js";

const entityPlural = "API services";
const entitySingular = "API service";

const truncate = (v, n) =>
  !v ? "—" : String(v).length > n ? `${String(v).slice(0, n)}…` : String(v);

const columns = [
  { key: "title", label: "Title" },
  {
    key: "shortDescription",
    label: "Short description",
    render: (v) => truncate(v, 48),
  },
  {
    key: "features",
    label: "Features",
    render: (v) => (Array.isArray(v) && v.length ? `${v.length}` : "—"),
  },
  {
    key: "technicalDetails",
    label: "Tech",
    render: (v) => (Array.isArray(v) && v.length ? `${v.length}` : "—"),
  },
  { key: "iconName", label: "Icon" },
  { key: "active", label: "Active", render: (v) => (v ? "Yes" : "No") },
];

const formFields = [
  { key: "title", label: "Title", type: "text" },
  {
    key: "shortDescription",
    label: "Short description (shown on home card)",
    type: "text",
    fullWidth: true,
  },
  {
    key: "description",
    label: "Description (full — shown on details page)",
    type: "textarea",
    rows: 4,
    fullWidth: true,
  },
  {
    key: "features",
    label: "Key feature points",
    type: "pointList",
    fullWidth: true,
    placeholder: "Type a feature, e.g. 1000+ slots & live dealer",
  },
  {
    key: "technicalDetails",
    label: "Technical details",
    type: "pointList",
    fullWidth: true,
    placeholder: "Type a technical detail, e.g. REST + WebSocket APIs",
  },
  { key: "iconName", label: "Icon name", type: "text" },
  { key: "iconColorClass", label: "Icon color class", type: "text" },
  { key: "glow", label: "Glow", type: "text" },
  { key: "mobileTopFade", label: "Mobile top fade", type: "text" },
  { key: "ctaClass", label: "CTA class", type: "text", fullWidth: true },
  { key: "active", label: "Active", type: "checkbox" },
];

function getEmptyForm() {
  return {
    title: "",
    shortDescription: "",
    description: "",
    features: [],
    technicalDetails: [],
    iconName: "Dices",
    iconColorClass: "text-purple-400",
    glow: "purple",
    mobileTopFade: "from-purple-500/30",
    ctaClass: "text-purple-400 hover:text-purple-300",
    active: true,
  };
}

export default function AdminApiServices() {
  return (
    <AdminCatalogPage
      title="API Services"
      entityPlural={entityPlural}
      entitySingular={entitySingular}
      fetchAllItems={api.getApiServicesAll}
      fetchPublicFallback={api.getApiServices}
      createItem={api.createApiService}
      updateItem={api.updateApiService}
      deleteItem={api.deleteApiService}
      formFields={formFields}
      columns={columns}
      getEmptyForm={getEmptyForm}
    />
  );
}
