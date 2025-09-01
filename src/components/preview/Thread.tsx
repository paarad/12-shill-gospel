"use client";

import { usePumpStore } from "@/store/usePumpStore";
import { Tweet } from "./Tweet";

export function Thread() {
  const { thread, input } = usePumpStore();
  
  if (!thread) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        Click &quot;Spin Again&quot; to generate your {input.mode}
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {thread.tweets.map((tweet, index) => (
        <Tweet key={index} content={tweet} />
      ))}
      <div className="text-xs text-muted-foreground p-3 bg-muted rounded-lg">
        {thread.disclaimer}
      </div>
    </div>
  );
}
