import { memo } from "react";
import type { CollectionNft } from "@/api/definitions";
import { thumbnailUrl } from "@/lib/image-url";

type PickerTileProps = {
  nft: CollectionNft;
  order: number;
  onToggle: (uid: string) => void;
};

// Memoised so picking one re-renders that tile instead of the whole wallet.
export const PickerTile = memo(({ nft, order, onToggle }: PickerTileProps) => {
  const isSelected = order !== -1;

  return (
    <button
      type="button"
      onClick={() => onToggle(nft.uid)}
      title={nft.name}
      className={`relative cursor-pointer overflow-hidden rounded-lg border transition-colors ${
        isSelected ? "border-gold" : "border-white/15 hover:border-white/40"
      }`}
    >
      <img
        src={thumbnailUrl(nft.image, 250)}
        alt={nft.name}
        loading="lazy"
        decoding="async"
        className="aspect-square w-full object-cover"
      />
      {isSelected && (
        <span className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-gold font-mono text-[10px] font-bold text-ink">
          {order + 1}
        </span>
      )}
    </button>
  );
});

PickerTile.displayName = "PickerTile";
