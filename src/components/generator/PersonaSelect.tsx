"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { usePumpStore } from "@/store/usePumpStore";
import { Persona } from "@/lib/types";

const personas: Persona[] = [
  "Insider Whale",
  "Quant Wizard", 
  "Zen Master",
  "Macro Prophet",
  "DeFi Farmer",
  "NFT Visionary"
];

export function PersonaSelect() {
  const { input, updateInput } = usePumpStore();
  
  return (
    <RadioGroup
      value={input.persona}
      onValueChange={(value) => updateInput({ persona: value as Persona })}
      className="grid grid-cols-2 gap-3"
    >
      {personas.map((persona) => (
        <div key={persona} className="flex items-center space-x-2">
          <RadioGroupItem value={persona} id={persona} />
          <Label htmlFor={persona} className="text-sm font-medium">
            {persona}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
