/**
 * Thin fetch wrapper for the Orange backend.
 *
 * Reads VITE_API_URL from .env (default: http://localhost:5000/api).
 * Throws on non-2xx so callers can just `try/catch` and pull `error.message`.
 */
const BASE_URL =
  import.meta.env.VITE_ADMIN_API_URL?.replace(/\/+$/, "") ||
  import.meta.env.VITE_API_URL?.replace(/\/+$/, "") ||
  "http://localhost:5000/api";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function apiFetch(path, options = {}) {
  const { withAuth = false, ...rest } = options;
  const url = `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

  const res = await fetch(url, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(withAuth ? getAuthHeaders() : {}),
      ...(rest.headers || {}),
    },
  });

  let json = null;
  try {
    json = await res.json();
  } catch {
    /* not JSON */
  }

  if (!res.ok) {
    const message = json?.message || `Request failed (${res.status})`;
    throw new Error(message);
  }
  return json;
}

export const api = {
  getPlatforms: () => apiFetch("/platforms"),
  getApiServices: () => apiFetch("/api-services"),
  getApiServiceById: (id) => apiFetch(`/api-services/${id}`),
  getGames: () => apiFetch("/games"),
  getUsers: (query = {}) => {
    const qs = new URLSearchParams(query).toString();
    return apiFetch(`/users${qs ? `?${qs}` : ""}`);
  },
  updateApiService: (id, payload) =>
    apiFetch(`/api-services/${id}`, {
      method: "PUT",
      withAuth: true,
      body: JSON.stringify(payload),
    }),
  deleteApiService: (id) => apiFetch(`/api-services/${id}`, { method: "DELETE", withAuth: true }),
  updateGame: (id, payload) =>
    apiFetch(`/games/${id}`, {
      method: "PUT",
      withAuth: true,
      body: JSON.stringify(payload),
    }),
  deleteGame: (id) => apiFetch(`/games/${id}`, { method: "DELETE", withAuth: true }),
  updatePlatform: (id, payload) =>
    apiFetch(`/platforms/${id}`, {
      method: "PUT",
      withAuth: true,
      body: JSON.stringify(payload),
    }),
  deletePlatform: (id) => apiFetch(`/platforms/${id}`, { method: "DELETE", withAuth: true }),
  updateUser: (id, payload) =>
    apiFetch(`/users/${id}`, {
      method: "PUT",
      withAuth: true,
      body: JSON.stringify(payload),
    }),
  deleteUser: (id) => apiFetch(`/users/${id}`, { method: "DELETE", withAuth: true }),
  /**
   * Persist lead alongside Web3Forms (public; no auth).
   * @param {{ fullName: string, email: string, phone?: string, message: string, category: "contact"|"services"|"game" }} payload
   */
  saveLeadMessage: (payload) =>
    apiFetch("/messages", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};
