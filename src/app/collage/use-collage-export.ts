import { useCallback, useState } from "react";
import type { RarityNft } from "@/api/definitions";
import { renderCollage } from "@/lib/render-collage";

export const useCollageExport = (nfts: RarityNft[], columns: number) => {
  const [status, setStatus] = useState("");
  const [isExporting, setIsExporting] = useState(false);

  const download = useCallback(async () => {
    setIsExporting(true);
    setStatus("");
    try {
      const blob = await renderCollage(nfts, columns);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `banger-bots-collage-${columns}x${columns}.png`;
      link.click();
      URL.revokeObjectURL(url);
      setStatus("Saved");
    } catch {
      setStatus("Couldn't build the collage. Try again.");
    } finally {
      setIsExporting(false);
    }
  }, [nfts, columns]);

  const copy = useCallback(async () => {
    setIsExporting(true);
    setStatus("");
    try {
      // Passing the promise keeps the clipboard write inside the user gesture,
      // which Safari requires.
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": renderCollage(nfts, columns) }),
      ]);
      setStatus("Copied to clipboard");
    } catch {
      setStatus("Copying isn't supported here — use Save instead.");
    } finally {
      setIsExporting(false);
    }
  }, [nfts, columns]);

  const resetStatus = useCallback(() => setStatus(""), []);

  return { status, isExporting, download, copy, resetStatus };
};
