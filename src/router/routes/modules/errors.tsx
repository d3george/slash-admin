import { Suspense, lazy } from "react";
import { Outlet } from "react-router";

import { Iconify } from "@/components/icon";
import { CircleLoading } from "@/components/loading";

import type { AppRouteObject } from "#/router";

const Page403 = lazy(() => import("@/pages/sys/error/Page403"));
const Page404 = lazy(() => import("@/pages/sys/error/Page404"));
const Page500 = lazy(() => import("@/pages/sys/error/Page500"));

const errors: AppRouteObject[] = [
	{
		path: "error",
		order: 6,
		element: (
			<Suspense fallback={<CircleLoading />}>
				<Outlet />
			</Suspense>
		),
		meta: {
			label: "sys.menu.error.index",
			icon: (
				<Iconify
					icon="bxs:error-alt"
					className="ant-menu-item-icon"
					size="24"
				/>
			),
			key: "/error",
		},
		children: [
			{
				path: "403",
				element: <Page403 />,
				meta: {
					label: "sys.menu.error.403",
					key: "/error/403",
				},
			},
			{
				path: "404",
				element: <Page404 />,
				meta: {
					label: "sys.menu.error.404",
					key: "/error/404",
				},
			},
			{
				path: "500",
				element: <Page500 />,
				meta: {
					label: "sys.menu.error.500",
					key: "/error/500",
				},
			},
		],
	},
];

export default errors;
