import { useQuery } from "@tanstack/react-query";
import { fetchRarity } from "@/api/fetchers";

export const useGetRarity = () => {
  return useQuery({
    queryKey: ["rarity"],
    queryFn: fetchRarity,
    staleTime: Infinity,
    retry: false,
  });
};
