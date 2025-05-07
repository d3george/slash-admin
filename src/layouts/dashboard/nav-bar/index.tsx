import { varFade } from "@/components/animate/variants/fade";
import { Icon } from "@/components/icon";
import Logo from "@/components/logo";
import { NavHorizontal, NavMini, NavVertical } from "@/components/nav";
import { down, useMediaQuery } from "@/hooks";
import { useRouteToMenu } from "@/router/hooks";
import { usePermissionRoutes } from "@/router/hooks";
import { menuFilter } from "@/router/utils";
import { useSettings } from "@/store/settingStore";
import { Button } from "@/ui/button";
import { ScrollArea, ScrollBar } from "@/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/ui/sheet";
import { cn } from "@/utils";
import { m } from "motion/react";
import { useMemo } from "react";
import { ThemeLayout } from "#/enum";

interface Props {
	className?: string;
}

export default function NavBar({ className }: Props) {
	const { themeLayout } = useSettings();

	const routeToMenuFn = useRouteToMenu();
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
				<ScrollArea className="min-w-screen whitespace-nowrap px-2 bg-background">
					<NavHorizontal data={menuList} />
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
			</nav>
		);

	// Vertical and Mini
	return (
		<nav
			data-slot="slash-layout-nav"
			className={cn(
				"hidden md:block fixed inset-y-0 left-0 flex-col h-full bg-background border-r border-dashed",
				className,
			)}
		>
			<div
				className={cn("relative flex items-center py-4 px-2 h-[var(--layout-header-height)]", {
					"justify-center": themeLayout === ThemeLayout.Mini,
				})}
			>
				<div className="flex items-center gap-2">
					<Logo />
					{themeLayout !== ThemeLayout.Mini && (
						<m.span className="text-xl font-bold text-primary" variants={varFade().in}>
							Slash Admin
						</m.span>
					)}
				</div>
			</div>

			<ScrollArea
				className={cn("h-[calc(100vh-var(--layout-header-height))] px-2 bg-background", {
					"w-[var(--layout-nav-width)]": themeLayout === ThemeLayout.Vertical,
					"w-[var(--layout-nav-width-mini)]": themeLayout === ThemeLayout.Mini,
				})}
			>
				<m.div
					key={themeLayout}
					variants={varFade().in}
					initial="initial"
					animate="animate"
					exit="exit"
					transition={{ duration: 0.2 }}
				>
					{themeLayout === ThemeLayout.Vertical ? <NavVertical data={menuList} /> : <NavMini data={menuList} />}
				</m.div>
			</ScrollArea>
		</nav>
	);
}
