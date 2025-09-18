import { GLOBAL_CONFIG } from "@/global-config";
import DashboardLayout from "@/layouts/dashboard";
import LoginAuthGuard from "@/routes/components/login-auth-guard";
import { Navigate, type RouteObject } from "react-router";
import { getBackendDashboardRoutes } from "./backend";
import { getFrontendDashboardRoutes } from "./frontend";

// 1. 动态路由选择
const getRoutes = (): RouteObject[] => {
	if (GLOBAL_CONFIG.routerMode === "frontend") {
		console.debug("当前路由模式：前端路由");
		return getFrontendDashboardRoutes();
	}
	return getBackendDashboardRoutes();
};

// 2. 导出的 dashboardRoutes 配置
export const dashboardRoutes: RouteObject[] = [
	{
		// 3. 布局与路由守卫
		element: (
			<LoginAuthGuard>
				<DashboardLayout />
			</LoginAuthGuard>
		),
		// 4. 子路由
		children: [{ index: true, element: <Navigate to={GLOBAL_CONFIG.defaultRoute} replace /> }, ...getRoutes()],
	},
];
