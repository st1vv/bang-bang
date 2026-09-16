export const COLLECTION_PAGE_SIZE = 50;

export type Collection = {
  // Stable id used in query keys and routes.
  key: string;
  // OpenSea collection slug — not always the pretty name.
  slug: string;
  chain: string;
  contract: string;
  name: string;
  // Shorter form used inside a sentence, e.g. "View Your Bots".
  shortName: string;
  // What a single item is called, e.g. "bots" in "No bots match these traits".
  itemsLabel: string;
  // Pre-built rarity file under public/, see scripts/build-rarity.mjs.
  rarityPath: string;
  url: string;
};

const withUrl = (collection: Omit<Collection, "url">): Collection => ({
  ...collection,
  url: `https://opensea.io/collection/${collection.slug}`,
});

export const BANGER_BOTS = withUrl({
  key: "banger-bots",
  slug: "banger-bots",
  chain: "ethereum",
  contract: "0x50bffe9e65281a9ca84b114222f5788b658c825f",
  name: "Banger Bots",
  shortName: "Bots",
  itemsLabel: "bots",
  rarityPath: "/rarity.json",
});

export const LIL_BANGERS = withUrl({
  key: "lil-bangers",
  slug: "lil-bangers-",
  chain: "base",
  contract: "0x1260f90e0b1c482b38b88f26dee17c57615d670b",
  name: "Lil' Bangers",
  shortName: "Lil' Bangers",
  itemsLabel: "lil bangers",
  rarityPath: "/rarity-lil.json",
});

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

// Token ids restart at 1 in every collection, so anything mixing them needs
// the composite uid as its key.
export type CollectionNft = RarityNft & {
  collectionKey: string;
  uid: string;
};

export type RarityData = {
  total: number;
  traitCounts: TraitCounts;
  nfts: RarityNft[];
};
