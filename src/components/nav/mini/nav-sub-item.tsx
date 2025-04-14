import { RouterLink } from "@/router/components/router-link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/ui/tooltip";
import { cn } from "@/utils";
import { Icon } from "@iconify/react";
import type { NavItemProps } from "../types";

export const NavSubItem = (item: NavItemProps) => {
	const content = (
		<>
			{/* Icon */}
			<span className={cn("mr-1 inline-flex h-6 w-6 shrink-0 items-center justify-center")}>
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
				className="flex-auto text-sm font-medium text-left leading-tight"
			>
				{item.title}
			</span>

			{/* Caption */}
			{item.caption && (
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Icon icon="solar:info-circle-linear" className="h-4 w-4" />
						</TooltipTrigger>
						<TooltipContent side="right">
							<p>{item.caption}</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			)}

			{/* Info */}
			{item.info && <span className="mx-1.5 inline-flex shrink-0 items-center">{item.info}</span>}

			{/* Arrow */}
			{item.hasChild && <Icon icon="eva:arrow-ios-forward-fill" className="h-4 w-4 inline-flex shrink-0 " />}
		</>
	);

	const itemClassName = cn(
		"inline-flex w-full items-center rounded-md px-2 py-1.5 text-sm transition-all duration-300 ease-in-out text-text-primary! cursor-pointer",
		"hover:bg-action-hover!",
		item.active && "bg-primary/hover! hover:bg-primary/focus! text-primary!",
		item.disabled && "cursor-not-allowed hover:bg-transparent text-action-disabled!",
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
