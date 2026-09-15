import { useCallback } from "react";
import { useOwnedNfts } from "@/lib/use-owned-nfts";
import { useAddressParam } from "@/lib/use-address-param";
import { AddressInput } from "@/shared/address-input";
import { Spinner } from "@/shared/spinner";
import { CollageActions } from "@/app/collage/collage-actions";
import { CollagePreview } from "@/app/collage/collage-preview";
import { GridSizePicker } from "@/app/collage/grid-size-picker";
import { PickerTile } from "@/app/collage/picker-tile";
import { useCollageExport } from "@/app/collage/use-collage-export";
import { useCollageSelection } from "@/app/collage/use-collage-selection";

export const CollagePage = () => {
  const { address, setAddress, submittedAddress, submitAddress } =
    useAddressParam();
  const { nfts, isLoading, isError } = useOwnedNfts(submittedAddress);

  const {
    columns,
    capacity,
    selectedIds,
    selectedNfts,
    isSizeAvailable,
    setColumns,
    toggle,
    clear,
    randomize,
    reset,
  } = useCollageSelection(nfts);

  const { status, isExporting, download, copy, resetStatus } = useCollageExport(
    selectedNfts,
    columns,
  );

  const handleToggle = useCallback(
    (tokenId: string) => {
      resetStatus();
      toggle(tokenId);
    },
    [resetStatus, toggle],
  );

  const handleAddressChange = (value: string) => {
    setAddress(value);
    if (!value.trim()) {
      submitAddress("");
      reset();
    }
  };

  const handleAddressSearch = () => {
    if (address.trim() !== submittedAddress) {
      submitAddress(address);
      reset();
    }
  };

  return (
    <section className="flex flex-1 flex-col items-center gap-6 px-4 py-10 text-center lg:py-16">
      <div className="max-w-xl space-y-3">
        <h1 className="font-display text-3xl tracking-tight text-white lg:text-4xl">
          Collage Editor
        </h1>
        <p className="text-sm text-white/70 lg:text-base">
          Paste your EVM address, pick your bots and build a collage
        </p>
      </div>

      <AddressInput
        value={address}
        onChange={handleAddressChange}
        onSubmit={handleAddressSearch}
      />

      {isLoading && <Spinner />}

      {isError && (
        <p className="text-sm text-pink">
          Couldn't load NFTs for that address.
        </p>
      )}

      {!isLoading && !isError && submittedAddress && nfts.length === 0 && (
        <p className="text-sm text-white/60">
          This wallet doesn't hold any Banger Bots yet.
        </p>
      )}

      {!submittedAddress && !isLoading && (
        <div className="flex w-full max-w-md flex-col items-center gap-2 rounded-xl border border-dashed border-white/20 bg-ink/60 px-6 py-14 backdrop-blur-sm">
          <p className="font-display text-sm text-white/80">
            Enter your address to start
          </p>
          <p className="text-xs text-white/50">
            Paste an EVM address above and pick the bots for your collage
          </p>
        </div>
      )}

      {nfts.length > 0 && (
        <GridSizePicker
          columns={columns}
          isSizeAvailable={isSizeAvailable}
          onChange={setColumns}
        />
      )}

      {nfts.length > 0 && (
        <div className="flex w-full max-w-5xl flex-col gap-6 md:flex-row md:items-start">
          <div className="flex flex-col items-center gap-4 md:sticky md:top-6 md:w-2/5">
            <CollagePreview nfts={selectedNfts} columns={columns} />
            <CollageActions
              selectedCount={selectedNfts.length}
              capacity={capacity}
              status={status}
              isExporting={isExporting}
              onDownload={download}
              onCopy={copy}
              onRandom={randomize}
              onClear={clear}
            />
          </div>

          <div className="max-h-[65vh] w-full overflow-y-auto rounded-xl border border-white/15 bg-ink/80 p-3 [contain:paint] md:w-3/5">
            <div className="grid grid-cols-3 gap-3 lg:grid-cols-4">
              {nfts.map((nft) => (
                <PickerTile
                  key={nft.tokenId}
                  nft={nft}
                  order={selectedIds.indexOf(nft.tokenId)}
                  onToggle={handleToggle}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
