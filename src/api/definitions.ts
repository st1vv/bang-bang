export const COLLECTION_SLUG = "banger-bots";
export const CHAIN_ETHEREUM = "ethereum";

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