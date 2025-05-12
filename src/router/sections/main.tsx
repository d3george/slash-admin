import { LineLoading } from "@/components/loading";
import SimpleLayout from "@/layouts/simple";
import { Suspense, lazy } from "react";
import { Outlet, type RouteObject } from "react-router";

const Page403 = lazy(() => import("@/pages/sys/error/Page403"));
const Page404 = lazy(() => import("@/pages/sys/error/Page404"));
const Page500 = lazy(() => import("@/pages/sys/error/Page500"));

export const mainRoutes: RouteObject[] = [
	{
		element: (
			<Suspense fallback={<LineLoading />}>
				<Outlet />
			</Suspense>
		),
		children: [
			{
				path: "/",
				element: (
					<SimpleLayout>
						<Outlet />
					</SimpleLayout>
				),
				children: [
					{ path: "500", element: <Page500 /> },
					{ path: "404", element: <Page404 /> },
					{ path: "403", element: <Page403 /> },
				],
			},
		],
	},
];
