import type { RarityNft } from "@/api/definitions";
import { thumbnailUrl } from "@/lib/image-url";

type CollagePreviewProps = {
  nfts: RarityNft[];
  columns: number;
};

// Mirrors the exported PNG: no gaps, no rounding, empty cells in the same
// colour the canvas is filled with.
export const CollagePreview = ({ nfts, columns }: CollagePreviewProps) => {
  return (
    <div
      className="grid w-full overflow-hidden rounded-xl border border-white/15 bg-ink [contain:paint]"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: columns * columns }, (_, index) => {
        const nft = nfts[index];

        // Keyed by bot, not by position: removing one from the middle then
        // moves the existing images instead of rewriting every later cell's
        // src and decoding them all over again.
        return nft ? (
          <img
            key={`bot-${nft.tokenId}`}
            src={thumbnailUrl(nft.image, 250)}
            alt={nft.name}
            decoding="async"
            className="aspect-square w-full object-cover"
          />
        ) : (
          <div key={`empty-${index}`} className="aspect-square w-full bg-ink" />
        );
      })}
    </div>
  );
};
