import { openseaFetch } from "@/lib/opensea-client";
import {
  CHAIN_ETHEREUM,
  COLLECTION_SLUG,
  type Nft,
  type NftsPage,
  type OpenSeaNft,
  type OpenSeaNftsResponse,
  type RarityData,
} from "@/api/definitions";

const toNft = (nft: OpenSeaNft): Nft => ({
  tokenId: nft.identifier,
  name: nft.name || `#${nft.identifier}`,
  image: nft.image_url ?? "",
});

export const fetchCollectionNfts = async (owner: string): Promise<Nft[]> => {
  const nfts: OpenSeaNft[] = [];
  let cursor: string | undefined;

  do {
    const data = await openseaFetch<OpenSeaNftsResponse>({
      path: `/chain/${CHAIN_ETHEREUM}/account/${owner}/nfts`,
      params: {
        collection: COLLECTION_SLUG,
        limit: "200",
        ...(cursor ? { next: cursor } : {}),
      },
    });
    nfts.push(...data.nfts);
    cursor = data.next ?? undefined;
  } while (cursor);

  return nfts.map(toNft);
};

export const fetchAllNfts = async (
  limit: number,
  cursor?: string,
): Promise<NftsPage> => {
  const data = await openseaFetch<OpenSeaNftsResponse>({
    path: `/collection/${COLLECTION_SLUG}/nfts`,
    params: {
      limit: String(limit),
      ...(cursor ? { next: cursor } : {}),
    },
  });

  return { nfts: data.nfts.map(toNft), next: data.next };
};

export const fetchRarity = async (): Promise<RarityData> => {
  const response = await fetch("/rarity.json");
  if (!response.ok) {
    throw new Error("Failed to load rarity data");
  }

  return response.json() as Promise<RarityData>;
};
