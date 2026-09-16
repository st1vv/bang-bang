import { BANGER_BOTS, LIL_BANGERS } from "@/api/definitions";

export type CollageSource = "bots" | "lil" | "both";

type SourceConfig = {
  label: string;
  // Which wallets to load; a collection left out is never fetched.
  hasBots: boolean;
  hasLil: boolean;
  fileNamePrefix: string;
  // Reads inside "This wallet doesn't hold any … yet."
  emptyLabel: string;
};

export const COLLAGE_SOURCE_ORDER: CollageSource[] = ["bots", "lil", "both"];

export const COLLAGE_SOURCES: Record<CollageSource, SourceConfig> = {
  bots: {
    label: BANGER_BOTS.shortName,
    hasBots: true,
    hasLil: false,
    fileNamePrefix: "banger-bots",
    emptyLabel: BANGER_BOTS.name,
  },
  lil: {
    label: LIL_BANGERS.shortName,
    hasBots: false,
    hasLil: true,
    fileNamePrefix: "lil-bangers",
    emptyLabel: LIL_BANGERS.name,
  },
  both: {
    label: "Both",
    hasBots: true,
    hasLil: true,
    fileNamePrefix: "bangers",
    emptyLabel: `${BANGER_BOTS.name} or ${LIL_BANGERS.name}`,
  },
};
