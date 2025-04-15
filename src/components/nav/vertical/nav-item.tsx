import Icon from "@/components/icon/icon";
import { RouterLink } from "@/router/components/router-link";
import { TooltipContent } from "@/ui/tooltip";
import { Tooltip } from "@/ui/tooltip";
import { TooltipTrigger } from "@/ui/tooltip";
import { TooltipProvider } from "@/ui/tooltip";
import { cn } from "@/utils";
import { navItemClasses, navItemStyles } from "../styles";
import type { NavItemProps } from "../types";

export function NavItem({
	title,
	path,
	icon,
	info,
	caption,
	open,
	active,
	disabled,
	hasChild,
	externalLink,
	onClick,
}: NavItemProps) {
	const content = (
		<>
			{/* Icon */}
			<span style={navItemStyles.icon} className="mr-3">
				{icon && typeof icon === "string" ? <Icon icon={icon} /> : icon}
			</span>

			{/* Texts */}
			<span style={navItemStyles.texts} className="min-h-[24px]">
				{/* Title */}
				<span style={navItemStyles.title}>{title}</span>

				{/* Caption */}
				{caption && (
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span style={navItemStyles.caption}>{caption}</span>
							</TooltipTrigger>
							<TooltipContent side="top" align="start">
								{caption}
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				)}
			</span>

			{/* Info */}
			{info && <span style={navItemStyles.info}>{info}</span>}

			{/* Arrow */}
			{hasChild && (
				<Icon
					icon="eva:arrow-ios-forward-fill"
					style={{
						...navItemStyles.arrow,
						transform: open ? "rotate(90deg)" : "rotate(0deg)",
					}}
				/>
			)}
		</>
	);

	const itemClassName = cn(
		navItemClasses.base,
		navItemClasses.hover,
		active && navItemClasses.active,
		disabled && navItemClasses.disabled,
	);

	if (disabled) {
		return <div className={itemClassName}>{content}</div>;
	}

	if (externalLink) {
		return (
			<a href={path} target="_blank" rel="noopener noreferrer" className={itemClassName}>
				{content}
			</a>
		);
	}

	if (hasChild) {
		return (
			<div className={itemClassName} onClick={onClick}>
				{content}
			</div>
		);
	}

	return (
		<RouterLink href={path} className={itemClassName}>
			{content}
		</RouterLink>
	);
}
