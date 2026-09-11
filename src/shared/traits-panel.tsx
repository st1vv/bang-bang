import type { TraitCounts } from "@/api/definitions";
import type { TraitFilters } from "@/lib/filter-nfts";

type TraitsPanelProps = {
  traitCounts: TraitCounts;
  filters: TraitFilters;
  onToggle: (category: string, value: string) => void;
};

export const TraitsPanel = ({
  traitCounts,
  filters,
  onToggle,
}: TraitsPanelProps) => {
  return (
    <div className="mt-4 grid gap-5 rounded-xl border border-white/15 bg-ink/60 p-4 text-left backdrop-blur-sm sm:grid-cols-2 lg:grid-cols-3">
      {Object.entries(traitCounts).map(([category, values]) => (
        <div key={category}>
          <p className="font-display text-xs text-white">{category}</p>
          <div className="mt-2 max-h-44 space-y-1 overflow-y-auto pr-1">
            {Object.entries(values)
              .sort((a, b) => a[1] - b[1])
              .map(([value, count]) => (
                <label
                  key={value}
                  className="flex cursor-pointer items-center gap-2 text-xs text-white/70 transition-colors hover:text-white"
                >
                  <input
                    type="checkbox"
                    checked={filters[category]?.includes(value) ?? false}
                    onChange={() => onToggle(category, value)}
                    className="size-3.5 shrink-0 accent-gold"
                  />
                  <span className="truncate">{value}</span>
                  <span className="ml-auto shrink-0 font-mono text-[10px] text-white/40">
                    {count}
                  </span>
                </label>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};
