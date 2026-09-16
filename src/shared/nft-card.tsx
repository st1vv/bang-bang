import type { Collection, RarityNft } from "@/api/definitions";
import { thumbnailUrl } from "@/lib/image-url";

type NftCardProps = {
  nft: RarityNft;
  total: number;
  collection: Collection;
};

const RARITY_TIERS = [
  { maxPercentile: 0.01, classes: "text-gold bg-gold/20" },
  { maxPercentile: 0.05, classes: "text-pink bg-pink/20" },
  { maxPercentile: 0.1, classes: "text-cyan bg-cyan/20" },
  { maxPercentile: 0.25, classes: "text-emerald bg-emerald/20" },
];

const COMMON_TIER = "text-white/60 bg-white/10";

const rarityClasses = (percentile: number) =>
  RARITY_TIERS.find((tier) => percentile <= tier.maxPercentile)?.classes ??
  COMMON_TIER;

export const NftCard = ({ nft, total, collection }: NftCardProps) => {
  const percentile = nft.rank / total;

  return (
    <a
      href={`https://opensea.io/item/${collection.chain}/${collection.contract}/${nft.tokenId}`}
      target="_blank"
      rel="noopener noreferrer"
      title={`View ${nft.name} on OpenSea`}
      className="group block overflow-hidden rounded-xl border border-white/15 bg-white/5 transition-colors hover:border-cyan"
    >
      <div className="relative overflow-hidden">
        <img
          src={thumbnailUrl(nft.image, 250)}
          alt={nft.name}
          loading="lazy"
          decoding="async"
          className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute right-2 top-2 rounded-md bg-ink/80 px-1.5 py-0.5 font-mono text-[10px] text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
          OpenSea ↗
        </span>
      </div>
      <div className="flex items-center justify-between gap-2 px-2 py-2">
        <p className="truncate font-mono text-xs text-white/80">{nft.name}</p>
        <span
          title={`Top ${(percentile * 100).toFixed(1)}%`}
          className={`shrink-0 rounded-md px-1.5 py-0.5 font-mono text-xs ${rarityClasses(percentile)}`}
        >
          #{nft.rank}
        </span>
      </div>
    </a>
  );
};
