import type { RarityNft } from "@/api/definitions";

export type SortOption = "tokenId" | "rarest" | "common";

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "tokenId", label: "Token ID" },
  { value: "rarest", label: "Rarest first" },
  { value: "common", label: "Common first" },
];

export const sortNfts = (nfts: RarityNft[], sort: SortOption) => {
  return [...nfts].sort((a, b) => {
    if (sort === "tokenId") return Number(a.tokenId) - Number(b.tokenId);
    if (sort === "rarest") return a.rank - b.rank;
    return b.rank - a.rank;
  });
};
