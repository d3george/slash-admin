import { RouterLink } from "@/router/components/router-link";
import type { NavItemProps } from "../types";

type NavItemRendererProps = {
	item: NavItemProps;
	className: string;
	children: React.ReactNode;
};

/**
 * Renderer for Navigation Items.
 * Handles disabled, external link, clickable child container, and internal link logic.
 */
export const NavItemRenderer: React.FC<NavItemRendererProps> = ({ item, className, children }) => {
	const { disabled, externalLink, hasChild, path, onClick } = item;

	if (disabled) {
		return <div className={className}>{children}</div>;
	}

	if (externalLink) {
		return (
			<a href={path} target="_blank" rel="noopener noreferrer" className={className}>
				{children}
			</a>
		);
	}

	if (hasChild) {
		// Vertical nav items with children are clickable containers
		return (
			<div className={className} onClick={onClick}>
				{children}
			</div>
		);
	}

	// Default: internal link
	return (
		<RouterLink href={path} className={className}>
			{children}
		</RouterLink>
	);
};
