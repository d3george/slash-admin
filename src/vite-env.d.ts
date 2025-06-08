/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_APP_ROUTER_MODE: "frontend" | "backend";
	readonly VITE_APP_BASE_API: string;
	readonly VITE_APP_HOMEPAGE: string;
	readonly VITE_APP_BASE_PATH: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
