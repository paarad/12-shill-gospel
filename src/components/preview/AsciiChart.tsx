"use client";

import { usePumpStore } from "@/store/usePumpStore";

export function AsciiChart() {
  const { input } = usePumpStore();
  
  // Only show at high cope levels
  if (input.intensity < 9) return null;
  
  const buildAsciiChart = () => {
    const width = 40;
    const height = 10;
    const points: number[] = [];

    let y = Math.floor(height / 2);
    for (let x = 0; x < width; x++) {
      const step = Math.random() < 0.5 ? -1 : 1;
      y = Math.max(0, Math.min(height - 1, y + step));
      points.push(y);
    }

    const lines: string[] = [];
    for (let row = height - 1; row >= 0; row--) {
      let line = "";
      for (let x = 0; x < width; x++) {
        line += points[x] === row ? "•" : " ";
      }
      lines.push(line);
    }
    return lines;
  };
  
  const chartLines: string[] = buildAsciiChart();
  
  return (
    <div className="p-4 border rounded-lg bg-muted">
      <div className="text-xs font-mono text-center mb-2">
        5m Chart - {input.ticker}
      </div>
      <pre className="font-mono text-xs leading-tight whitespace-pre">
        {chartLines.join('\n')}
      </pre>
      <div className="text-xs text-center mt-2 text-muted-foreground">
        Perfect stairway to Valhalla 🚀
      </div>
    </div>
  );
}
