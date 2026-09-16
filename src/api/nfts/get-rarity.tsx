import { useQuery } from "@tanstack/react-query";
import type { Collection } from "@/api/definitions";
import { fetchRarity } from "@/api/fetchers";

export const useGetRarity = (collection: Collection, enabled = true) => {
  return useQuery({
    queryKey: ["rarity", collection.key],
    queryFn: () => fetchRarity(collection),
    enabled,
    staleTime: Infinity,
    retry: false,
  });
};
