import { RouterLink } from "@/router/components/router-link";
import { TooltipContent } from "@/ui/tooltip";
import { Tooltip } from "@/ui/tooltip";
import { TooltipTrigger } from "@/ui/tooltip";
import { TooltipProvider } from "@/ui/tooltip";
import { cn } from "@/utils";
import { Icon } from "@iconify/react";
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
			<span className={cn("mr-3 inline-flex h-6 w-6 shrink-0 items-center justify-center")}>
				{icon && typeof icon === "string" ? <Icon icon={icon} /> : icon}
			</span>

			{/* Texts */}
			<span className="inline-flex flex-auto flex-col justify-center min-h-[24px]">
				{/* Title */}
				<span
					className="text-sm font-medium text-left leading-tight"
					style={{
						display: "-webkit-box",
						WebkitLineClamp: 1,
						WebkitBoxOrient: "vertical",
						overflow: "hidden",
						textOverflow: "ellipsis",
					}}
				>
					{title}
				</span>

				{/* Caption */}
				{caption && (
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span
									className="text-xs text-text-secondary text-left leading-tight"
									style={{
										display: "-webkit-box",
										WebkitLineClamp: 1,
										WebkitBoxOrient: "vertical",
										overflow: "hidden",
										textOverflow: "ellipsis",
									}}
								>
									{caption}
								</span>
							</TooltipTrigger>
							<TooltipContent side="top" align="start">
								{caption}
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				)}
			</span>

			{/* Info */}
			{info && <span className="mx-1.5 inline-flex shrink-0 items-center">{info}</span>}

			{/* Arrow */}
			{hasChild && (
				<Icon
					icon="eva:arrow-ios-forward-fill"
					className="h-4 w-4 inline-flex shrink-0 transition-all duration-300 ease-in-out"
					style={{
						transform: open ? "rotate(90deg)" : "rotate(0deg)",
					}}
				/>
			)}
		</>
	);

	const itemClassName = cn(
		"inline-flex w-full items-center rounded-md px-2 py-1.5 text-sm transition-all duration-300 ease-in-out text-text-primary! cursor-pointer",
		"hover:bg-action-hover!",
		active && "bg-primary/hover! text-primary!",
		disabled && "cursor-not-allowed hover:g-transparent text-action-disabled!",
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
