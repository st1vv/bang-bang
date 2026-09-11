import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchAllNfts } from "@/api/fetchers";
import { COLLECTION_PAGE_SIZE } from "@/api/definitions";

export const useGetAllNfts = (enabled: boolean) => {
  return useInfiniteQuery({
    queryKey: ["all-nfts"],
    queryFn: ({ pageParam }) => fetchAllNfts(COLLECTION_PAGE_SIZE, pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.next ?? undefined,
    enabled,
    retry: false,
  });
};
