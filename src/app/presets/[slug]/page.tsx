"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { usePumpStore } from "@/store/usePumpStore";

export default function PresetPage() {
  const params = useSearchParams();
  const { updateInput } = usePumpStore();

  useEffect(() => {
    const seed = params.get("seed") ?? undefined;
    const modeParam = params.get("mode");
    const personaParam = params.get("persona");
    const narrativeParam = params.get("narrative");
    const tickerParam = params.get("ticker");
    const intensityParam = params.get("intensity");
    const lengthParam = params.get("length");

    const mode = modeParam === "tweet" || modeParam === "thread" ? modeParam : "thread";
    const persona = (personaParam === "Insider Whale" || personaParam === "Quant Wizard" || personaParam === "Zen Master" || personaParam === "Macro Prophet" || personaParam === "DeFi Farmer" || personaParam === "NFT Visionary") ? personaParam : "Insider Whale";
    const narrative = (narrativeParam === "AI" || narrativeParam === "RWA" || narrativeParam === "DePIN" || narrativeParam === "L2" || narrativeParam === "Next SOL" || narrativeParam === "Undervalued GEM") ? narrativeParam : "AI";
    const ticker = tickerParam ?? "$COPE";
    const intensity = intensityParam ? Math.max(0, Math.min(11, Number(intensityParam))) : 5;
    const parsedLen = lengthParam ? Number(lengthParam) : 8;
    const length = parsedLen === 5 || parsedLen === 8 || parsedLen === 12 ? parsedLen : 8;

    updateInput({
      seed,
      mode,
      persona,
      narrative,
      ticker,
      intensity: intensity as 0|1|2|3|4|5|6|7|8|9|10|11,
      length,
    });
  }, [params, updateInput]);

  return (
    <main className="container mx-auto p-6">
      <p className="text-sm text-muted-foreground">
        Preset loaded. Go back to home to generate.
      </p>
    </main>
  );
}
