import { Navigate, type RouteObject, createHashRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import DashboardLayout from "@/layouts/dashboard";
import AuthGuard from "@/router/components/auth-guard";
import { usePermissionRoutes } from "@/router/hooks";
import { ErrorRoutes } from "@/router/routes/error-routes";

import PageError from "@/pages/sys/error/PageError";
import Login from "@/pages/sys/login/Login";
import { ErrorBoundary } from "react-error-boundary";
import type { AppRouteObject } from "#/router";

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;
const LoginRoute: AppRouteObject = {
	path: "/login",
	element: (
		<ErrorBoundary FallbackComponent={PageError}>
			<Login />
		</ErrorBoundary>
	),
};
const PAGE_NOT_FOUND_ROUTE: AppRouteObject = {
	path: "*",
	element: <Navigate to="/404" replace />,
};

export default function Router() {
	const permissionRoutes = usePermissionRoutes();
	const asyncRoutes: AppRouteObject = {
		path: "/",
		element: (
			<AuthGuard>
				<DashboardLayout />
			</AuthGuard>
		),
		children: [{ index: true, element: <Navigate to={HOMEPAGE} replace /> }, ...permissionRoutes],
	};

	const routes = [LoginRoute, asyncRoutes, ErrorRoutes, PAGE_NOT_FOUND_ROUTE];

	const router = createHashRouter(routes as unknown as RouteObject[]);

	return <RouterProvider router={router} />;
}
