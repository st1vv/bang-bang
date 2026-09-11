import { writeFile, readFile } from "node:fs/promises";

const COLLECTION_SLUG = "banger-bots";
const BASE_URL = "https://api.opensea.io/api/v2";
const OUTPUT_PATH = "public/rarity.json";

const readApiKey = async () => {
  const env = await readFile(".env", "utf8");
  const match = env.match(/VITE_OPENSEA_API_KEY=(.+)/);
  if (!match) throw new Error("VITE_OPENSEA_API_KEY not found in .env");
  return match[1].trim();
};

const apiKey = await readApiKey();

const request = async (path, params = {}) => {
  const url = new URL(`${BASE_URL}${path}`);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const response = await fetch(url, { headers: { "x-api-key": apiKey } });
  if (!response.ok) {
    throw new Error(`${response.status} ${await response.text()}`);
  }
  return response.json();
};

const fetchAllNfts = async () => {
  const nfts = [];
  let cursor;

  do {
    const data = await request(`/collection/${COLLECTION_SLUG}/nfts`, {
      limit: "200",
      ...(cursor ? { next: cursor } : {}),
    });
    nfts.push(...data.nfts);
    cursor = data.next ?? undefined;
    process.stdout.write(`\rfetched ${nfts.length} nfts`);
  } while (cursor);

  process.stdout.write("\n");
  return nfts;
};

const { counts } = await request(`/traits/${COLLECTION_SLUG}`);
const nfts = await fetchAllNfts();
const total = nfts.length;

// Tokens missing a trait category still carry information: treat the absence
// as a "None" value whose count is everything not covered by the known values.
const noneCounts = Object.fromEntries(
  Object.entries(counts).map(([category, values]) => {
    const covered = Object.values(values).reduce((sum, count) => sum + count, 0);
    return [category, total - covered];
  }),
);

const scoreOf = (nft) => {
  const traitsByCategory = new Map(
    nft.traits.map((trait) => [trait.trait_type, trait.value]),
  );

  return Object.entries(counts).reduce((score, [category, values]) => {
    const value = traitsByCategory.get(category);
    const count = value === undefined ? noneCounts[category] : values[value];
    if (!count) return score;
    return score - Math.log2(count / total);
  }, 0);
};

const scored = nfts
  .map((nft) => ({
    tokenId: nft.identifier,
    name: nft.name || `#${nft.identifier}`,
    image: nft.image_url ?? "",
    score: scoreOf(nft),
  }))
  .sort((a, b) => b.score - a.score || Number(a.tokenId) - Number(b.tokenId));

const ranked = scored.map(({ score, ...nft }, index) => ({
  ...nft,
  rank: index + 1,
}));

await writeFile(
  OUTPUT_PATH,
  JSON.stringify({ total, nfts: ranked }),
  "utf8",
);

const sample = ranked.find((nft) => nft.tokenId === "1");
console.log(`wrote ${OUTPUT_PATH}: ${ranked.length} nfts`);
console.log(`sanity check — token #1 rank: ${sample?.rank} (OpenSea says 3445)`);
