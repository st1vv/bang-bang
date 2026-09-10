/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ALCHEMY_API_KEY: string;
  readonly VITE_OPENSEA_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
