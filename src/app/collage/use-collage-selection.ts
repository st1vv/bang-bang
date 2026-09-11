import { useCallback, useMemo, useState } from "react";
import type { RarityNft } from "@/api/definitions";

export const GRID_SIZES = [2, 3, 4, 5, 6];
const SMALLEST_SIZE = GRID_SIZES[0];

export const useCollageSelection = (nfts: RarityNft[]) => {
  const [chosenColumns, setChosenColumns] = useState<number | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Default to the biggest grid the wallet can fill, until the user picks one.
  const autoColumns = useMemo(() => {
    const fitting = GRID_SIZES.filter((size) => size * size <= nfts.length);
    return fitting.at(-1) ?? SMALLEST_SIZE;
  }, [nfts.length]);

  const columns = chosenColumns ?? autoColumns;
  const capacity = columns * columns;

  const selectedNfts = useMemo(
    () =>
      selectedIds.flatMap((id) => nfts.find((nft) => nft.tokenId === id) ?? []),
    [selectedIds, nfts],
  );

  // A wallet can only fill a grid it has enough bots for; the smallest grid
  // stays available so there is always something to build.
  const isSizeAvailable = useCallback(
    (size: number) =>
      size === SMALLEST_SIZE || nfts.length === 0 || size * size <= nfts.length,
    [nfts.length],
  );

  const setColumns = useCallback((value: number) => {
    setChosenColumns(value);
    setSelectedIds((ids) => ids.slice(0, value * value));
  }, []);

  const toggle = useCallback(
    (tokenId: string) => {
      setSelectedIds((ids) => {
        if (ids.includes(tokenId)) return ids.filter((id) => id !== tokenId);
        return ids.length < capacity ? [...ids, tokenId] : ids;
      });
    },
    [capacity],
  );

  const clear = useCallback(() => setSelectedIds([]), []);

  const randomize = useCallback(() => {
    const pool = [...nfts];
    const picked: string[] = [];

    while (picked.length < capacity && pool.length) {
      const [nft] = pool.splice(Math.floor(Math.random() * pool.length), 1);
      picked.push(nft.tokenId);
    }

    setSelectedIds(picked);
  }, [nfts, capacity]);

  const reset = useCallback(() => {
    setSelectedIds([]);
    setChosenColumns(null);
  }, []);

  return {
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
  };
};
