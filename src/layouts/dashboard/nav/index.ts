import { backendNavData } from "./nav-data-backend";
import { frontendNavData } from "./nav-data-frontend";

const { VITE_APP_ROUTER_MODE: ROUTER_MODE } = import.meta.env;
export const navData = ROUTER_MODE === "backend" ? backendNavData : frontendNavData;

export * from "./nav-toggle-button";
export * from "./nav-horizontal-layout";
export * from "./nav-mobile-layout";
export * from "./nav-vertical-layout";
