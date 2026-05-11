import { useEffect, useState } from "react";

/**
 * Tiny data-fetching hook for read-only homepage lists.
 * Returns { data, loading, error } and re-runs when `fetcher` reference changes.
 */
export default function useApiResource(fetcher, deps = []) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetcher()
      .then((res) => {
        if (cancelled) return;
        setData(Array.isArray(res?.data) ? res.data : []);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message || "Failed to load");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
}
