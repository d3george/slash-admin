import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/ui/hover-card";
import { useLocation } from "react-router";
import type { NavListProps } from "../types";
import { NavRootItem } from "./nav-root-item";
import { NavSubItem } from "./nav-sub-item";

export function NavList({ data, depth = 0 }: NavListProps) {
	const hasChild = data.children && data.children.length > 0;
	const location = useLocation();
	const isActive = location.pathname.includes(data.path);

	const renderRootNavItem = () => {
		return (
			<NavRootItem
				key={data.title}
				// data
				path={data.path}
				title={data.title}
				caption={data.caption}
				info={data.info}
				icon={data.icon}
				// state
				disabled={data.disabled}
				active={isActive}
				// options
				hasChild={hasChild}
				depth={depth}
			/>
		);
	};

	const renderSubNavItem = () => {
		return (
			<NavSubItem
				key={data.title}
				// data
				path={data.path}
				title={data.title}
				caption={data.caption}
				info={data.info}
				icon={data.icon}
				// state
				disabled={data.disabled}
				active={isActive}
				// options
				hasChild={hasChild}
				depth={depth}
			/>
		);
	};

	const renderNavItem = () => (depth === 1 ? renderRootNavItem() : renderSubNavItem());

	const renderRootItemWithHoverCard = () => {
		return (
			<HoverCard openDelay={100}>
				<HoverCardTrigger>{renderNavItem()}</HoverCardTrigger>
				<HoverCardContent side="right" sideOffset={10} className="p-1">
					{data.children?.map((child) => (
						<NavList key={child.title} data={child} depth={depth + 1} />
					))}
				</HoverCardContent>
			</HoverCard>
		);
	};

	return <li className="list-none">{hasChild ? renderRootItemWithHoverCard() : renderNavItem()}</li>;
}
