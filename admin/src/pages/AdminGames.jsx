import AdminCatalogPage from "../components/AdminCatalogPage.jsx";
import { api } from "../lib/api.js";

const entityPlural = "games";
const entitySingular = "game";

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
    render: (v) =>
      !v ? "—" : String(v).length > 40 ? `${String(v).slice(0, 40)}…` : String(v),
  },
  { key: "order", label: "Order" },
  { key: "active", label: "Active", render: (v) => (v ? "Yes" : "No") },
];

const formFields = [
  { key: "title", label: "Title", type: "text" },
  { key: "description", label: "Description", type: "textarea", rows: 4, fullWidth: true },
  { key: "imageSrc", label: "Image URL", type: "text", fullWidth: true },
  { key: "imageAlt", label: "Image alt text", type: "text" },
  { key: "glowClasses", label: "Glow classes", type: "text", fullWidth: true },
  { key: "order", label: "Order", type: "number" },
  { key: "active", label: "Active", type: "checkbox" },
];

function getEmptyForm() {
  return {
    title: "",
    description: "",
    imageSrc: "",
    imageAlt: "",
    glowClasses: "from-emerald-500/35 via-amber-500/20",
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
