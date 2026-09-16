import { openseaFetch } from "@/lib/opensea-client";
import type {
  Collection,
  Nft,
  OpenSeaNft,
  OpenSeaNftsResponse,
  RarityData,
} from "@/api/definitions";

const toNft = (nft: OpenSeaNft): Nft => ({
  tokenId: nft.identifier,
  name: nft.name || `#${nft.identifier}`,
  image: nft.image_url ?? "",
});

export const fetchCollectionNfts = async (
  collection: Collection,
  owner: string,
): Promise<Nft[]> => {
  const nfts: OpenSeaNft[] = [];
  let cursor: string | undefined;

  do {
    const data = await openseaFetch<OpenSeaNftsResponse>({
      path: `/chain/${collection.chain}/account/${owner}/nfts`,
      params: {
        collection: collection.slug,
        limit: "200",
        ...(cursor ? { next: cursor } : {}),
      },
    });
    nfts.push(...data.nfts);
    cursor = data.next ?? undefined;
  } while (cursor);

  return nfts.map(toNft);
};

export const fetchRarity = async (
  collection: Collection,
): Promise<RarityData> => {
  const response = await fetch(collection.rarityPath);
  if (!response.ok) {
    throw new Error("Failed to load rarity data");
  }

  return response.json() as Promise<RarityData>;
};
