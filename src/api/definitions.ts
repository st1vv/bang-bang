export const COLLECTION_SLUG = "banger-bots";
export const CHAIN_ETHEREUM = "ethereum";
export const COLLECTION_PAGE_SIZE = 50;

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

export type RarityNft = Nft & {
  rank: number;
};

export type RarityData = {
  total: number;
  nfts: RarityNft[];
};
