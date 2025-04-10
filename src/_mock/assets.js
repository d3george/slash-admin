import useUserStore from "@/store/userStore";
import { faker } from "@faker-js/faker";

import { BasicStatus, PermissionType } from "#/enum";
/**
 * Organization data mock
 */
export const ORG_LIST = [
	{
		id: "1",
		name: "East China Branch",
		status: "enable",
		desc: faker.lorem.words(),
		order: 1,
		children: [
			{
				id: "1-1",
				name: "R&D Department",
				status: "disable",
				desc: "",
				order: 1,
			},
			{
				id: "1-2",
				name: "Marketing Department",
				status: "enable",
				desc: "",
				order: 2,
			},
			{
				id: "1-3",
				name: "Finance Department",
				status: "enable",
				desc: "",
				order: 3,
			},
		],
	},
	{
		id: "2",
		name: "South China Branch",
		status: "enable",
		desc: faker.lorem.words(),
		order: 2,
		children: [
			{
				id: "2-1",
				name: "R&D Department",
				status: "disable",
				desc: "",
				order: 1,
			},
			{
				id: "2-2",
				name: "Marketing Department",
				status: "enable",
				desc: "",
				order: 2,
			},
			{
				id: "2-3",
				name: "Finance Department",
				status: "enable",
				desc: "",
				order: 3,
			},
		],
	},
];

/**
 * User permission mock
 */
const DASHBOARD_PERMISSION = {
	id: "9100714781927703",
	parentId: "",
	label: "sys.menu.dashboard",
	name: "Dashboard",
	icon: "local:ic-analysis",
	type: PermissionType.CATALOGUE,
	route: "dashboard",
	order: 1,
	children: [
		{
			id: "8426999229400979",
			parentId: "9100714781927703",
			label: "sys.menu.workbench",
			name: "Workbench",
			type: PermissionType.MENU,
			route: "workbench",
			component: "/dashboard/workbench/index.tsx",
		},
		{
			id: "9710971640510357",
			parentId: "9100714781927703",
			label: "sys.menu.analysis",
			name: "Analysis",
			type: PermissionType.MENU,
			route: "analysis",
			component: "/dashboard/analysis/index.tsx",
		},
	],
};
const MANAGEMENT_PERMISSION = {
	id: "0901673425580518",
	parentId: "",
	label: "sys.menu.management",
	name: "Management",
	icon: "local:ic-management",
	type: PermissionType.CATALOGUE,
	route: "management",
	order: 2,
	children: [
		{
			id: "2781684678535711",
			parentId: "0901673425580518",
			label: "sys.menu.user.index",
			name: "User",
			type: PermissionType.CATALOGUE,
			route: "user",
			children: [
				{
					id: "4754063958766648",
					parentId: "2781684678535711",
					label: "sys.menu.user.profile",
					name: "Profile",
					type: PermissionType.MENU,
					route: "profile",
					component: "/management/user/profile/index.tsx",
				},
				{
					id: "2516598794787938",
					parentId: "2781684678535711",
					label: "sys.menu.user.account",
					name: "Account",
					type: PermissionType.MENU,
					route: "account",
					component: "/management/user/account/index.tsx",
				},
			],
		},
		{
			id: "0249937641030250",
			parentId: "0901673425580518",
			label: "sys.menu.system.index",
			name: "System",
			type: PermissionType.CATALOGUE,
			route: "system",
			children: [
				{
					id: "1985890042972842",
					parentId: "0249937641030250",
					label: "sys.menu.system.organization",
					name: "Organization",
					type: PermissionType.MENU,
					route: "organization",
					component: "/management/system/organization/index.tsx",
				},
				{
					id: "4359580910369984",
					parentId: "0249937641030250",
					label: "sys.menu.system.permission",
					name: "Permission",
					type: PermissionType.MENU,
					route: "permission",
					component: "/management/system/permission/index.tsx",
				},
				{
					id: "1689241785490759",
					parentId: "0249937641030250",
					label: "sys.menu.system.role",
					name: "Role",
					type: PermissionType.MENU,
					route: "role",
					component: "/management/system/role/index.tsx",
				},
				{
					id: "0157880245365433",
					parentId: "0249937641030250",
					label: "sys.menu.system.user",
					name: "User",
					type: PermissionType.MENU,
					route: "user",
					component: "/management/system/user/index.tsx",
				},
				{
					id: "0157880245365434",
					parentId: "0249937641030250",
					label: "sys.menu.system.user_detail",
					name: "User Detail",
					type: PermissionType.MENU,
					route: "user/:id",
					component: "/management/system/user/detail.tsx",
					hide: true,
				},
			],
		},
	],
};
const COMPONENTS_PERMISSION = {
	id: "2271615060673773",
	parentId: "",
	label: "sys.menu.components",
	name: "Components",
	icon: "solar:widget-5-bold-duotone",
	type: PermissionType.CATALOGUE,
	route: "components",
	order: 3,
	children: [
		{
			id: "2478488238255411",
			parentId: "2271615060673773",
			label: "sys.menu.icon",
			name: "Icon",
			type: PermissionType.MENU,
			route: "icon",
			component: "/components/icon/index.tsx",
		},
		{
			id: "6755238352318767",
			parentId: "2271615060673773",
			label: "sys.menu.animate",
			name: "Animate",
			type: PermissionType.MENU,
			route: "animate",
			component: "/components/animate/index.tsx",
		},
		{
			id: "9992476513546805",
			parentId: "2271615060673773",
			label: "sys.menu.scroll",
			name: "Scroll",
			type: PermissionType.MENU,
			route: "scroll",
			component: "/components/scroll/index.tsx",
		},
		{
			id: "1755562695856395",
			parentId: "2271615060673773",
			label: "sys.menu.markdown",
			name: "Markdown",
			type: PermissionType.MENU,
			route: "markdown",
			component: "/components/markdown/index.tsx",
		},
		{
			id: "2122547769468069",
			parentId: "2271615060673773",
			label: "sys.menu.editor",
			name: "Editor",
			type: PermissionType.MENU,
			route: "editor",
			component: "/components/editor/index.tsx",
		},
		{
			id: "2501920741714350",
			parentId: "2271615060673773",
			label: "sys.menu.i18n",
			name: "Multi Language",
			type: PermissionType.MENU,
			route: "i18n",
			component: "/components/multi-language/index.tsx",
		},
		{
			id: "2013577074467956",
			parentId: "2271615060673773",
			label: "sys.menu.upload",
			name: "upload",
			type: PermissionType.MENU,
			route: "Upload",
			component: "/components/upload/index.tsx",
		},
		{
			id: "7749726274771764",
			parentId: "2271615060673773",
			label: "sys.menu.chart",
			name: "Chart",
			type: PermissionType.MENU,
			route: "chart",
			component: "/components/chart/index.tsx",
		},
		{
			id: "2013577074467957",
			parentId: "2271615060673773",
			label: "sys.menu.toast",
			name: "Toast",
			type: PermissionType.MENU,
			route: "toast",
			component: "/components/toast/index.tsx",
		},
	],
};
const FUNCTIONS_PERMISSION = {
	id: "8132044808088488",
	parentId: "",
	label: "sys.menu.functions",
	name: "functions",
	icon: "solar:plain-2-bold-duotone",
	type: PermissionType.CATALOGUE,
	route: "functions",
	order: 4,
	children: [
		{
			id: "3667930780705750",
			parentId: "8132044808088488",
			label: "sys.menu.clipboard",
			name: "Clipboard",
			type: PermissionType.MENU,
			route: "clipboard",
			component: "/functions/clipboard/index.tsx",
		},
		{
			id: "3667930780705751",
			parentId: "8132044808088488",
			label: "sys.menu.token_expired",
			name: "Token Expired",
			type: PermissionType.MENU,
			route: "token-expired",
			component: "/functions/token-expired/index.tsx",
		},
	],
};
const MENU_LEVEL_PERMISSION = {
	id: "0194818428516575",
	parentId: "",
	label: "sys.menu.menulevel.index",
	name: "Menu Level",
	icon: "local:ic-menulevel",
	type: PermissionType.CATALOGUE,
	route: "menu-level",
	order: 5,
	children: [
		{
			id: "0144431332471389",
			parentId: "0194818428516575",
			label: "sys.menu.menulevel.1a",
			name: "Menu Level 1a",
			type: PermissionType.MENU,
			route: "menu-level-1a",
			component: "/menu-level/menu-level-1a/index.tsx",
		},
		{
			id: "7572529636800586",
			parentId: "0194818428516575",
			label: "sys.menu.menulevel.1b.index",
			name: "Menu Level 1b",
			type: PermissionType.CATALOGUE,
			route: "menu-level-1b",
			children: [
				{
					id: "3653745576583237",
					parentId: "7572529636800586",
					label: "sys.menu.menulevel.1b.2a",
					name: "Menu Level 2a",
					type: PermissionType.MENU,
					route: "menu-level-2a",
					component: "/menu-level/menu-level-1b/menu-level-2a/index.tsx",
				},
				{
					id: "4873136353891364",
					parentId: "7572529636800586",
					label: "sys.menu.menulevel.1b.2b.index",
					name: "Menu Level 2b",
					type: PermissionType.CATALOGUE,
					route: "menu-level-2b",
					children: [
						{
							id: "4233029726998055",
							parentId: "4873136353891364",
							label: "sys.menu.menulevel.1b.2b.3a",
							name: "Menu Level 3a",
							type: PermissionType.MENU,
							route: "menu-level-3a",
							component: "/menu-level/menu-level-1b/menu-level-2b/menu-level-3a/index.tsx",
						},
						{
							id: "3298034742548454",
							parentId: "4873136353891364",
							label: "sys.menu.menulevel.1b.2b.3b",
							name: "Menu Level 3b",
							type: PermissionType.MENU,
							route: "menu-level-3b",
							component: "/menu-level/menu-level-1b/menu-level-2b/menu-level-3b/index.tsx",
						},
					],
				},
			],
		},
	],
};
const ERRORS_PERMISSION = {
	id: "9406067785553476",
	parentId: "",
	label: "sys.menu.error.index",
	name: "Error",
	icon: "bxs:error-alt",
	type: PermissionType.CATALOGUE,
	route: "error",
	order: 6,
	children: [
		{
			id: "8557056851997154",
			parentId: "9406067785553476",
			label: "sys.menu.error.403",
			name: "403",
			type: PermissionType.MENU,
			route: "403",
			component: "/sys/error/Page403.tsx",
		},
		{
			id: "5095669208159005",
			parentId: "9406067785553476",
			label: "sys.menu.error.404",
			name: "404",
			type: PermissionType.MENU,
			route: "404",
			component: "/sys/error/Page404.tsx",
		},
		{
			id: "0225992135973772",
			parentId: "9406067785553476",
			label: "sys.menu.error.500",
			name: "500",
			type: PermissionType.MENU,
			route: "500",
			component: "/sys/error/Page500.tsx",
		},
	],
};
const OTHERS_PERMISSION = [
	{
		id: "3981225257359246",
		parentId: "",
		label: "sys.menu.calendar",
		name: "Calendar",
		icon: "solar:calendar-bold-duotone",
		type: PermissionType.MENU,
		route: "calendar",
		component: "/sys/others/calendar/index.tsx",
	},
	{
		id: "3513985683886393",
		parentId: "",
		label: "sys.menu.kanban",
		name: "kanban",
		icon: "solar:clipboard-bold-duotone",
		type: PermissionType.MENU,
		route: "kanban",
		component: "/sys/others/kanban/index.tsx",
	},
	{
		id: "5455837930804461",
		parentId: "",
		label: "sys.menu.disabled",
		name: "Disabled",
		icon: "local:ic-disabled",
		type: PermissionType.MENU,
		route: "disabled",
		status: BasicStatus.DISABLE,
		component: "/sys/others/calendar/index.tsx",
	},
	{
		id: "7728048658221587",
		parentId: "",
		label: "sys.menu.label",
		name: "Label",
		icon: "local:ic-label",
		type: PermissionType.MENU,
		route: "label",
		newFeature: true,
		component: "/sys/others/blank.tsx",
	},
	{
		id: "5733704222120995",
		parentId: "",
		label: "sys.menu.frame",
		name: "Frame",
		icon: "local:ic-external",
		type: PermissionType.CATALOGUE,
		route: "frame",
		children: [
			{
				id: "9884486809510480",
				parentId: "5733704222120995",
				label: "sys.menu.external_link",
				name: "External Link",
				type: PermissionType.MENU,
				route: "external_link",
				hideTab: true,
				component: "/sys/others/iframe/external-link.tsx",
				frameSrc: "https://ant.design/",
			},
			{
				id: "9299640886731819",
				parentId: "5733704222120995",
				label: "sys.menu.iframe",
				name: "Iframe",
				type: PermissionType.MENU,
				route: "frame",
				component: "/sys/others/iframe/index.tsx",
				frameSrc: "https://ant.design/",
			},
		],
	},
	{
		id: "0941594969900756",
		parentId: "",
		label: "sys.menu.blank",
		name: "Disabled",
		icon: "local:ic-blank",
		type: PermissionType.MENU,
		route: "blank",
		component: "/sys/others/blank.tsx",
	},
];

export const PERMISSION_LIST = [
	DASHBOARD_PERMISSION,
	MANAGEMENT_PERMISSION,
	COMPONENTS_PERMISSION,
	FUNCTIONS_PERMISSION,
	MENU_LEVEL_PERMISSION,
	ERRORS_PERMISSION,
	...OTHERS_PERMISSION,
];

/**
 * User role mock
 */
const ADMIN_ROLE = {
	id: "4281707933534332",
	name: "Admin",
	label: "admin",
	status: BasicStatus.ENABLE,
	order: 1,
	desc: "Super Admin",
	permission: PERMISSION_LIST,
};
const TEST_ROLE = {
	id: "9931665660771476",
	name: "Test",
	label: "test",
	status: BasicStatus.ENABLE,
	order: 2,
	desc: "test",
	permission: [DASHBOARD_PERMISSION, COMPONENTS_PERMISSION, FUNCTIONS_PERMISSION],
};
export const ROLE_LIST = [ADMIN_ROLE, TEST_ROLE];

/**
 * User data mock
 */
export const DEFAULT_USER = {
	id: "b34719e1-ce46-457e-9575-99505ecee828",
	username: "admin",
	email: faker.internet.email(),
	avatar: faker.image.avatarGitHub(),
	createdAt: faker.date.anytime(),
	updatedAt: faker.date.recent(),
	password: "demo1234",
	role: ADMIN_ROLE,
	permissions: ADMIN_ROLE.permission,
};
export const TEST_USER = {
	id: "efaa20ea-4dc5-47ee-a200-8a899be29494",
	username: "test",
	password: "demo1234",
	email: faker.internet.email(),
	avatar: faker.image.avatarGitHub(),
	createdAt: faker.date.anytime(),
	updatedAt: faker.date.recent(),
	role: TEST_ROLE,
	permissions: TEST_ROLE.permission,
};
export const USER_LIST = [DEFAULT_USER, TEST_USER];

// * Hot update, updating user permissions, only effective in the development environment
if (import.meta.hot) {
	import.meta.hot.accept((newModule) => {
		if (!newModule) return;

		const { DEFAULT_USER, TEST_USER, PERMISSION_LIST } = newModule;

		const {
			userInfo,
			actions: { setUserInfo },
		} = useUserStore.getState();

		if (!userInfo?.username) return;

		const newUserInfo = userInfo.username === DEFAULT_USER.username ? DEFAULT_USER : TEST_USER;

		setUserInfo(newUserInfo);

		console.log("[HMR] User permissions updated:", {
			username: newUserInfo.username,
			permissions: newUserInfo.permissions,
		});
	});
}
