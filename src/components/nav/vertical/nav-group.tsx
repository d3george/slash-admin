import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/ui/collapsible";
import { cn } from "@/utils";
import { Icon } from "@iconify/react";
import { useState } from "react";
import type { NavGroupProps } from "../types";
import { NavList } from "./nav-list";

export function NavGroup({ name, items, currentRole, ...props }: NavGroupProps) {
	const [open, setOpen] = useState(true);
	const [isHovered, setIsHovered] = useState(false);
	return (
		<div className="flex w-full flex-col gap-1" {...props}>
			<Collapsible open={open} onOpenChange={setOpen}>
				<CollapsibleTrigger asChild>
					{name && (
						<div
							className={cn(
								"inline-flex items-center justify-start relative gap-2 cursor-pointer pt-4 pr-2 pb-2 pl-3 transition-all duration-300 ease-in-out",
								{
									"pl-4": isHovered,
								},
							)}
							onMouseEnter={() => setIsHovered(true)}
							onMouseLeave={() => setIsHovered(false)}
						>
							<Icon
								icon="eva:arrow-ios-forward-fill"
								className={cn(
									"absolute left-[-4px] h-4 w-4 inline-flex shrink-0 transition-all duration-300 ease-in-out",
									{
										"rotate-90": open,
										"opacity-0": !isHovered,
									},
								)}
							/>

							<span
								className={cn("text-xs font-medium transition-all duration-300 ease-in-out text-text-disabled", {
									"text-text-primary": isHovered,
								})}
							>
								{name.toUpperCase()}
							</span>
						</div>
					)}
				</CollapsibleTrigger>
				<CollapsibleContent>
					<ul className="flex w-full flex-col gap-1">
						{items.map((item) => (
							<NavList key={item.title} data={item} currentRole={currentRole} />
						))}
					</ul>
				</CollapsibleContent>
			</Collapsible>
		</div>
	);
}
