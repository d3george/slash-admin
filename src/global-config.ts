import packageJson from "../package.json";

export type GlobalConfig = {
	appName: string;
	appVersion: string;
	homepage: string;
	basePath: string;
	baseApi: string;
	routerMode: "frontend" | "backend";
};

export const GLOBAL_CONFIG: GlobalConfig = {
	appName: "Slash Admin",
	appVersion: packageJson.version,
	homepage: import.meta.env.VITE_APP_HOMEPAGE || "/",
	basePath: import.meta.env.VITE_APP_BASE_PATH || "/",
	baseApi: import.meta.env.VITE_APP_BASE_API || "/api",
	routerMode: import.meta.env.VITE_APP_ROUTER_MODE || "frontend",
};
