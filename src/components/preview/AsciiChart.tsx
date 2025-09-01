"use client";

import { usePumpStore } from "@/store/usePumpStore";

export function AsciiChart() {
  const { input } = usePumpStore();
  
  // Only show at high cope levels
  if (input.intensity < 9) return null;
  
  const generateRandomChart = () => {
    const lines = [];
    const width = 20;
    const height = 8;
    
    // Generate random chart data
    for (let i = 0; i < height; i++) {
      let line = "";
      for (let j = 0; j < width; j++) {
        const rand = Math.random();
        if (rand > 0.7) {
          line += "█";
        } else if (rand > 0.4) {
          line += "▓";
        } else if (rand > 0.2) {
          line += "▒";
        } else {
          line += "░";
        }
      }
      lines.push(line);
    }
    
    return lines;
  };
  
  const chartLines = generateRandomChart();
  
  return (
    <div className="p-4 border rounded-lg bg-muted">
      <div className="text-xs font-mono text-center mb-2">
        5m Chart - {input.ticker}
      </div>
      <div className="font-mono text-xs leading-tight">
        {chartLines.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
      <div className="text-xs text-center mt-2 text-muted-foreground">
        Perfect stairway to Valhalla 🚀
      </div>
    </div>
  );
}
