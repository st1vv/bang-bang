import type { Nft } from "@/api/definitions";
import type { NftRarity } from "@/lib/use-rarity";

type NftCardProps = {
  nft: Nft;
  rarity?: NftRarity;
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

export const NftCard = ({ nft, rarity }: NftCardProps) => {
  return (
    <div className="overflow-hidden rounded-xl border border-white/15 bg-white/5">
      <img
        src={nft.image}
        alt={nft.name}
        loading="lazy"
        className="aspect-square w-full object-cover"
      />
      <div className="flex items-center justify-between gap-2 px-2 py-2">
        <p className="truncate font-mono text-xs text-white/80">{nft.name}</p>
        {rarity && (
          <span
            title={`Top ${(rarity.percentile * 100).toFixed(1)}%`}
            className={`shrink-0 rounded-md px-1.5 py-0.5 font-mono text-xs ${rarityClasses(rarity.percentile)}`}
          >
            #{rarity.rank}
          </span>
        )}
      </div>
    </div>
  );
};
