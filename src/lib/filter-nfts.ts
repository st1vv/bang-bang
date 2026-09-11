import type { RarityNft } from "@/api/definitions";

export type TraitFilters = Record<string, string[]>;

export const filterNfts = (nfts: RarityNft[], filters: TraitFilters) => {
  const active = Object.entries(filters).filter(
    ([, values]) => values.length > 0,
  );
  if (active.length === 0) return nfts;

  return active.reduce(
    (result, [category, values]) =>
      result.filter((nft) => values.includes(nft.traits[category])),
    nfts,
  );
};

export const countSelectedTraits = (filters: TraitFilters) =>
  Object.values(filters).reduce((sum, values) => sum + values.length, 0);

export const toggleTrait = (
  filters: TraitFilters,
  category: string,
  value: string,
): TraitFilters => {
  const values = filters[category] ?? [];

  return {
    ...filters,
    [category]: values.includes(value)
      ? values.filter((item) => item !== value)
      : [...values, value],
  };
};
