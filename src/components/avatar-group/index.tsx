import { Avatar, AvatarFallback } from "@/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/ui/tooltip";
import { cn } from "@/utils";
import * as React from "react";

interface AvatarGroupProps {
	children: React.ReactNode;
	max?: number;
	className?: string;
}

export function AvatarGroup({ children, max, className }: AvatarGroupProps) {
	const avatars = React.Children.toArray(children);
	const total = avatars.length;
	let displayAvatars = avatars;
	let extra = 0;
	let extraAvatars: React.ReactNode[] = [];

	if (typeof max === "number" && total > max) {
		displayAvatars = avatars.slice(0, max - 1);
		extra = total - (max - 1);
		extraAvatars = avatars.slice(max - 1);
	}

	return (
		<div className={cn("flex -space-x-3", className)}>
			{displayAvatars.map((child, idx) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
				<div key={idx} className="rounded-full ">
					{child}
				</div>
			))}
			{extra > 0 && (
				<Tooltip>
					<TooltipTrigger asChild>
						<div>
							<Avatar>
								<AvatarFallback className="bg-bg-neutral font-semibold">+{extra}</AvatarFallback>
							</Avatar>
						</div>
					</TooltipTrigger>
					<TooltipContent>
						<div className="flex gap-1">
							{extraAvatars.map((child, idx) => (
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								<div key={idx} className="rounded-full">
									{child}
								</div>
							))}
						</div>
					</TooltipContent>
				</Tooltip>
			)}
		</div>
	);
}
