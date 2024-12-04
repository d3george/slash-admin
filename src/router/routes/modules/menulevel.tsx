import { Typography } from "antd";
import { Suspense } from "react";
import { Navigate, Outlet } from "react-router";

import { SvgIcon } from "@/components/icon";
import { CircleLoading } from "@/components/loading";

import type { AppRouteObject } from "#/router";

function MenuLevel({ title }: { title: string }) {
	return <Typography.Title>Menu Level: {title}</Typography.Title>;
}

const menulevel: AppRouteObject = {
	order: 5,
	path: "menu_level",
	element: (
		<Suspense fallback={<CircleLoading />}>
			<Outlet />
		</Suspense>
	),
	meta: {
		label: "sys.menu.menulevel.index",
		icon: (
			<SvgIcon icon="ic-menulevel" className="ant-menu-item-icon" size="24" />
		),
		key: "/menu_level",
	},
	children: [
		{
			path: "menu_level_1a",
			element: <MenuLevel title="1a" />,
			meta: {
				label: "sys.menu.menulevel.1a",
				key: "/menu_level/menu_level_1a",
			},
		},
		{
			path: "menu_level_1b",
			meta: {
				label: "sys.menu.menulevel.1b.index",
				key: "/menu_level/menu_level_1b",
			},
			children: [
				{
					index: true,
					element: <Navigate to="menu_level_2a" replace />,
				},
				{
					path: "menu_level_2a",
					element: <MenuLevel title="2a" />,
					meta: {
						label: "sys.menu.menulevel.1b.2a",
						key: "/menu_level/menu_level_1b/menu_level_2a",
					},
				},
				{
					path: "menu_level_2b",
					meta: {
						label: "sys.menu.menulevel.1b.2b.index",
						key: "/menu_level/menu_level_1b/menu_level_2b",
					},
					children: [
						{
							index: true,
							element: <Navigate to="menu_level_3a" replace />,
						},
						{
							path: "menu_level_3a",
							element: <MenuLevel title="3a" />,
							meta: {
								label: "sys.menu.menulevel.1b.2b.3a",
								key: "/menu_level/menu_level_1b/menu_level_2b/menu_level_3a",
							},
						},
						{
							path: "menu_level_3b",
							element: <MenuLevel title="3b" />,
							meta: {
								label: "sys.menu.menulevel.1b.2b.3b",
								key: "/menu_level/menu_level_1b/menu_level_2b/menu_level_3b",
							},
						},
					],
				},
			],
		},
	],
};

export default menulevel;
