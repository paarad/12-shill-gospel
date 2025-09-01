"use client";

import { Button } from "@/components/ui/button";
import { usePumpStore } from "@/store/usePumpStore";

export function ModeToggle() {
  const { input, updateInput } = usePumpStore();
  
  return (
    <div className="flex gap-2">
      <Button
        variant={input.mode === "tweet" ? "default" : "outline"}
        onClick={() => updateInput({ mode: "tweet" })}
        className="flex-1"
      >
        Tweet
      </Button>
      <Button
        variant={input.mode === "thread" ? "default" : "outline"}
        onClick={() => updateInput({ mode: "thread" })}
        className="flex-1"
      >
        Thread
      </Button>
    </div>
  );
}
