"use client";

import { Button } from "@/components/ui/button";
import { usePumpStore } from "@/store/usePumpStore";
import { generateThread } from "@/lib/generator";
import { redact } from "@/lib/redactor";

export function SpinButton() {
  const { input, setIsGenerating, setThread, isGenerating } = usePumpStore();
  
  const handleGenerate = async () => {
    setIsGenerating(true);
    
    try {
      const thread = generateThread(input);
      const redactedThread = {
        ...thread,
        tweets: thread.tweets.map(tweet => redact(tweet)),
        disclaimer: redact(thread.disclaimer)
      };
      setThread(redactedThread);
    } catch (error) {
      console.error("Generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <Button 
      onClick={handleGenerate}
      className="w-full"
      disabled={isGenerating}
    >
      {isGenerating ? "Generating..." : "Spin Again"}
    </Button>
  );
}
