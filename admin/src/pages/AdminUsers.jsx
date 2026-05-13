import AdminResourcePage from "../components/AdminResourcePage.jsx";
import { api } from "../lib/api.js";

const columns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  {
    key: "createdAt",
    label: "Created",
    render: (value) => (value ? new Date(value).toLocaleDateString() : "—"),
  },
];

async function fetchUsersOnly() {
  const res = await api.getUsers({ limit: 100 });
  const list = Array.isArray(res?.data) ? res.data : [];
  return {
    ...res,
    data: list.filter((u) => u.role === "user"),
  };
}

export default function AdminUsers() {
  return (
    <AdminResourcePage
      title="Users"
      subtitle=""
      fetchItems={fetchUsersOnly}
      columns={columns}
      hideEdit
      deleteItem={api.deleteUser}
      tableVariant="catalog"
      emptyMessage="No users with role “user” yet."
    />
  );
}
