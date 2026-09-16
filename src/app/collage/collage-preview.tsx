import type { CollectionNft } from "@/api/definitions";
import { thumbnailUrl } from "@/lib/image-url";
import { EDGE_CROP_RATIO } from "@/lib/render-collage";

type CollagePreviewProps = {
  nfts: CollectionNft[];
  columns: number;
};

// Scaling up by the cropped fraction reproduces the export's inset crop: the
// overflowing sliver is clipped by the cell.
const CROP_SCALE = 1 / (1 - 2 * EDGE_CROP_RATIO);

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

        // Keyed by token, not by position: removing one from the middle then
        // moves the existing images instead of rewriting every later cell's
        // src and decoding them all over again.
        return nft ? (
          <div
            key={`nft-${nft.uid}`}
            className="aspect-square w-full overflow-hidden"
          >
            <img
              src={thumbnailUrl(nft.image, 250)}
              alt={nft.name}
              decoding="async"
              style={{ transform: `scale(${CROP_SCALE})` }}
              className="size-full object-cover"
            />
          </div>
        ) : (
          <div key={`empty-${index}`} className="aspect-square w-full bg-ink" />
        );
      })}
    </div>
  );
};
