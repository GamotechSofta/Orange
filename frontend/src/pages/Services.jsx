import { useEffect } from "react";

export default function Services() {
  useEffect(() => {
    window.location.replace("/#platform-solutions");
  }, []);
  return (
    <div className="flex min-h-[40vh] items-center justify-center text-zinc-600">
      Opening services…
    </div>
  );
}
