import AdminCatalogPage from "../components/AdminCatalogPage.jsx";
import { api } from "../lib/api.js";

const entityPlural = "API services";
const entitySingular = "API service";

const columns = [
  { key: "title", label: "Title" },
  {
    key: "description",
    label: "Description",
    render: (v) =>
      !v ? "—" : v.length > 56 ? `${String(v).slice(0, 56)}…` : String(v),
  },
  { key: "iconName", label: "Icon" },
  { key: "order", label: "Order" },
  { key: "active", label: "Active", render: (v) => (v ? "Yes" : "No") },
];

const formFields = [
  { key: "title", label: "Title", type: "text" },
  { key: "description", label: "Description", type: "textarea", rows: 4, fullWidth: true },
  { key: "iconName", label: "Icon name", type: "text" },
  { key: "iconColorClass", label: "Icon color class", type: "text" },
  { key: "glow", label: "Glow", type: "text" },
  { key: "mobileTopFade", label: "Mobile top fade", type: "text" },
  { key: "ctaClass", label: "CTA class", type: "text", fullWidth: true },
  { key: "order", label: "Order", type: "number" },
  { key: "active", label: "Active", type: "checkbox" },
];

function getEmptyForm() {
  return {
    title: "",
    description: "",
    iconName: "Dices",
    iconColorClass: "text-purple-400",
    glow: "purple",
    mobileTopFade: "from-purple-500/30",
    ctaClass: "text-purple-400 hover:text-purple-300",
    order: 0,
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
