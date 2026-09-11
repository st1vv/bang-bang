import { SORT_OPTIONS, type SortOption } from "@/lib/sort-nfts";

type SortFilterProps = {
  value: SortOption;
  onChange: (value: SortOption) => void;
};

export const SortFilter = ({ value, onChange }: SortFilterProps) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {SORT_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`rounded-full border px-3 py-1 text-xs transition-colors cursor-pointer ${
            value === option.value
              ? "border-gold bg-gold/20 text-gold"
              : "border-white/15 text-white/70 hover:border-white/40 hover:text-white"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
