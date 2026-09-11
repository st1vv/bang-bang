import { useState } from "react";
import { useGetCollectionNfts } from "@/api/nfts/get-collection";
import { useGetAllNfts } from "@/api/nfts/get-all";
import { Spinner } from "@/shared/spinner";
import { NftCard } from "@/shared/nft-card";
import { useInView } from "@/lib/use-in-view";
import { useRarity } from "@/lib/use-rarity";

export const HomePage = () => {
  const [address, setAddress] = useState("");
  const [submittedAddress, setSubmittedAddress] = useState("");
  const isOwnerView = Boolean(submittedAddress);
  const rarity = useRarity();

  const {
    data: ownedNfts = [],
    isFetching: isFetchingOwned,
    isError,
  } = useGetCollectionNfts(submittedAddress);

  const {
    data: collection,
    isFetching: isFetchingCollection,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetAllNfts(!isOwnerView);

  const collectionNfts = collection?.pages.flatMap((page) => page.nfts) ?? [];
  const nfts = isOwnerView ? ownedNfts : collectionNfts;

  const isInitialLoading = isOwnerView
    ? isFetchingOwned
    : isFetchingCollection && collectionNfts.length === 0;

  const loadMoreRef = useInView<HTMLDivElement>(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, !isOwnerView && Boolean(hasNextPage));

  const handleChange = (value: string) => {
    setAddress(value);
    if (!value.trim()) setSubmittedAddress("");
  };

  const handleBlur = () => {
    const trimmed = address.trim();
    if (trimmed !== submittedAddress) {
      setSubmittedAddress(trimmed);
    }
  };

  return (
    <section className="flex flex-1 flex-col items-center gap-8 px-4 py-16 text-center">
      <div className="max-w-xl space-y-3">
        <h1 className="font-display text-3xl tracking-tight text-white lg:text-4xl">
          View Your Bots
        </h1>
        <p className="text-sm text-white/70 lg:text-base">
          Paste your EVM address below to see your NFTs
        </p>
      </div>

      <input
        type="text"
        value={address}
        onChange={(event) => handleChange(event.target.value)}
        onBlur={handleBlur}
        placeholder="0x..."
        className="w-full max-w-md rounded-lg border border-border bg-surface px-4 py-2 font-mono text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-primary"
      />

      {isInitialLoading && <Spinner />}

      {isError && (
        <p className="text-sm text-pink">
          Couldn't load NFTs for that address.
        </p>
      )}

      {!isInitialLoading && !isError && isOwnerView && nfts.length === 0 && (
        <p className="text-sm text-white/60">
          No NFTs from this collection found for that address.
        </p>
      )}

      {!isInitialLoading && nfts.length > 0 && (
        <div className="grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {nfts.map((nft) => (
            <NftCard
              key={nft.tokenId}
              nft={nft}
              rarity={rarity.get(nft.tokenId)}
            />
          ))}
        </div>
      )}

      {!isOwnerView && hasNextPage && <div ref={loadMoreRef} className="h-px" />}

      {isFetchingNextPage && <Spinner />}
    </section>
  );
};
