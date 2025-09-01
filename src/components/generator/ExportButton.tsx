"use client";

import { Button } from "@/components/ui/button";
import { usePumpStore } from "@/store/usePumpStore";
import { useState } from "react";
import { toPng } from "html-to-image";

export function ExportButton() {
  const { thread, input, exportStatus, setExportStatus } = usePumpStore();
  const [isExporting, setIsExporting] = useState(false);
  
  if (!thread) return null;
  
  const handleExport = async () => {
    setIsExporting(true);
    setExportStatus("exporting");
    
    try {
      const element = document.getElementById("export-card");
      if (!element) throw new Error("Export element not found");
      
      const rect = element.getBoundingClientRect();
      const ratio = 3; // higher quality
      
      const dataUrl = await toPng(element, {
        pixelRatio: ratio,
        width: Math.ceil(rect.width),
        height: Math.ceil(rect.height),
        canvasWidth: Math.ceil(rect.width * ratio),
        canvasHeight: Math.ceil(rect.height * ratio),
        style: {
          margin: '0',
          padding: '0',
          background: '#ffffff'
        },
        cacheBust: true,
        backgroundColor: '#ffffff'
      });
      
      const link = document.createElement("a");
      link.download = `shillgospel-${input.ticker.toLowerCase()}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      
      setExportStatus("success");
    } catch (error) {
      console.error("Export failed:", error);
      setExportStatus("error");
    } finally {
      setIsExporting(false);
    }
  };
  
  return (
    <Button
      onClick={handleExport}
      disabled={isExporting}
      className="w-full"
    >
      {isExporting ? "Exporting..." : "Export PNG"}
    </Button>
  );
}
