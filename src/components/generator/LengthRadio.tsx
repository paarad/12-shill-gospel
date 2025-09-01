"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { usePumpStore } from "@/store/usePumpStore";

const lengths = [5, 8, 12] as const;

export function LengthRadio() {
  const { input, updateInput } = usePumpStore();
  
  // Only show in thread mode
  if (input.mode !== "thread") return null;
  
  return (
    <div className="space-y-3">
      <Label>Thread Length</Label>
      <RadioGroup
        value={input.length.toString()}
        onValueChange={(value) => updateInput({ length: parseInt(value) as 5 | 8 | 12 })}
        className="flex gap-4"
      >
        {lengths.map((length) => (
          <div key={length} className="flex items-center space-x-2">
            <RadioGroupItem value={length.toString()} id={`length-${length}`} />
            <Label htmlFor={`length-${length}`} className="text-sm">
              {length} tweets
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
