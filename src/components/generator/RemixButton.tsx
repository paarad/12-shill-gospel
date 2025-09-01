"use client";

import { Button } from "@/components/ui/button";
import { usePumpStore } from "@/store/usePumpStore";

export function RemixButton() {
  const { input, thread, setThread, isRemixing, setIsRemixing, remixError, setRemixError } = usePumpStore();

  const handleRemix = async () => {
    if (!thread) return;
    setRemixError(null);
    setIsRemixing(true);
    try {
      const res = await fetch("/api/remix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input, thread })
      });
      if (!res.ok) {
        const detail = await res.text();
        throw new Error(detail || "Remix failed");
      }
      const data = await res.json();
      setThread(data);
    } catch (e: any) {
      setRemixError(e?.message || "Remix failed");
      console.error("Remix failed", e);
    } finally {
      setIsRemixing(false);
    }
  };

  return (
    <div className="flex flex-col items-stretch gap-2">
      <Button onClick={handleRemix} disabled={!thread || isRemixing} className="w-full" variant="secondary">
        {isRemixing ? "Remixing..." : "AI Remix"}
      </Button>
      {remixError ? (
        <div className="text-xs text-red-500 text-center">{remixError}</div>
      ) : null}
    </div>
  );
} 