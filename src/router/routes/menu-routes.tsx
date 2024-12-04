import { Navigate } from "react-router";

import DashboardLayout from "@/layouts/dashboard";

import AuthGuard from "../components/auth-guard";
import { getRoutesFromModules } from "../utils";

import type { AppRouteObject } from "#/router";

const menuModuleRoutes = getRoutesFromModules();

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

/**
 * dynamic routes
 */
export const menuRoutes: AppRouteObject = {
	path: "/",
	element: (
		<AuthGuard>
			<DashboardLayout />
		</AuthGuard>
	),
	children: [
		{ index: true, element: <Navigate to={HOMEPAGE} replace /> },
		...menuModuleRoutes,
	],
};
