import { useState } from "react";
import type { TraitCounts } from "@/api/definitions";
import { SORT_OPTIONS, type SortOption } from "@/lib/sort-nfts";
import { countSelectedTraits, type TraitFilters } from "@/lib/filter-nfts";
import { TraitsPanel } from "@/shared/traits-panel";

type FiltersProps = {
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
  traitCounts: TraitCounts;
  traitFilters: TraitFilters;
  onTraitToggle: (category: string, value: string) => void;
  onClearTraits: () => void;
};

const pillClasses = (isActive: boolean) =>
  `rounded-full border px-3 py-1 text-xs transition-colors cursor-pointer ${
    isActive
      ? "border-gold bg-gold/20 text-gold"
      : "border-white/15 text-white/70 hover:border-white/40 hover:text-white"
  }`;

export const Filters = ({
  sort,
  onSortChange,
  traitCounts,
  traitFilters,
  onTraitToggle,
  onClearTraits,
}: FiltersProps) => {
  const [isTraitsOpen, setIsTraitsOpen] = useState(false);
  const selectedCount = countSelectedTraits(traitFilters);

  return (
    <div className="w-full max-w-4xl">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {SORT_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onSortChange(option.value)}
            className={pillClasses(sort === option.value)}
          >
            {option.label}
          </button>
        ))}

        <button
          type="button"
          onClick={() => setIsTraitsOpen((open) => !open)}
          className={pillClasses(isTraitsOpen || selectedCount > 0)}
        >
          Traits{selectedCount > 0 && ` (${selectedCount})`}
        </button>

        {selectedCount > 0 && (
          <button
            type="button"
            onClick={onClearTraits}
            className="text-xs text-white/50 transition-colors hover:text-white cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>

      {isTraitsOpen && (
        <TraitsPanel
          traitCounts={traitCounts}
          filters={traitFilters}
          onToggle={onTraitToggle}
        />
      )}
    </div>
  );
};
