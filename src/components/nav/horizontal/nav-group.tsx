import type { NavGroupProps } from "../types";
import { NavList } from "./nav-list";

export function NavGroup({ items }: NavGroupProps) {
	return (
		<li className="flex items-center">
			<ul className="flex flex-row gap-1">
				{items.map((item, index) => (
					<NavList key={item.title || index} data={item} depth={1} />
				))}
			</ul>
		</li>
	);
}
