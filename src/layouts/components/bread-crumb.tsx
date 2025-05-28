import type { NavItemDataProps } from "@/components/nav";
import { useFilteredNavData } from "@/layouts/dashboard/nav";
import useLocale from "@/locales/use-locale";
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/ui/breadcrumb";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import * as React from "react";
import { useCallback, useMemo } from "react";
import { Link, useMatches } from "react-router";

interface BreadCrumbProps {
	maxItems?: number;
}

type NavItem = Pick<NavItemDataProps, "path" | "title"> & {
	children?: NavItem[];
};

interface BreadcrumbItemData {
	key: string;
	label: string;
	items: Array<{
		key: string;
		label: string;
	}>;
}

export default function BreadCrumb({ maxItems = 3 }: BreadCrumbProps) {
	const { t } = useLocale();
	const matches = useMatches();
	const navData = useFilteredNavData();

	const findPathInNavData = useCallback((path: string, items: NavItem[]): NavItem[] => {
		for (const item of items) {
			if (item.path === path) {
				return [item];
			}
			if (item.children) {
				const found = findPathInNavData(path, item.children);
				if (found.length > 0) {
					return [item, ...found];
				}
			}
		}
		return [];
	}, []);

	const breadCrumbs = useMemo(() => {
		const paths = matches.filter((item) => item.pathname !== "/").map((item) => item.pathname);

		return paths
			.map((path) => {
				const navItems = navData.flatMap((section) => section.items);
				const pathItems = findPathInNavData(path, navItems);

				if (pathItems.length === 0) return null;

				const currentItem = pathItems[pathItems.length - 1];
				const children =
					currentItem.children?.map((child) => ({
						key: child.path,
						label: t(child.title),
					})) ?? [];

				return {
					key: currentItem.path,
					label: t(currentItem.title),
					items: children,
				};
			})
			.filter((item): item is BreadcrumbItemData => item !== null);
	}, [matches, t, findPathInNavData, navData]);

	const renderBreadcrumbItem = (item: BreadcrumbItemData, isLast: boolean) => {
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
									<Link to={subItem.key}>{subItem.label}</Link>
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
