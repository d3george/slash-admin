import { cn } from "@/utils";
import type { NavProps } from "../types";
import { NavGroup } from "./nav-group";

export function NavVertical({ data, currentRole, className, ...props }: NavProps) {
	return (
		<nav className={cn("flex w-full flex-col gap-1", className)} {...props}>
			{data.map((group) => (
				<NavGroup key={group.name} name={group.name} items={group.items} currentRole={currentRole} />
			))}
		</nav>
	);
}
