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
      
      const dataUrl = await toPng(element, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: "#ffffff"
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
