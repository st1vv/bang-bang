import { useMemo } from "react";
import { useGetRarity } from "@/api/nfts/get-rarity";

export type NftRarity = {
  rank: number;
  percentile: number;
};

export const useRarity = () => {
  const { data } = useGetRarity();

  return useMemo(() => {
    if (!data) return new Map<string, NftRarity>();

    return new Map(
      data.nfts.map((nft) => [
        nft.tokenId,
        { rank: nft.rank, percentile: nft.rank / data.total },
      ]),
    );
  }, [data]);
};
