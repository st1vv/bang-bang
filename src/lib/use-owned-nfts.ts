import { useMemo } from "react";
import type { Collection, CollectionNft } from "@/api/definitions";
import { useGetCollectionNfts } from "@/api/nfts/get-collection";
import { useGetRarity } from "@/api/nfts/get-rarity";

export const useOwnedNfts = (
  collection: Collection,
  owner: string,
  enabled = true,
) => {
  const { data: rarityData, isLoading: isLoadingRarity } = useGetRarity(
    collection,
    enabled,
  );
  const {
    data: ownedNfts,
    isLoading,
    isError,
  } = useGetCollectionNfts(collection, owner, enabled);

  const nfts = useMemo<CollectionNft[]>(() => {
    if (!owner || !enabled) return [];

    const ownedIds = new Set((ownedNfts ?? []).map((nft) => nft.tokenId));
    return (rarityData?.nfts ?? [])
      .filter((nft) => ownedIds.has(nft.tokenId))
      .map((nft) => ({
        ...nft,
        collectionKey: collection.key,
        uid: `${collection.key}-${nft.tokenId}`,
      }));
  }, [collection.key, enabled, owner, ownedNfts, rarityData]);

  return { nfts, isLoading: isLoading || isLoadingRarity, isError };
};
