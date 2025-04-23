import { Icon } from "@/components/icon";
import Logo from "@/components/logo";
import { NavHorizontal, NavMini, NavVertical } from "@/components/nav";
import { down, useMediaQuery } from "@/hooks";
import { useRouteToMenu_V1 } from "@/router/hooks";
import { usePermissionRoutes } from "@/router/hooks";
import { menuFilter } from "@/router/utils";
import { useSettings } from "@/store/settingStore";
import { Button } from "@/ui/button";
import { ScrollArea, ScrollBar } from "@/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/ui/sheet";
import { cn } from "@/utils";
import { useMemo } from "react";
import { ThemeLayout } from "#/enum";
import NavLogo from "./nav-logo";

export default function NavBar({ className }: { className?: string }) {
	const settings = useSettings();
	const { themeLayout } = settings;

	const routeToMenuFn = useRouteToMenu_V1();
	const permissionRoutes = usePermissionRoutes();

	const menuList = useMemo(() => {
		const menuRoutes = menuFilter(permissionRoutes);
		const result = routeToMenuFn(menuRoutes);

		return [
			{
				items: result,
			},
		];
	}, [routeToMenuFn, permissionRoutes]);

	const isMobile = useMediaQuery(down("md"));

	if (isMobile)
		return (
			<Sheet modal={false}>
				<SheetTrigger asChild>
					<Button variant="ghost" size="icon">
						<Icon icon="local:ic-menu" size={24} />
					</Button>
				</SheetTrigger>
				<SheetContent side="left" className="[&>button]:hidden px-2">
					<div className="flex gap-2 px-2 h-[var(--layout-header-height)] items-center">
						<Logo />
						<span className="text-xl font-bold text-primary">Slash Admin</span>
					</div>
					<ScrollArea className="h-full">
						<NavVertical data={menuList} />
					</ScrollArea>
				</SheetContent>
			</Sheet>
		);
	if (themeLayout === ThemeLayout.Horizontal)
		return (
			<nav data-slot="slash-layout-nav" className={cn("w-screen bg-background z-app-bar", className)}>
				<ScrollArea className="min-w-screen whitespace-nowrap px-2">
					<NavHorizontal data={menuList} />
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
			</nav>
		);

	return (
		<nav
			data-slot="slash-layout-nav"
			className={cn(
				"hidden md:block fixed inset-y-0 left-0 flex-col h-full border-r border-dashed",
				"transition-[width, height] delay-0 duration-200 ease-in-out",
				className,
			)}
		>
			<NavLogo />

			<ScrollArea
				className={cn("h-[calc(100vh-var(--layout-header-height))] px-2", {
					"w-[var(--layout-nav-width)]": themeLayout === ThemeLayout.Vertical,
					"w-[var(--layout-nav-width-mini)]": themeLayout === ThemeLayout.Mini,
				})}
			>
				{themeLayout === ThemeLayout.Vertical ? <NavVertical data={menuList} /> : <NavMini data={menuList} />}
			</ScrollArea>
		</nav>
	);
}
