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
	auth?: string[];
	children?: NavItemDataProps[];
	disabled?: boolean;
	hidden?: boolean;
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
	authenticate?: (auth?: NavItemProps["auth"]) => boolean;
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
