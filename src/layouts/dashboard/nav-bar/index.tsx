import { Icon } from "@/components/icon";
import Logo from "@/components/logo";
import { NavHorizontal, NavMini, NavVertical } from "@/components/nav";
import { down, useMediaQuery } from "@/hooks";
import { useRouteToMenu_V1 } from "@/router/hooks";
import { usePermissionRoutes } from "@/router/hooks";
import { menuFilter } from "@/router/utils";
import { useSettingActions, useSettings } from "@/store/settingStore";
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
	const { setSettings } = useSettingActions();

	const routeToMenuFn = useRouteToMenu_V1();
	const permissionRoutes = usePermissionRoutes();

	const collapsed = useMemo(() => themeLayout === ThemeLayout.Mini, [themeLayout]);

	const menuList = useMemo(() => {
		const menuRoutes = menuFilter(permissionRoutes);
		const result = routeToMenuFn(menuRoutes);

		return [
			{
				items: result,
			},
		];
	}, [routeToMenuFn, permissionRoutes]);

	const handleToggleCollapsed = () => {
		setSettings({
			...settings,
			themeLayout: collapsed ? ThemeLayout.Vertical : ThemeLayout.Mini,
		});
	};

	const isMobile = useMediaQuery(down("md"));

	if (isMobile)
		return (
			<Sheet modal={false}>
				<SheetTrigger asChild>
					<Button variant="ghost" size="icon">
						<Icon icon="local:ic-menu" size={24} />
					</Button>
				</SheetTrigger>
				<SheetContent side="left" className="[&>button]:hidden">
					<div className="flex gap-2 px-4 h-[var(--layout-header-height)] items-center">
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
			<nav data-slot="slash-layout-nav" className={cn("w-screen", className)}>
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
				"hidden md:block fixed inset-y-0 left-0 flex-col h-full z-app-bar border-r border-dashed",
				"transition-[width, height] duration-300 ease-in-out",
				className,
			)}
		>
			<NavLogo collapsed={collapsed} onToggle={handleToggleCollapsed} />

			<ScrollArea
				className={cn("h-[calc(100vh-var(--layout-header-height))]", {
					"w-[var(--layout-nav-width)]": themeLayout === ThemeLayout.Vertical,
					"w-[var(--layout-nav-width-mini)]": themeLayout === ThemeLayout.Mini,
				})}
			>
				{themeLayout === ThemeLayout.Vertical ? <NavVertical data={menuList} /> : <NavMini data={menuList} />}
			</ScrollArea>
		</nav>
	);
}
