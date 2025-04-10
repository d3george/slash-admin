import { Icon } from "@/components/icon";
import { CircleLoading } from "@/components/loading";
import { Tag } from "antd";
import { Suspense, lazy } from "react";
import type { AppRouteObject } from "#/router";

const ExternalLink = lazy(() => import("@/pages/sys/others/iframe/external-link"));
const Iframe = lazy(() => import("@/pages/sys/others/iframe"));
const Calendar = lazy(() => import("@/pages/sys/others/calendar"));
const Kanban = lazy(() => import("@/pages/sys/others/kanban"));
const Blank = lazy(() => import("@/pages/sys/others/blank"));

function Wrapper({ children }: any) {
	return <Suspense fallback={<CircleLoading />}>{children}</Suspense>;
}
const others: AppRouteObject[] = [
	{
		path: "calendar",
		element: (
			<Wrapper>
				<Calendar />
			</Wrapper>
		),
		meta: {
			label: "sys.menu.calendar",
			icon: <Icon icon="solar:calendar-bold-duotone" size={24} />,
			key: "/calendar",
		},
	},
	{
		path: "kanban",
		element: (
			<Wrapper>
				<Kanban />
			</Wrapper>
		),
		meta: {
			label: "sys.menu.kanban",
			icon: <Icon icon="solar:clipboard-bold-duotone" size={24} />,
			key: "/kanban",
		},
	},
	{
		element: (
			<Wrapper>
				<div />
			</Wrapper>
		),
		meta: {
			label: "sys.menu.disabled",
			icon: <Icon icon="local:ic-disabled" className="ant-menu-item-icon" size="24" />,
			disabled: true,
			key: "/disabled",
		},
	},
	{
		path: "label",
		element: (
			<Wrapper>
				<div />
			</Wrapper>
		),
		meta: {
			label: "sys.menu.label",
			icon: <Icon icon="local:ic-label" className="ant-menu-item-icon" size="24" />,
			suffix: (
				<Tag color="cyan" icon={<Icon icon="solar:bell-bing-bold-duotone" size={14} />}>
					NEW
				</Tag>
			),
			key: "/label",
		},
	},
	{
		path: "frame",
		meta: {
			label: "sys.menu.frame",
			icon: <Icon icon="local:ic-external" className="ant-menu-item-icon" size="24" />,
			key: "/frame",
		},
		children: [
			{
				path: "external_link",
				element: (
					<Wrapper>
						<ExternalLink src="https://ant.design/index-cn" />
					</Wrapper>
				),
				meta: {
					label: "sys.menu.external_link",
					key: "/frame/external_link",
				},
			},
			{
				path: "iframe",
				element: (
					<Wrapper>
						<Iframe src="https://ant.design/index-cn" />
					</Wrapper>
				),
				meta: {
					label: "sys.menu.iframe",
					key: "/frame/iframe",
				},
			},
		],
	},
	{
		path: "blank",
		element: (
			<Wrapper>
				<Blank />
			</Wrapper>
		),
		meta: {
			label: "sys.menu.blank",
			icon: <Icon icon="local:ic-blank" className="ant-menu-item-icon" size="24" />,
			key: "/blank",
		},
	},
];

export default others;
