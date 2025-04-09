import { RouterLink } from "@/router/components/router-link";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/ui/hover-card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/ui/tooltip";
import { cn } from "@/utils";
import { Icon } from "@iconify/react";
import type { NavItemProps } from "../types";

export const NavMiniRootItem = (item: NavItemProps) => {
	const content = (
		<>
			<div className="relative w-full min-h-12 inline-flex flex-col items-center px-1 pt-2 pb-1.5">
				{/* Icon */}
				<span className="h-5 w-5">
					{item.icon && typeof item.icon === "string" ? <Icon icon={item.icon} /> : item.icon}
				</span>

				{/* Title */}
				<span
					style={{
						display: "-webkit-box",
						WebkitLineClamp: 1,
						WebkitBoxOrient: "vertical",
						overflow: "hidden",
						textOverflow: "ellipsis",
					}}
					className="text-[10px] font-medium text-center"
				>
					{item.title}
				</span>

				{/* Caption */}
				{item.caption && (
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Icon icon="solar:info-circle-linear" className="absolute left-[6px] top-[11px] h-4 w-4" />
							</TooltipTrigger>
							<TooltipContent side="right">
								<p>{item.caption}</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				)}

				{/* Arrow */}
				{item.hasChild && (
					<Icon
						icon="eva:arrow-ios-forward-fill"
						className="absolute right-[6px] top-[11px] h-4 w-4"
						style={{
							transform: item.open ? "rotate(90deg)" : "rotate(0deg)",
						}}
					/>
				)}
			</div>
		</>
	);

	const itemClassName = cn(
		"w-full flex flex-col items-center hover:bg-action-hover cursor-pointer rounded-md !text-text-primary",
		item.active && "!bg-primary/hover !text-primary",
		item.disabled && "cursor-not-allowed hover:bg-transparent !text-action-disabled",
	);

	if (item.disabled) {
		return <div className={itemClassName}>{content}</div>;
	}

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

	return (
		<HoverCard>
			<HoverCardTrigger asChild>
				<div className={itemClassName}>{content}</div>
			</HoverCardTrigger>
			<HoverCardContent side="right">123</HoverCardContent>
		</HoverCard>
	);
};
