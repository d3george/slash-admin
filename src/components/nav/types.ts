export type NavItemStateProps = {
	open?: boolean;
	active?: boolean;
	disabled?: boolean;
};

export type NavItemDataProps = {
	path: string;
	title: string;
	icon?: string | React.ReactNode;
	info?: React.ReactNode;
	caption?: string;
	allowedRoles?: string | string[];
	children?: NavItemDataProps[];
	disabled?: boolean;
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
	checkPermissions?: (allowedRoles?: NavItemProps["allowedRoles"]) => boolean;
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
