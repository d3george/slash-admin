import { LineLoading } from "@/components/loading";
import { useSettings } from "@/store/settingStore";
import { ThemeLayout } from "@/types/enum";
import { ScrollArea } from "@/ui/scroll-area";
import { cn } from "@/utils";
import { Suspense } from "react";
import { Outlet } from "react-router";
import MultiTabs from "./multi-tabs";
import { MultiTabsProvider } from "./multi-tabs/providers/multi-tabs-provider";

const Main = () => {
	const { themeStretch, multiTab, themeLayout } = useSettings();

	return (
		<main
			data-slot="slash-layout-main"
			className={cn("flex w-full grow bg-background", {
				"h-[calc(100vh-var(--layout-header-height))]": themeLayout !== ThemeLayout.Horizontal,
				"h-[calc(100vh-var(--layout-header-height)-var(--layout-nav-height-horizontal)-10px)]": themeLayout === ThemeLayout.Horizontal,
				// "h-[calc(100vh-var(--layout-header-height)-var(--layout-multi-tabs-height))]": multiTab,
				"md:pt-[var(--layout-multi-tabs-height)]": multiTab,
			})}
		>
			<ScrollArea
				className={cn("p-2 w-full  mx-auto transition-all duration-300 ease-in-out", {
					"xl:max-w-screen-xl": !themeStretch,
				})}
			>
				{multiTab ? (
					<MultiTabsProvider>
						<MultiTabs />
					</MultiTabsProvider>
				) : (
					<Suspense fallback={<LineLoading />}>
						<Outlet />
					</Suspense>
				)}
			</ScrollArea>
		</main>
	);
};

export default Main;
