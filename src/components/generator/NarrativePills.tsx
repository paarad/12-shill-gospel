"use client";

import { Badge } from "@/components/ui/badge";
import { usePumpStore } from "@/store/usePumpStore";
import { Narrative } from "@/lib/types";

const narratives: Narrative[] = [
  "AI",
  "RWA", 
  "DePIN",
  "L2",
  "Next SOL",
  "Undervalued GEM"
];

export function NarrativePills() {
  const { input, updateInput } = usePumpStore();
  
  return (
    <div className="flex flex-wrap gap-2">
      {narratives.map((narrative) => (
        <Badge
          key={narrative}
          variant={input.narrative === narrative ? "default" : "outline"}
          className="cursor-pointer hover:bg-primary/10"
          onClick={() => updateInput({ narrative })}
        >
          {narrative}
        </Badge>
      ))}
    </div>
  );
}
