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
// 辅助函数：根据路径查找权限要求
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
	// 获取当前path 对应的权限
	const { pathname } = useLocation();
	const currentNavAuth = findAuthByPath(pathname);

	return (
		<main
			data-slot="slash-layout-main"
			className={cn("flex w-full grow bg-background", {
				"h-[calc(100vh-var(--layout-header-height))]": themeLayout !== ThemeLayout.Horizontal,
				"h-[calc(100vh-var(--layout-header-height)-var(--layout-nav-height-horizontal)-10px)]": themeLayout === ThemeLayout.Horizontal,
			})}
		>
			<ScrollArea
				className={cn("p-2 w-full  mx-auto transition-all duration-300 ease-in-out", {
					"xl:max-w-screen-xl": !themeStretch,
				})}
			>
				<AuthGuard checkAny={currentNavAuth} fallback={<Page403 />}>
					<Suspense fallback={<LineLoading />}>
						<Outlet />
					</Suspense>
				</AuthGuard>
			</ScrollArea>
		</main>
	);
};

export default Main;
