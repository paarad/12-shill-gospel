"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePumpStore } from "@/store/usePumpStore";

export function TickerInput() {
  const { input, updateInput } = usePumpStore();
  
  return (
    <div className="space-y-2">
      <Label htmlFor="ticker">Ticker</Label>
      <Input
        id="ticker"
        value={input.ticker}
        onChange={(e) => updateInput({ ticker: e.target.value })}
        placeholder="$COPE"
        className="font-mono"
      />
    </div>
  );
}
