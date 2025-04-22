import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/ui/collapsible";
import { cn } from "@/utils";
import { Icon } from "@iconify/react";
import { useState } from "react";
import type { NavGroupProps } from "../types";
import { NavList } from "./nav-list";

export function NavGroup({ name, items, ...props }: NavGroupProps) {
	const [open, setOpen] = useState(true);
	return (
		<div className="flex w-full flex-col gap-1" {...props}>
			<Collapsible open={open} onOpenChange={setOpen}>
				<CollapsibleTrigger asChild>
					<Group name={name} open={open} />
				</CollapsibleTrigger>
				<CollapsibleContent>
					<ul className="flex w-full flex-col gap-1">
						{items.map((item, index) => (
							<NavList key={item.title || index} data={item} depth={1} />
						))}
					</ul>
				</CollapsibleContent>
			</Collapsible>
		</div>
	);
}

function Group({ name, open }: { name?: string; open: boolean }) {
	return (
		name && (
			<div
				className={cn(
					"group inline-flex items-center justify-start relative gap-2 cursor-pointer pt-4 pr-2 pb-2 pl-3 transition-all duration-300 ease-in-out",
					"hover:pl-4",
				)}
			>
				<Icon
					icon="eva:arrow-ios-forward-fill"
					className={cn(
						"absolute left-[-4px] h-4 w-4 inline-flex shrink-0 transition-all duration-300 ease-in-out",
						"opacity-0 group-hover:opacity-100",
						{
							"rotate-90": open,
						},
					)}
				/>

				<span
					className={cn(
						"text-xs font-medium transition-all duration-300 ease-in-out text-text-disabled",
						"hover:text-text-primary",
					)}
				>
					{name.toUpperCase()}
				</span>
			</div>
		)
	);
}
