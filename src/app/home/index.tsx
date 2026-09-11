import { useMemo, useState } from "react";
import { COLLECTION_PAGE_SIZE } from "@/api/definitions";
import { useGetCollectionNfts } from "@/api/nfts/get-collection";
import { useGetRarity } from "@/api/nfts/get-rarity";
import { Spinner } from "@/shared/spinner";
import { NftCard } from "@/shared/nft-card";
import { Filters } from "@/shared/filters";
import { useInView } from "@/lib/use-in-view";
import { sortNfts, type SortOption } from "@/lib/sort-nfts";
import { filterNfts, toggleTrait, type TraitFilters } from "@/lib/filter-nfts";

export const HomePage = () => {
  const [address, setAddress] = useState("");
  const [submittedAddress, setSubmittedAddress] = useState("");
  const [sort, setSort] = useState<SortOption>("tokenId");
  const [traitFilters, setTraitFilters] = useState<TraitFilters>({});
  const [visibleCount, setVisibleCount] = useState(COLLECTION_PAGE_SIZE);
  const isOwnerView = Boolean(submittedAddress);

  const { data: rarityData, isLoading: isLoadingRarity } = useGetRarity();

  const {
    data: ownedNfts,
    isFetching: isFetchingOwned,
    isError,
  } = useGetCollectionNfts(submittedAddress);

  // Everything renders off the rarity file; the API only tells us which token
  // ids a wallet owns.
  const sourceNfts = useMemo(() => {
    const all = rarityData?.nfts ?? [];
    if (!isOwnerView) return all;

    const ownedIds = new Set((ownedNfts ?? []).map((nft) => nft.tokenId));
    return all.filter((nft) => ownedIds.has(nft.tokenId));
  }, [isOwnerView, ownedNfts, rarityData]);

  const nfts = useMemo(
    () => sortNfts(filterNfts(sourceNfts, traitFilters), sort),
    [sourceNfts, traitFilters, sort],
  );

  const visibleNfts = nfts.slice(0, visibleCount);
  const hasMore = visibleNfts.length < nfts.length;
  const isInitialLoading = isOwnerView ? isFetchingOwned : isLoadingRarity;

  const loadMoreRef = useInView<HTMLDivElement>(() => {
    setVisibleCount((count) => count + COLLECTION_PAGE_SIZE);
  }, hasMore);

  const resetPaging = () => setVisibleCount(COLLECTION_PAGE_SIZE);

  const handleSortChange = (value: SortOption) => {
    setSort(value);
    resetPaging();
  };

  const handleTraitToggle = (category: string, value: string) => {
    setTraitFilters((filters) => toggleTrait(filters, category, value));
    resetPaging();
  };

  const handleClearTraits = () => {
    setTraitFilters({});
    resetPaging();
  };

  const handleChange = (value: string) => {
    setAddress(value);
    if (!value.trim()) {
      setSubmittedAddress("");
      resetPaging();
    }
  };

  const handleBlur = () => {
    const trimmed = address.trim();
    if (trimmed !== submittedAddress) {
      setSubmittedAddress(trimmed);
      resetPaging();
    }
  };

  return (
    <section className="flex flex-1 flex-col items-center gap-6 px-4 py-16 text-center">
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

      {rarityData && (
        <Filters
          sort={sort}
          onSortChange={handleSortChange}
          traitCounts={rarityData.traitCounts}
          traitFilters={traitFilters}
          onTraitToggle={handleTraitToggle}
          onClearTraits={handleClearTraits}
        />
      )}

      {isInitialLoading && <Spinner />}

      {isError && (
        <p className="text-sm text-pink">
          Couldn't load NFTs for that address.
        </p>
      )}

      {!isInitialLoading && !isError && nfts.length === 0 && (
        <p className="text-sm text-white/60">
          {isOwnerView
            ? "No bots from this collection match that address."
            : "No bots match these traits."}
        </p>
      )}

      {!isInitialLoading && visibleNfts.length > 0 && (
        <div className="grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {visibleNfts.map((nft) => (
            <NftCard
              key={nft.tokenId}
              nft={nft}
              total={rarityData?.total ?? 0}
            />
          ))}
        </div>
      )}

      {hasMore && <div ref={loadMoreRef} className="h-px" />}
    </section>
  );
};
