export const COLLECTION_SLUG = "banger-bots";
export const CHAIN_ETHEREUM = "ethereum";
export const CONTRACT_ADDRESS = "0x50bffe9e65281a9ca84b114222f5788b658c825f";
export const COLLECTION_PAGE_SIZE = 50;
export const COLLECTION_URL = `https://opensea.io/collection/${COLLECTION_SLUG}`;

export type Nft = {
  tokenId: string;
  name: string;
  image: string;
};

export type OpenSeaNft = {
  identifier: string;
  name: string | null;
  image_url: string | null;
};

export type OpenSeaNftsResponse = {
  nfts: OpenSeaNft[];
  next: string | null;
};

export type TraitCounts = Record<string, Record<string, number>>;

export type RarityNft = Nft & {
  rank: number;
  traits: Record<string, string>;
};

export type RarityData = {
  total: number;
  traitCounts: TraitCounts;
  nfts: RarityNft[];
};
