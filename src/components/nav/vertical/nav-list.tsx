import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/ui/collapsible";
import { useState } from "react";
import { useLocation } from "react-router";
import type { NavListProps } from "../types";
import { NavItem } from "./nav-item";

export function NavList({ data, currentRole, depth = 0, enabledRootRedirect = false }: NavListProps) {
	const location = useLocation();
	const [open, setOpen] = useState(false);
	const hasChild = data.children && data.children.length > 0;
	const isActive = location.pathname === data.path;

	const handleClick = () => {
		if (hasChild) {
			setOpen(!open);
		}
	};

	return (
		<Collapsible open={open} onOpenChange={setOpen}>
			<CollapsibleTrigger className="w-full">
				<NavItem
					title={data.title}
					path={data.path}
					icon={data.icon}
					info={data.info}
					caption={data.caption}
					open={open}
					active={isActive}
					depth={depth}
					hasChild={hasChild}
					onClick={handleClick}
				/>
			</CollapsibleTrigger>
			{hasChild && (
				<CollapsibleContent>
					<div className="ml-4 mt-1 flex flex-col gap-1">
						{data.children?.map((child) => (
							<NavList
								key={child.title}
								data={child}
								currentRole={currentRole}
								depth={depth + 1}
								enabledRootRedirect={enabledRootRedirect}
							/>
						))}
					</div>
				</CollapsibleContent>
			)}
		</Collapsible>
	);
}
