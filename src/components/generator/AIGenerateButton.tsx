"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { usePumpStore } from "@/store/usePumpStore";

export function AIGenerateButton() {
  const { input, setThread, isGenerating, setIsGenerating } = usePumpStore();
  const [error, setError] = useState<string | null>(null);

  const handleGenerateAI = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/generate/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input)
      });
      if (!res.ok) {
        const detail = await res.text();
        throw new Error(detail || "AI generation failed");
      }
      const data = await res.json();
      setThread(data);
      setError(null);
    } catch (e: any) {
      setError(e?.message || "AI generation failed");
      console.error("AI generation failed", e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Button onClick={handleGenerateAI} className="w-full" disabled={isGenerating}>
        {isGenerating ? "Generating with AI..." : "Generate with AI"}
      </Button>
      {error ? <div className="text-xs text-red-500 text-center">{error}</div> : null}
    </div>
  );
} 