import { useFlattenedRoutes, usePermissionRoutes } from "@/router/hooks";
import { menuFilter } from "@/router/utils";
import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/ui/breadcrumb";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import * as React from "react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useMatches } from "react-router";

interface BreadCrumbProps {
	maxItems?: number;
}

export default function BreadCrumb({ maxItems = 2 }: BreadCrumbProps) {
	const { t } = useTranslation();
	const matches = useMatches();
	const flattenedRoutes = useFlattenedRoutes();
	const permissionRoutes = usePermissionRoutes();

	const breadCrumbs = useMemo(() => {
		const menuRoutes = menuFilter(permissionRoutes);
		const paths = matches.filter((item) => item.pathname !== "/").map((item) => item.pathname);
		const pathRouteMetas = flattenedRoutes.filter((item) => paths.includes(item.key));
		let currentMenuItems = [...menuRoutes];

		return pathRouteMetas.map((routeMeta) => {
			const { key, label } = routeMeta;
			const currentRoute = currentMenuItems.find((item) => item.meta?.key === key);
			currentMenuItems = currentRoute?.children?.filter((item) => !item.meta?.hideMenu) ?? [];

			return {
				key,
				label: t(label),
				items: currentMenuItems.map((item) => ({
					key: item.meta?.key,
					label: item.meta?.label ? t(item.meta.label) : null,
				})),
			};
		});
	}, [matches, flattenedRoutes, t, permissionRoutes]);

	const renderBreadcrumbItem = (item: (typeof breadCrumbs)[0], isLast: boolean) => {
		const hasItems = item.items && item.items.length > 0;

		if (hasItems) {
			return (
				<BreadcrumbItem>
					<DropdownMenu>
						<DropdownMenuTrigger className="flex items-center gap-1">
							{item.label}
							<ChevronDown className="h-4 w-4" />
						</DropdownMenuTrigger>
						<DropdownMenuContent align="start">
							{item.items.map((subItem) => (
								<DropdownMenuItem key={subItem.key} asChild>
									<Link to={subItem.key ?? ""}>{subItem.label}</Link>
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				</BreadcrumbItem>
			);
		}

		return (
			<BreadcrumbItem>
				{isLast ? (
					<BreadcrumbPage>{item.label}</BreadcrumbPage>
				) : (
					<BreadcrumbLink asChild>
						<Link to={item.key}>{item.label}</Link>
					</BreadcrumbLink>
				)}
			</BreadcrumbItem>
		);
	};

	const renderBreadcrumbs = () => {
		if (breadCrumbs.length <= maxItems) {
			return breadCrumbs.map((item, index) => (
				<React.Fragment key={item.key}>
					{renderBreadcrumbItem(item, index === breadCrumbs.length - 1)}
					{index < breadCrumbs.length - 1 && <BreadcrumbSeparator />}
				</React.Fragment>
			));
		}

		// Show first item, ellipsis, and last maxItems-1 items
		const firstItem = breadCrumbs[0];
		const lastItems = breadCrumbs.slice(-(maxItems - 1));
		const hiddenItems = breadCrumbs.slice(1, -(maxItems - 1));

		return (
			<>
				{renderBreadcrumbItem(firstItem, false)}
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<DropdownMenu>
						<DropdownMenuTrigger className="flex items-center gap-1">
							<BreadcrumbEllipsis />
						</DropdownMenuTrigger>
						<DropdownMenuContent align="start">
							{hiddenItems.map((item) => (
								<DropdownMenuItem key={item.key} asChild>
									<Link to={item.key}>{item.label}</Link>
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				{lastItems.map((item, index) => (
					<React.Fragment key={item.key}>
						{renderBreadcrumbItem(item, index === lastItems.length - 1)}
						{index < lastItems.length - 1 && <BreadcrumbSeparator />}
					</React.Fragment>
				))}
			</>
		);
	};

	return (
		<Breadcrumb>
			<BreadcrumbList>{renderBreadcrumbs()}</BreadcrumbList>
		</Breadcrumb>
	);
}
