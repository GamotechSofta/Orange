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
  { key: "order", label: "Order" },
  { key: "active", label: "Active", render: (v) => (v ? "Yes" : "No") },
];

const formFields = [
  { key: "title", label: "Title", type: "text" },
  { key: "description", label: "Description", type: "textarea", rows: 4, fullWidth: true },
  { key: "order", label: "Order", type: "number" },
  { key: "active", label: "Active", type: "checkbox" },
];

function getEmptyForm() {
  return {
    title: "",
    description: "",
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
