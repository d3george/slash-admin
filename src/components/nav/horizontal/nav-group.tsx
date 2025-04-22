import type { NavGroupProps } from "../types";
import { NavList } from "./nav-list";

export function NavGroup({ items }: NavGroupProps) {
	return (
		<li className="flex items-center">
			<ul className="flex flex-row gap-1">
				{items.map((item) => (
					<NavList key={item.title} data={item} depth={1} />
				))}
			</ul>
		</li>
	);
}
