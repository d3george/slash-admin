import type { NavGroupProps } from "../types";
import { NavList } from "./nav-list";

export function NavGroup({ items }: NavGroupProps) {
	return (
		<li>
			<ul className="flex flex-col gap-1">
				{items.map((item, index) => (
					<NavList key={item.title || index} data={item} depth={1} />
				))}
			</ul>
		</li>
	);
}
