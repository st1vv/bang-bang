import { useQuery } from "@tanstack/react-query";
import { fetchCollectionNfts } from "@/api/fetchers";

export const useGetCollectionNfts = (owner: string) => {
  return useQuery({
    queryKey: ["collection-nfts", owner],
    queryFn: () => fetchCollectionNfts(owner),
    enabled: Boolean(owner),
    retry: false,
  });
};
