import { useMemo, useState } from "react";
import { COLLECTION_PAGE_SIZE, type Collection } from "@/api/definitions";
import { useGetCollectionNfts } from "@/api/nfts/get-collection";
import { useGetRarity } from "@/api/nfts/get-rarity";
import { Spinner } from "@/shared/spinner";
import { AddressInput } from "@/shared/address-input";
import { NftCard } from "@/shared/nft-card";
import { Filters } from "@/shared/filters";
import { useInView } from "@/lib/use-in-view";
import { useAddressParam } from "@/lib/use-address-param";
import { sortNfts, type SortOption } from "@/lib/sort-nfts";
import { filterNfts, toggleTrait, type TraitFilters } from "@/lib/filter-nfts";

type CollectionPageProps = {
  collection: Collection;
};

export const CollectionPage = ({ collection }: CollectionPageProps) => {
  const { address, setAddress, submittedAddress, submitAddress } =
    useAddressParam();
  const [sort, setSort] = useState<SortOption>("tokenId");
  const [traitFilters, setTraitFilters] = useState<TraitFilters>({});
  const [visibleCount, setVisibleCount] = useState(COLLECTION_PAGE_SIZE);
  const isOwnerView = Boolean(submittedAddress);

  const { data: rarityData, isLoading: isLoadingRarity } =
    useGetRarity(collection);

  const {
    data: ownedNfts,
    isLoading: isLoadingOwned,
    isError,
  } = useGetCollectionNfts(collection, submittedAddress);

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

  // The biggest wallet holds under a hundred tokens, so only the 5555-item
  // collection view needs paging.
  const visibleNfts = isOwnerView ? nfts : nfts.slice(0, visibleCount);
  const hasMore = visibleNfts.length < nfts.length;
  const isInitialLoading = isOwnerView ? isLoadingOwned : isLoadingRarity;
  const isWalletEmpty = isOwnerView && sourceNfts.length === 0;

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
      submitAddress("");
      resetPaging();
    }
  };

  const handleSearch = () => {
    if (address.trim() !== submittedAddress) {
      submitAddress(address);
      resetPaging();
    }
  };

  return (
    <section className="flex flex-1 flex-col items-center gap-6 px-4 py-16 text-center">
      <div className="max-w-xl space-y-3">
        <h1 className="font-display text-3xl tracking-tight text-white lg:text-4xl">
          View Your{" "}
          <a
            href={collection.url}
            target="_blank"
            rel="noopener noreferrer"
            title="View the collection on OpenSea"
            className="text-gold transition-colors hover:text-cyan"
          >
            {collection.shortName} ↗
          </a>
        </h1>
        <p className="text-sm text-white/70 lg:text-base">
          Paste your EVM address below to see your NFTs
        </p>
      </div>

      <AddressInput
        value={address}
        onChange={handleChange}
        onSubmit={handleSearch}
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
        <div className="space-y-2">
          <p className="text-sm text-white/60">
            {isWalletEmpty
              ? `This wallet doesn't hold any ${collection.name} yet.`
              : `No ${collection.itemsLabel} match these traits.`}
          </p>
          {isWalletEmpty && (
            <a
              href={collection.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full border border-gold bg-gold/20 px-4 py-1.5 text-xs text-gold transition-colors hover:bg-gold/30"
            >
              Grab one on OpenSea ↗
            </a>
          )}
        </div>
      )}

      {!isInitialLoading && visibleNfts.length > 0 && (
        <div className="grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {visibleNfts.map((nft) => (
            <NftCard
              key={nft.tokenId}
              nft={nft}
              total={rarityData?.total ?? 0}
              collection={collection}
            />
          ))}
        </div>
      )}

      {hasMore && <div ref={loadMoreRef} className="h-px" />}
    </section>
  );
};
