"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { usePumpStore } from "@/store/usePumpStore";

const redFlags = [
  { key: "fake_partnerships", label: "Fake Partnerships" },
  { key: "chart_zoom", label: "Chart Zoom" },
  { key: "audited_pending", label: "Audited Pending" },
  { key: "team_doxxed", label: "Team Doxxed" }
] as const;

export function FlagToggles() {
  const { input, updateInput } = usePumpStore();
  
  const handleFlagChange = (
    flag: "fake_partnerships"|"chart_zoom"|"audited_pending"|"team_doxxed",
    checked: boolean
  ) => {
    const currentFlags = input.redFlags;
    if (checked) {
      if (!currentFlags.includes(flag)) {
        updateInput({ redFlags: [...currentFlags, flag] });
      }
    } else {
      updateInput({ redFlags: currentFlags.filter(f => f !== flag) });
    }
  };
  
  return (
    <div className="space-y-3">
      <Label>Red Flags (Satire Only)</Label>
      <div className="grid grid-cols-2 gap-3">
        {redFlags.map(({ key, label }) => (
          <div key={key} className="flex items-center space-x-2">
            <Checkbox
              id={key}
              checked={input.redFlags.includes(key)}
              onCheckedChange={(checked) => handleFlagChange(key, !!checked)}
            />
            <Label htmlFor={key} className="text-sm">
              {label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
