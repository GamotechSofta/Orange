function resolveApiBase() {
  const a = import.meta.env.VITE_ADMIN_API_URL?.replace(/\/+$/, "").trim();
  const b = import.meta.env.VITE_API_URL?.replace(/\/+$/, "").trim();
  const url = a || b;
  if (!url) {
    throw new Error(
      "Set VITE_ADMIN_API_URL or VITE_API_URL in admin/.env (no default URL in code)."
    );
  }
  return url;
}

const BASE_URL = resolveApiBase();

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function apiFetch(path, options = {}) {
  const { withAuth = false, ...rest } = options;
  const url = `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

  const isFormData =
    typeof FormData !== "undefined" && rest.body instanceof FormData;

  const headers = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(withAuth ? getAuthHeaders() : {}),
    ...(rest.headers || {}),
  };

  const res = await fetch(url, {
    ...rest,
    headers,
  });

  let json = null;
  try {
    json = await res.json();
  } catch {
    // non-JSON response
  }

  if (!res.ok) {
    const message = json?.message || `Request failed (${res.status})`;
    const err = new Error(message);
    err.status = res.status;
    throw err;
  }

  return json;
}

export const api = {
  login: (email, password) =>
    apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  getMe: () => apiFetch("/auth/me", { withAuth: true }),
  updateMe: (payload) =>
    apiFetch("/auth/me", {
      method: "PUT",
      withAuth: true,
      body: JSON.stringify(payload),
    }),
  getPlatforms: () => apiFetch("/platforms"),
  getPlatformsAll: () => apiFetch("/platforms/all", { withAuth: true }),
  getApiServices: () => apiFetch("/api-services"),
  getApiServicesAll: () => apiFetch("/api-services/all", { withAuth: true }),
  getGames: () => apiFetch("/games"),
  getGamesAll: () => apiFetch("/games/all", { withAuth: true }),
  getUsers: (query = {}) => {
    const qs = new URLSearchParams(query).toString();
    return apiFetch(`/users${qs ? `?${qs}` : ""}`);
  },
  createApiService: (payload) =>
    apiFetch("/api-services", {
      method: "POST",
      withAuth: true,
      body: JSON.stringify(payload),
    }),
  updateApiService: (id, payload) =>
    apiFetch(`/api-services/${id}`, {
      method: "PUT",
      withAuth: true,
      body: JSON.stringify(payload),
    }),
  deleteApiService: (id) =>
    apiFetch(`/api-services/${id}`, { method: "DELETE", withAuth: true }),
  createGame: (payload) =>
    apiFetch("/games", {
      method: "POST",
      withAuth: true,
      body: JSON.stringify(payload),
    }),
  updateGame: (id, payload) =>
    apiFetch(`/games/${id}`, {
      method: "PUT",
      withAuth: true,
      body: JSON.stringify(payload),
    }),
  deleteGame: (id) => apiFetch(`/games/${id}`, { method: "DELETE", withAuth: true }),
  createPlatform: (payload) =>
    apiFetch("/platforms", {
      method: "POST",
      withAuth: true,
      body: JSON.stringify(payload),
    }),
  updatePlatform: (id, payload) =>
    apiFetch(`/platforms/${id}`, {
      method: "PUT",
      withAuth: true,
      body: JSON.stringify(payload),
    }),
  deletePlatform: (id) =>
    apiFetch(`/platforms/${id}`, { method: "DELETE", withAuth: true }),
  updateUser: (id, payload) =>
    apiFetch(`/users/${id}`, {
      method: "PUT",
      withAuth: true,
      body: JSON.stringify(payload),
    }),
  deleteUser: (id) => apiFetch(`/users/${id}`, { method: "DELETE", withAuth: true }),
  uploadImage: (file) => {
    const body = new FormData();
    body.append("image", file);
    return apiFetch("/upload/image", {
      method: "POST",
      withAuth: true,
      body,
    });
  },
};
