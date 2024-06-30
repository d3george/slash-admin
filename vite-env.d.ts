/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GLOB_APP_TITLE: string;
  readonly VITE_APP_BASE_API: string;
  readonly VITE_APP_HOMEPAGE: string;
  readonly VITE_APP_ENV: 'development' | 'production';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
