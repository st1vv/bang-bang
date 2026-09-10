import { openseaFetch } from "@/lib/opensea-client";
import {
  CHAIN_ETHEREUM,
  COLLECTION_SLUG,
  type Nft,
  type OpenSeaNft,
  type OpenSeaNftsResponse,
} from "@/api/definitions";

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

  return nfts.map((nft) => ({
    tokenId: nft.identifier,
    name: nft.name || `#${nft.identifier}`,
    image: nft.image_url ?? "",
  }));
};
