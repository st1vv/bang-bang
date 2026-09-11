import { GRID_SIZES } from "@/app/collage/use-collage-selection";

type GridSizePickerProps = {
  columns: number;
  isSizeAvailable: (size: number) => boolean;
  onChange: (size: number) => void;
};

export const GridSizePicker = ({
  columns,
  isSizeAvailable,
  onChange,
}: GridSizePickerProps) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {GRID_SIZES.map((size) => {
        const isAvailable = isSizeAvailable(size);

        return (
          <button
            key={size}
            type="button"
            disabled={!isAvailable}
            onClick={() => onChange(size)}
            title={
              isAvailable
                ? undefined
                : `Needs ${size * size} bots in the wallet`
            }
            className={`cursor-pointer rounded-full border px-3 py-1 text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${
              columns === size
                ? "border-gold bg-gold/20 text-gold"
                : "border-white/15 text-white/70 hover:border-white/40 hover:text-white"
            }`}
          >
            {size}×{size}
          </button>
        );
      })}
    </div>
  );
};
