import {
  COLLAGE_SOURCES,
  COLLAGE_SOURCE_ORDER,
  type CollageSource,
} from "@/app/collage/collage-sources";

type SourcePickerProps = {
  source: CollageSource;
  onChange: (source: CollageSource) => void;
};

export const SourcePicker = ({ source, onChange }: SourcePickerProps) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {COLLAGE_SOURCE_ORDER.map((key) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          className={`cursor-pointer rounded-full border px-3 py-1 text-xs transition-colors ${
            source === key
              ? "border-cyan bg-cyan/20 text-cyan"
              : "border-white/15 text-white/70 hover:border-white/40 hover:text-white"
          }`}
        >
          {COLLAGE_SOURCES[key].label}
        </button>
      ))}
    </div>
  );
};
