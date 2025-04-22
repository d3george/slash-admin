import { cn } from "@/utils";
import type { NavProps } from "../types";
import { NavGroup } from "./nav-group";

export const NavMini = ({ data, className, ...props }: NavProps) => {
	return (
		<nav className={cn("flex flex-col w-20", className)} {...props}>
			<ul className="flex flex-col gap-1">
				{data.map((item, index) => (
					<NavGroup key={item.name || index} items={item.items} />
				))}
			</ul>
		</nav>
	);
};
