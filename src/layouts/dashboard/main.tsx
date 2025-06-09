import { AuthGuard } from "@/components/auth/auth-guard";
import { LineLoading } from "@/components/loading";
import Page403 from "@/pages/sys/error/Page403";
import { useSettings } from "@/store/settingStore";
import { ThemeLayout } from "@/types/enum";
import { ScrollArea } from "@/ui/scroll-area";
import { cn } from "@/utils";
import { flattenTrees } from "@/utils/tree";
import { clone, concat } from "ramda";
import { Suspense } from "react";
import { Outlet, useLocation } from "react-router";
import { backendNavData } from "./nav/nav-data/nav-data-backend";
import { frontendNavData } from "./nav/nav-data/nav-data-frontend";

const { VITE_APP_ROUTER_MODE: ROUTER_MODE } = import.meta.env;

/**
 * find auth by path
 * @param path
 * @returns
 */
function findAuthByPath(path: string): string[] {
	const foundItem = allItems.find((item) => item.path === path);
	return foundItem?.auth || [];
}

const navData = ROUTER_MODE === "frontend" ? clone(frontendNavData) : backendNavData;
const allItems = navData.reduce((acc: any[], group) => {
	const flattenedItems = flattenTrees(group.items);
	return concat(acc, flattenedItems);
}, []);

const Main = () => {
	const { themeStretch, themeLayout } = useSettings();

	const { pathname } = useLocation();
	const currentNavAuth = findAuthByPath(pathname);

	return (
		<ScrollArea
			data-slot="slash-layout-main"
			className={cn("flex w-full grow bg-background p-2", {
				"h-[calc(100vh-var(--layout-header-height))]": themeLayout !== ThemeLayout.Horizontal,
				"h-[calc(100vh-var(--layout-header-height)-var(--layout-nav-height-horizontal)-10px)]": themeLayout === ThemeLayout.Horizontal,
			})}
		>
			<Suspense fallback={<LineLoading />}>
				<AuthGuard checkAny={currentNavAuth} fallback={<Page403 />}>
					<main
						className={cn("w-full h-full mx-auto", {
							"xl:max-w-screen-xl": !themeStretch,
						})}
					>
						<Outlet />
					</main>
				</AuthGuard>
			</Suspense>
		</ScrollArea>
	);
};

export default Main;
