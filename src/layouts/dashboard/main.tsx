import { useSettings } from "@/store/settingStore";
import { ScrollArea } from "@/ui/scroll-area";
import { cn } from "@/utils";
import { Outlet } from "react-router";
import { ThemeLayout } from "#/enum";
import MultiTabs from "./multi-tabs";
import { MultiTabsProvider } from "./multi-tabs/providers/multi-tabs-provider";

const Main = () => {
	const { themeStretch, themeLayout, multiTab } = useSettings();

	return (
		<main
			data-slot="slash-layout-main"
			className={cn("flex w-full transition-[width, height] duration-200 ease-in-out", {
				"md:pt-[var(--layout-multi-tabs-height)]": multiTab,
			})}
		>
			<ScrollArea
				className={cn(
					"size-full p-2",
					themeStretch ? "" : "xl:max-w-(--breakpoint-xl)",
					themeLayout === ThemeLayout.Horizontal ? "flex-col" : "flex-row",
				)}
			>
				{multiTab ? (
					<MultiTabsProvider>
						<MultiTabs />
					</MultiTabsProvider>
				) : (
					<Outlet />
				)}
			</ScrollArea>
		</main>
	);
};

export default Main;
