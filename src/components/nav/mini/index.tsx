import { cn } from "@/utils";
import { useState } from "react";
import { useLocation } from "react-router";
import type { NavProps } from "../types";
import { NavMiniRootItem } from "./nav-root-item";

export const NavMini = ({ data, className, ...props }: NavProps) => {
	const [open, setOpen] = useState(false);
	const location = useLocation();

	return (
		<nav className={cn("flex flex-col", className)} {...props}>
			{data.map((item) => (
				<ul key={item.name} className="w-full flex flex-col">
					{item.items.map((item) => (
						<NavMiniRootItem
							key={item.title}
							// data
							path={item.path}
							title={item.title}
							caption={item.caption}
							info={item.info}
							icon={item.icon}
							// state
							open={open}
							disabled={item.disabled}
							active={location.pathname === item.path}
							// options
							hasChild={item.children && item.children.length > 0}
							// event
							onClick={() => setOpen(!open)}
						/>
					))}
				</ul>
			))}
		</nav>
	);
};
