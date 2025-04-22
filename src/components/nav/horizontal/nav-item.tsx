import Icon from "@/components/icon/icon";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/ui/tooltip";
import { cn } from "@/utils";
import { NavItemRenderer } from "../components";
import { navItemClasses, navItemStyles } from "../styles";
import type { NavItemProps } from "../types";
export const NavItem = (item: NavItemProps) => {
	const content = (
		<>
			{/* Icon */}
			<span style={navItemStyles.icon} className="items-center justify-center">
				{item.icon && typeof item.icon === "string" ? <Icon icon={item.icon} /> : item.icon}
			</span>

			{/* Title */}
			<span style={navItemStyles.title} className="ml-2 block! flex-auto!">
				{item.title}
			</span>

			{/* Caption */}
			{item.caption && (
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<Icon icon="solar:info-circle-linear" size={16} className="ml-1.5" style={navItemStyles.caption} />
						</TooltipTrigger>
						<TooltipContent side="bottom">{item.caption}</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			)}

			{/* Info */}
			{item.info && <span style={navItemStyles.info}>{item.info}</span>}

			{/* Arrow */}
			{item.hasChild && <ItemIcon depth={item.depth} />}
		</>
	);

	const itemClassName = cn(
		navItemClasses.base,
		navItemClasses.hover,
		"min-h-[32px]  max-w-[250px]",
		item.active && item.depth === 1 && navItemClasses.active,
		item.active && item.depth !== 1 && "bg-action-hover!",
		item.disabled && navItemClasses.disabled,
	);

	return (
		<NavItemRenderer item={item} className={itemClassName}>
			{content}
		</NavItemRenderer>
	);
};

const ItemIcon = ({ depth = 1 }: { depth?: number }) => {
	const icon = depth === 1 ? "eva:arrow-ios-downward-fill" : "eva:arrow-ios-forward-fill";
	return <Icon icon={icon} style={navItemStyles.arrow} />;
};
