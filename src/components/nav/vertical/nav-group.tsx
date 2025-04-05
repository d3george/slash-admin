import type { NavGroupProps } from "../types";
import { NavList } from "./nav-list";

export function NavGroup({ name, items, currentRole, ...props }: NavGroupProps) {
	return (
		<div className="flex w-full flex-col gap-1" {...props}>
			{name && <div className="px-2 py-1 text-xs font-medium text-muted-foreground">{name}</div>}
			<ul className="flex w-full flex-col gap-1">
				{items.map((item, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<NavList key={index} data={item} currentRole={currentRole} />
				))}
			</ul>
		</div>
	);
}
