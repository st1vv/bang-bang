import { useMemo } from "react";
import type { Collection } from "@/api/definitions";
import { useGetCollectionNfts } from "@/api/nfts/get-collection";
import { useGetRarity } from "@/api/nfts/get-rarity";

export const useOwnedNfts = (collection: Collection, owner: string) => {
  const { data: rarityData, isLoading: isLoadingRarity } =
    useGetRarity(collection);
  const {
    data: ownedNfts,
    isLoading,
    isError,
  } = useGetCollectionNfts(collection, owner);

  const nfts = useMemo(() => {
    if (!owner) return [];

    const ownedIds = new Set((ownedNfts ?? []).map((nft) => nft.tokenId));
    return (rarityData?.nfts ?? []).filter((nft) => ownedIds.has(nft.tokenId));
  }, [owner, ownedNfts, rarityData]);

  return { nfts, isLoading: isLoading || isLoadingRarity, isError };
};
