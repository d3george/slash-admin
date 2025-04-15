import Icon from "@/components/icon/icon";
import { RouterLink } from "@/router/components/router-link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/ui/tooltip";
import { cn } from "@/utils";
import { navItemClasses, navItemStyles } from "../styles";
import type { NavItemProps } from "../types";

export const NavSubItem = (item: NavItemProps) => {
	const content = (
		<>
			{/* Icon */}
			<span style={navItemStyles.icon} className="mr-1">
				{item.icon && typeof item.icon === "string" ? <Icon icon={item.icon} /> : item.icon}
			</span>

			{/* Title */}
			<span style={navItemStyles.title} className="flex-auto">
				{item.title}
			</span>

			{/* Caption */}
			{item.caption && (
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<Icon icon="solar:info-circle-linear" size={16} />
						</TooltipTrigger>
						<TooltipContent side="right">
							<p>{item.caption}</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			)}

			{/* Info */}
			{item.info && <span style={navItemStyles.info}>{item.info}</span>}

			{/* Arrow */}
			{item.hasChild && <Icon icon="eva:arrow-ios-forward-fill" style={navItemStyles.arrow} />}
		</>
	);

	const itemClassName = cn(
		navItemClasses.base,
		navItemClasses.hover,
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
