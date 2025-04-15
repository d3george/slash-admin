import Icon from "@/components/icon/icon";
import { RouterLink } from "@/router/components/router-link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/ui/tooltip";
import { cn } from "@/utils";
import { navItemClasses, navItemStyles } from "../styles";
import type { NavItemProps } from "../types";

export const NavRootItem = (item: NavItemProps) => {
	const content = (
		<>
			{/* Caption */}
			{item.caption && (
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<Icon icon="solar:info-circle-linear" size={16} className="absolute left-1 top-2" />
						</TooltipTrigger>
						<TooltipContent side="right">{item.caption}</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			)}

			{/* Icon */}
			<span style={navItemStyles.icon}>
				{item.icon && typeof item.icon === "string" ? <Icon icon={item.icon} /> : item.icon}
			</span>

			{/* Arrow */}
			{item.hasChild && (
				<Icon icon="eva:arrow-ios-forward-fill" className="absolute right-1 top-2" style={navItemStyles.arrow} />
			)}

			{/* Title */}
			<span style={navItemStyles.title} className="text-center! text-xs! mt-1">
				{item.title}
			</span>
		</>
	);

	const itemClassName = cn(
		navItemClasses.base,
		navItemClasses.hover,
		"relative flex-col min-h-12 px-1 pt-2 pb-1.5",
		item.active && navItemClasses.active,
		item.disabled && navItemClasses.disabled,
	);

	if (item.externalLink) {
		return (
			<a href={item.path} target="_blank" rel="noopener noreferrer" className={itemClassName}>
				{content}
			</a>
		);
	}

	if (!item.hasChild) {
		return (
			<RouterLink href={item.path} className={itemClassName}>
				{content}
			</RouterLink>
		);
	}

	return <div className={itemClassName}>{content}</div>;
};
