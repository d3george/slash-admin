import { Iconify } from "@/components/icon";
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
			<span className="mr-3 inline-flex h-6 w-6 shrink-0 items-center justify-center">
				{icon && typeof icon === "string" ? <Iconify icon={icon} className="h-6 w-6" /> : icon}
			</span>

			{/* Texts: Title, Caption */}
			<span className="inline-flex flex-auto flex-col">
				<span
					className="text-sm font-medium text-left"
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
				{caption && (
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span
									className="text-xs text-text-secondary text-left"
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
			{info && <span className="mx-1.5 inline-flex shrink-0">{info}</span>}

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
		"inline-flex w-full items-center rounded-md px-2 py-1.5 text-sm transition-colors",
		"hover:bg-action-hover",
		active && "bg-action-active text-action-active",
		disabled && "pointer-events-none opacity-50",
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

	return (
		<div className={itemClassName} onClick={onClick}>
			{content}
		</div>
	);
}
