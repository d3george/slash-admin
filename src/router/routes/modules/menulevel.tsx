import { Icon } from "@/components/icon";
import { LineLoading } from "@/components/loading";
import { H1 } from "@/ui/typography";
import { Suspense } from "react";
import { Navigate, Outlet } from "react-router";
import type { AppRouteObject } from "#/router";

function MenuLevel({ title }: { title: string }) {
	return <H1>Menu Level: {title}</H1>;
}

const menulevel: AppRouteObject = {
	order: 5,
	path: "menu_level",
	element: (
		<Suspense fallback={<LineLoading />}>
			<Outlet />
		</Suspense>
	),
	meta: {
		label: "sys.menu.menulevel.index",
		icon: <Icon icon="local:ic-menulevel" className="ant-menu-item-icon" size="24" />,
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
