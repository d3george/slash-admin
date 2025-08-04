import { GLOBAL_CONFIG } from "@/global-config";
import DashboardLayout from "@/layouts/dashboard";
import LoginAuthGuard from "@/routes/components/login-auth-guard";
import { Navigate, type RouteObject } from "react-router";
import { getBackendDashboardRoutes } from "./backend";
import { getFrontendDashboardRoutes } from "./frontend";

const getRoutes = (): RouteObject[] => {
	if (GLOBAL_CONFIG.routerMode === "frontend") {
		return getFrontendDashboardRoutes();
	}
	return getBackendDashboardRoutes();
};

export const dashboardRoutes: RouteObject[] = [
	{
		element: (
			<LoginAuthGuard>
				<DashboardLayout />
			</LoginAuthGuard>
		),
		children: [{ index: true, element: <Navigate to={GLOBAL_CONFIG.defaultRoute} replace /> }, ...getRoutes()],
	},
];
