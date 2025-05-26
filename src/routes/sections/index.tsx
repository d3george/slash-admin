import { DB_MENU } from "@/_mock/assets_backup";
import { convertFlatToTree } from "@/utils/tree";
import { Navigate, type RouteObject } from "react-router";
import { authRoutes } from "./auth";
import { dashboardRoutes } from "./dashboard";
import { mainRoutes } from "./main";

const menu_tree = convertFlatToTree(DB_MENU);
console.log("menu_tree", menu_tree);

export const routesSection: RouteObject[] = [
	// Auth
	...authRoutes,
	// Dashboard
	...dashboardRoutes,
	// Main
	...mainRoutes,
	// No Match
	{ path: "*", element: <Navigate to="/404" replace /> },
];
