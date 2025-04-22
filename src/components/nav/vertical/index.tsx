import { cn } from "@/utils";
import type { NavProps } from "../types";
import { NavGroup } from "./nav-group";

export function NavVertical({ data, className, ...props }: NavProps) {
	return (
		<nav className={cn("flex w-full flex-col gap-1 px-4", className)} {...props}>
			{data.map((group, index) => (
				<NavGroup key={group.name || index} name={group.name} items={group.items} />
			))}
		</nav>
	);
}
