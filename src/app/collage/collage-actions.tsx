type CollageActionsProps = {
  selectedCount: number;
  capacity: number;
  status: string;
  isExporting: boolean;
  onDownload: () => void;
  onCopy: () => void;
  onRandom: () => void;
  onClear: () => void;
};

const secondaryButton =
  "cursor-pointer rounded-full border border-white/15 px-4 py-1.5 text-xs text-white/80 transition-colors disabled:opacity-40";

export const CollageActions = ({
  selectedCount,
  capacity,
  status,
  isExporting,
  onDownload,
  onCopy,
  onRandom,
  onClear,
}: CollageActionsProps) => {
  const isEmpty = selectedCount === 0;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={onDownload}
          disabled={isEmpty || isExporting}
          className="cursor-pointer rounded-full bg-gold px-4 py-1.5 text-xs font-bold text-ink transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          Save PNG
        </button>
        <button
          type="button"
          onClick={onCopy}
          disabled={isEmpty || isExporting}
          className={`${secondaryButton} hover:border-white/40 hover:text-white`}
        >
          Copy
        </button>
        <button
          type="button"
          onClick={onRandom}
          disabled={isExporting}
          className={`${secondaryButton} hover:border-cyan hover:text-cyan`}
        >
          Random
        </button>
        <button
          type="button"
          onClick={onClear}
          disabled={isEmpty || isExporting}
          className={`${secondaryButton} hover:border-pink hover:text-pink`}
        >
          Clear
        </button>
      </div>
      <p className="text-xs text-white/50">
        {status || `${selectedCount} / ${capacity} selected`}
      </p>
    </div>
  );
};
