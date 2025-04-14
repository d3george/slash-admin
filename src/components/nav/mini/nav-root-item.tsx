import { RouterLink } from "@/router/components/router-link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/ui/tooltip";
import { cn } from "@/utils";
import { Icon } from "@iconify/react";
import type { NavItemProps } from "../types";

export const NavRootItem = (item: NavItemProps) => {
	const content = (
		<>
			<div className="relative w-full min-h-12 inline-flex flex-col items-center px-1 pt-2 pb-1.5">
				{/* Caption */}
				{item.caption && (
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Icon icon="solar:info-circle-linear" className="absolute left-[6px] top-[10px] h-4 w-4" />
							</TooltipTrigger>
							<TooltipContent side="right">
								<p>{item.caption}</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				)}

				{/* Icon */}
				<span className="h-5 w-5 mb-1 flex items-center justify-center">
					{item.icon && typeof item.icon === "string" ? <Icon icon={item.icon} /> : item.icon}
				</span>

				{/* Arrow */}
				{item.hasChild && (
					<Icon
						icon="eva:arrow-ios-forward-fill"
						className="absolute right-[6px] top-[10px] h-4 w-4"
						style={{
							transform: item.open ? "rotate(90deg)" : "rotate(0deg)",
						}}
					/>
				)}

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
			</div>
		</>
	);

	const itemClassName = cn(
		"w-full flex flex-col items-center cursor-pointer rounded-md text-text-primary! transition-all duration-300 ease-in-out",
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
