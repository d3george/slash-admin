export type NavItemStateProps = {
	open?: boolean;
	active?: boolean;
	disabled?: boolean;
};

export type NavItemDataProps = {
	path: string; // 导航路径
	title: string; // 导航标题
	icon?: string | React.ReactNode; // 图标
	info?: React.ReactNode; // 附加信息
	caption?: string; // 副标题/说明文字
	roles?: string[]; // 权限控制
	children?: NavItemDataProps[]; // 子菜单项
	disabled?: boolean; // 是否禁用
};

export type NavItemOptionsProps = {
	depth?: number;
	hasChild?: boolean;
	externalLink?: boolean;
	enabledRootRedirect?: boolean;
};

/**
 * Item
 */
export type NavItemProps = React.ComponentProps<"div"> & NavItemDataProps & NavItemStateProps & NavItemOptionsProps;

/**
 * List
 */
export type NavListProps = Pick<NavItemProps, "depth" | "enabledRootRedirect"> & {
	data: NavItemDataProps;
	currentRole?: string;
};

/**
 * Group
 */
export type NavGroupProps = Omit<NavListProps, "data" | "depth"> & {
	name?: string;
	items: NavItemDataProps[];
};

/**
 * Main
 */
export type NavProps = React.ComponentProps<"nav"> &
	Omit<NavListProps, "data" | "depth"> & {
		data: {
			name?: string;
			items: NavItemDataProps[];
		}[];
	};
