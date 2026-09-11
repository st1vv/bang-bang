import { useMemo } from "react";
import { useGetCollectionNfts } from "@/api/nfts/get-collection";
import { useGetRarity } from "@/api/nfts/get-rarity";

export const useOwnedNfts = (owner: string) => {
  const { data: rarityData, isLoading: isLoadingRarity } = useGetRarity();
  const { data: ownedNfts, isLoading, isError } = useGetCollectionNfts(owner);

  const nfts = useMemo(() => {
    if (!owner) return [];

    const ownedIds = new Set((ownedNfts ?? []).map((nft) => nft.tokenId));
    return (rarityData?.nfts ?? []).filter((nft) => ownedIds.has(nft.tokenId));
  }, [owner, ownedNfts, rarityData]);

  return { nfts, isLoading: isLoading || isLoadingRarity, isError };
};
