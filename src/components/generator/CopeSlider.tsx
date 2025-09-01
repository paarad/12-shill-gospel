"use client";

import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { usePumpStore } from "@/store/usePumpStore";

const copeLabels = [
  "😐 Plausible",
  "😏 Spicy", 
  "🤪 Degen",
  "🔥 Smoke & Mirrors",
  "💀 Full Lies"
];

const copeRanges = [0, 3, 6, 9, 11];

export function CopeSlider() {
  const { input, updateInput } = usePumpStore();
  
  const getCopeLabel = (value: number) => {
    for (let i = copeRanges.length - 1; i >= 0; i--) {
      if (value >= copeRanges[i]) {
        return copeLabels[i];
      }
    }
    return copeLabels[0];
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label>Cope Dial™</Label>
        <span className="text-sm font-medium">{getCopeLabel(input.intensity)}</span>
      </div>
      <Slider
        value={[input.intensity]}
        onValueChange={([value]) => updateInput({ intensity: Math.max(0, Math.min(11, Number(value))) as 0|1|2|3|4|5|6|7|8|9|10|11 })}
        max={11}
        min={0}
        step={1}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>0</span>
        <span>3</span>
        <span>6</span>
        <span>9</span>
        <span>11</span>
      </div>
    </div>
  );
}
