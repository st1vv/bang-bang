const OPENSEA_API_KEY = import.meta.env.VITE_OPENSEA_API_KEY;
const OPENSEA_BASE_URL = "https://api.opensea.io/api/v2";

type OpenseaFetchOptions = {
  path: string;
  params?: Record<string, string>;
};

export const openseaFetch = async <T>({
  path,
  params,
}: OpenseaFetchOptions): Promise<T> => {
  const url = new URL(`${OPENSEA_BASE_URL}${path}`);
  for (const [key, value] of Object.entries(params ?? {})) {
    url.searchParams.set(key, value);
  }

  const response = await fetch(url, {
    headers: { "x-api-key": OPENSEA_API_KEY },
  });

  if (!response.ok) {
    throw new Error(`OpenSea request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
};
