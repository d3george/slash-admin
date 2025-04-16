import type { NavGroupProps } from "../types";
import { NavList } from "./nav-list";

export function NavGroup({ items }: NavGroupProps) {
	return (
		<li>
			<ul className="flex flex-row gap-1">
				{items.map((item) => (
					<NavList key={item.title} data={item} depth={1} />
				))}
			</ul>
		</li>
	);
}
