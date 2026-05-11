/**
 * Thin fetch wrapper for the Orange backend.
 *
 * Reads VITE_API_URL from .env (default: http://localhost:5000/api).
 * Throws on non-2xx so callers can just `try/catch` and pull `error.message`.
 */
const BASE_URL =
  import.meta.env.VITE_API_URL?.replace(/\/+$/, "") ||
  "http://localhost:5000/api";

export async function apiFetch(path, options = {}) {
  const url = `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
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
  getGames: () => apiFetch("/games"),
};
