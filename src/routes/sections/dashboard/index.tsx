import { LineLoading } from "@/components/loading";
import DashboardLayout from "@/layouts/dashboard";
import LoginAuthGuard from "@/routes/components/login-auth-guard";
import { Suspense } from "react";
import { Navigate, type RouteObject } from "react-router";
import { backendDashboardRoutes } from "./backend";
import { frontendDashboardRoutes } from "./frontend";

const { VITE_APP_HOMEPAGE: HOMEPAGE, VITE_APP_ROUTER_MODE: ROUTER_MODE } = import.meta.env;

export const getRoutes = (): RouteObject[] => {
	if (ROUTER_MODE === "frontend") {
		return frontendDashboardRoutes;
	}
	return backendDashboardRoutes;
};

export const dashboardRoutes: RouteObject[] = [
	{
		element: (
			<LoginAuthGuard>
				<Suspense fallback={<LineLoading />}>
					<DashboardLayout />
				</Suspense>
			</LoginAuthGuard>
		),
		children: [{ index: true, element: <Navigate to={HOMEPAGE} replace /> }, ...getRoutes()],
	},
];
