import { Icon } from "@/components/icon";
import type { NavProps } from "@/components/nav";
import { Badge } from "@/ui/badge";

export const navData: NavProps["data"] = [
	{
		name: "sys.menu.dashboard",
		items: [
			{
				title: "sys.menu.workbench",
				path: "/dashboard/workbench",
				icon: <Icon icon="local:ic-analysis" size="24" />,
			},
			{
				title: "sys.menu.analysis",
				path: "/dashboard/analysis",
				icon: <Icon icon="local:ic-analysis" size="24" />,
			},
		],
	},
	{
		name: "sys.menu.pages",
		items: [
			// management
			{
				title: "sys.menu.management",
				path: "/management",
				icon: <Icon icon="local:ic-management" size="24" />,
				children: [
					{
						title: "sys.menu.user.index",
						path: "/management/user",
						children: [
							{
								title: "sys.menu.user.profile",
								path: "/management/user/profile",
							},
							{
								title: "sys.menu.user.account",
								path: "/management/user/account",
							},
						],
					},
					{
						title: "sys.menu.system.index",
						path: "/management/system",
						children: [
							{
								title: "sys.menu.system.organization",
								path: "/management/system/organization",
							},
							{
								title: "sys.menu.system.permission",
								path: "/management/system/permission",
							},
							{
								title: "sys.menu.system.role",
								path: "/management/system/role",
							},
							{
								title: "sys.menu.system.user",
								path: "/management/system/user",
							},
						],
					},
				],
			},
			// menulevel
			{
				title: "sys.menu.menulevel.index",
				path: "/menu_level",
				icon: <Icon icon="local:ic-menulevel" size="24" />,
				children: [
					{
						title: "sys.menu.menulevel.1a",
						path: "/menu_level/menu_level_1a",
					},
					{
						title: "sys.menu.menulevel.1b.index",
						path: "/menu_level/menu_level_1b",
						children: [
							{
								title: "sys.menu.menulevel.1b.2a",
								path: "/menu_level/menu_level_1b/menu_level_2a",
							},
							{
								title: "sys.menu.menulevel.1b.2b.index",
								path: "/menu_level/menu_level_1b/menu_level_2b",
								children: [
									{
										title: "sys.menu.menulevel.1b.2b.3a",
										path: "/menu_level/menu_level_1b/menu_level_2b/menu_level_3a",
									},
									{
										title: "sys.menu.menulevel.1b.2b.3b",
										path: "/menu_level/menu_level_1b/menu_level_2b/menu_level_3b",
									},
								],
							},
						],
					},
				],
			},
			// errors
			{
				title: "sys.menu.error.index",
				path: "/error",
				icon: <Icon icon="bxs:error-alt" size="24" />,
				children: [
					{
						title: "sys.menu.error.403",
						path: "/error/403",
					},
					{
						title: "sys.menu.error.404",
						path: "/error/404",
					},
					{
						title: "sys.menu.error.500",
						path: "/error/500",
					},
				],
			},
		],
	},
	{
		name: "sys.menu.ui",
		items: [
			// components
			{
				title: "sys.menu.components",
				path: "/components",
				icon: <Icon icon="solar:widget-5-bold-duotone" size="24" />,
				caption: "sys.menu.custom_ui_components",
				children: [
					{
						title: "sys.menu.icon",
						path: "/components/icon",
					},
					{
						title: "sys.menu.animate",
						path: "/components/animate",
					},
					{
						title: "sys.menu.scroll",
						path: "/components/scroll",
					},
					{
						title: "sys.menu.i18n",
						path: "/components/multi-language",
					},
					{
						title: "sys.menu.upload",
						path: "/components/upload",
					},
					{
						title: "sys.menu.chart",
						path: "/components/chart",
					},
					{
						title: "sys.menu.toast",
						path: "/components/toast",
					},
				],
			},
			// functions
			{
				title: "sys.menu.functions",
				path: "/functions",
				icon: <Icon icon="solar:plain-2-bold-duotone" size="24" />,
				children: [
					{
						title: "sys.menu.clipboard",
						path: "/functions/clipboard",
					},
					{
						title: "sys.menu.token_expired",
						path: "/functions/token-expired",
					},
				],
			},
		],
	},
	{
		name: "sys.menu.others",
		items: [
			{
				title: "sys.menu.calendar",
				path: "/calendar",
				icon: <Icon icon="solar:calendar-bold-duotone" size="24" />,
				info: <Badge variant="warning">+12</Badge>,
			},
			{
				title: "sys.menu.kanban",
				path: "/kanban",
				icon: <Icon icon="solar:clipboard-bold-duotone" size="24" />,
			},
			{
				title: "sys.menu.disabled",
				path: "/disabled",
				icon: <Icon icon="local:ic-disabled" size="24" />,
				disabled: true,
			},
			{
				title: "sys.menu.label",
				path: "#label",
				icon: <Icon icon="local:ic-label" size="14" />,
				info: (
					<Badge variant="info">
						<Icon icon="solar:bell-bing-bold-duotone" size={14} />
						New
					</Badge>
				),
			},
			{
				title: "sys.menu.frame",
				path: "/iframe",
				icon: <Icon icon="local:ic-external" size="24" />,
				children: [
					{
						title: "sys.menu.external_link",
						path: "/iframe/external-link",
					},
					{
						title: "sys.menu.iframe",
						path: "/iframe/iframe",
					},
				],
			},
			{
				title: "sys.menu.blank",
				path: "/blank",
				icon: <Icon icon="local:ic-blank" size="24" />,
			},
		],
	},
];
