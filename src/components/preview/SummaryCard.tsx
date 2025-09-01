"use client";

import { usePumpStore } from "@/store/usePumpStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function SummaryCard() {
  const { thread, input } = usePumpStore();
  
  if (!thread) return null;
  
  return (
    <Card id="export-card" className="relative w-full max-w-md mx-auto overflow-hidden">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="rotate-[-20deg] text-4xl font-extrabold opacity-10 select-none">
          SATIRE / PARODY / NFA
        </div>
      </div>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">
            {thread.cardMeta.title}
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            {input.persona}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          {thread.cardMeta.bullets.map((bullet, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span className="text-sm">{bullet}</span>
            </div>
          ))}
        </div>
        <div className="pt-3 border-t">
          <div className="text-xs text-muted-foreground text-center">
            SATIRE / PARODY / NFA
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
