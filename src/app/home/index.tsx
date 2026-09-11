import { useState } from "react";
import { useGetCollectionNfts } from "@/api/nfts/get-collection";

export const HomePage = () => {
  const [address, setAddress] = useState("");
  const [submittedAddress, setSubmittedAddress] = useState("");

  const {
    data: nfts = [],
    isFetching,
    isError,
  } = useGetCollectionNfts(submittedAddress);

  const handleBlur = () => {
    const trimmed = address.trim();
    if (trimmed && trimmed !== submittedAddress) {
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
        onChange={(event) => setAddress(event.target.value)}
        onBlur={handleBlur}
        placeholder="0x..."
        className="w-full max-w-md rounded-lg border border-border bg-surface px-4 py-2 font-mono text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-primary"
      />

      {isFetching && <p className="text-sm text-white/60">Loading...</p>}

      {isError && (
        <p className="text-sm text-pink">
          Couldn't load NFTs for that address.
        </p>
      )}

      {!isFetching && !isError && submittedAddress && nfts.length === 0 && (
        <p className="text-sm text-white/60">
          No NFTs from this collection found for that address.
        </p>
      )}

      {nfts.length > 0 && (
        <div className="grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {nfts.map((nft) => (
            <div
              key={nft.tokenId}
              className="overflow-hidden rounded-xl border border-white/15 bg-white/5"
            >
              <img
                src={nft.image}
                alt={nft.name}
                className="aspect-square w-full object-cover"
              />
              <p className="px-2 py-2 text-xs font-mono text-white/80">
                {nft.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
