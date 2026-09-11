import type { Nft } from "@/api/definitions";
import type { NftRarity } from "@/lib/use-rarity";

export type SortOption = "tokenId" | "rarest" | "common";

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "tokenId", label: "Token ID" },
  { value: "rarest", label: "Rarest first" },
  { value: "common", label: "Common first" },
];

export const sortNfts = (
  nfts: Nft[],
  sort: SortOption,
  rarity: Map<string, NftRarity>,
) => {
  const rankOf = (nft: Nft) => rarity.get(nft.tokenId)?.rank ?? Infinity;

  return [...nfts].sort((a, b) => {
    if (sort === "tokenId") return Number(a.tokenId) - Number(b.tokenId);
    if (sort === "rarest") return rankOf(a) - rankOf(b);
    return rankOf(b) - rankOf(a);
  });
};
