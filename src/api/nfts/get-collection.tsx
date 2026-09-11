import { useQuery } from "@tanstack/react-query";
import { fetchCollectionNfts } from "@/api/fetchers";

export const useGetCollectionNfts = (owner: string) => {
  return useQuery({
    queryKey: ["collection-nfts", owner],
    queryFn: () => fetchCollectionNfts(owner),
    enabled: Boolean(owner),
    // Wallet holdings barely move, so a tab switch should not refetch them.
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};
