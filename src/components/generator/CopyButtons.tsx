"use client";

import { Button } from "@/components/ui/button";
import { usePumpStore } from "@/store/usePumpStore";
import { useState } from "react";

export function CopyButtons() {
  const { thread, input } = usePumpStore();
  const [copied, setCopied] = useState<string | null>(null);
  
  if (!thread) return null;
  
  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };
  
  const getCopyText = () => {
    if (input.mode === "tweet") {
      return thread.tweets[0];
    } else {
      return thread.tweets.join("\n\n");
    }
  };
  
  const getNumberedText = () => {
    if (input.mode === "tweet") {
      return thread.tweets[0];
    } else {
      return thread.tweets.join("\n\n");
    }
  };
  
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        onClick={() => copyToClipboard(getCopyText(), "copy")}
        className="flex-1"
      >
        {copied === "copy" ? "Copied!" : "Copy"}
      </Button>
      {input.mode === "thread" && (
        <Button
          variant="outline"
          onClick={() => copyToClipboard(getNumberedText(), "numbered")}
          className="flex-1"
        >
          {copied === "numbered" ? "Copied!" : "Copy Numbered"}
        </Button>
      )}
    </div>
  );
}
