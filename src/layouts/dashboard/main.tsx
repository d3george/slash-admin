import { AuthGuard } from "@/components/auth/auth-guard";
import { LineLoading } from "@/components/loading";
import { GLOBAL_CONFIG } from "@/global-config";
import Page403 from "@/pages/sys/error/Page403";
import { useSettings } from "@/store/settingStore";
import { ScrollArea } from "@/ui/scroll-area";
import { cn } from "@/utils";
import { flattenTrees } from "@/utils/tree";
import { clone, concat } from "ramda";
import { Suspense } from "react";
import { Outlet, useLocation } from "react-router";
import { backendNavData } from "./nav/nav-data/nav-data-backend";
import { frontendNavData } from "./nav/nav-data/nav-data-frontend";

/**
 * find auth by path
 * @param path
 * @returns
 */
function findAuthByPath(path: string): string[] {
	const foundItem = allItems.find((item) => item.path === path);
	return foundItem?.auth || [];
}

const navData = GLOBAL_CONFIG.routerMode === "frontend" ? clone(frontendNavData) : backendNavData;
const allItems = navData.reduce((acc: any[], group) => {
	const flattenedItems = flattenTrees(group.items);
	return concat(acc, flattenedItems);
}, []);

const Main = () => {
	const { themeStretch } = useSettings();

	const { pathname } = useLocation();
	const currentNavAuth = findAuthByPath(pathname);

	return (
		<ScrollArea className={cn("flex w-full grow")} type="auto">
			<AuthGuard checkAny={currentNavAuth} fallback={<Page403 />}>
				<main
					data-slot="slash-layout-main"
					className={cn("w-full h-full mx-auto p-2", {
						"xl:max-w-screen-xl": !themeStretch,
					})}
				>
					<Suspense fallback={<LineLoading />}>
						<Outlet />
					</Suspense>
				</main>
			</AuthGuard>
		</ScrollArea>
	);
};

export default Main;
