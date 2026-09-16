import { useQuery } from "@tanstack/react-query";
import type { Collection } from "@/api/definitions";
import { fetchCollectionNfts } from "@/api/fetchers";

export const useGetCollectionNfts = (collection: Collection, owner: string) => {
  return useQuery({
    queryKey: ["collection-nfts", collection.key, owner],
    queryFn: () => fetchCollectionNfts(collection, owner),
    enabled: Boolean(owner),
    // Wallet holdings barely move, so a tab switch should not refetch them.
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};
