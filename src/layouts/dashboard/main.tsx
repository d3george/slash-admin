import { useSettings } from "@/store/settingStore";
import { themeVars } from "@/theme/theme.css";
import { cn } from "@/utils";
import { Content } from "antd/es/layout/layout";
import { type CSSProperties, forwardRef } from "react";
import { Outlet } from "react-router";
import { ThemeLayout } from "#/enum";
import { MULTI_TABS_HEIGHT } from "./config";
import MultiTabs from "./multi-tabs";
import { MultiTabsProvider } from "./multi-tabs/providers/multi-tabs-provider";

type Props = {
	offsetTop?: boolean;
};
const Main = forwardRef<HTMLDivElement, Props>(({ offsetTop = false }, ref) => {
	const { themeStretch, themeLayout, multiTab } = useSettings();

	const mainStyle: CSSProperties = {
		paddingTop: multiTab ? MULTI_TABS_HEIGHT : 0,
		background: themeVars.colors.background.default,
		transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
		width: "100%",
	};

	return (
		<Content style={mainStyle} className="flex">
			<div className="flex-grow overflow-auto size-full" ref={ref}>
				<div
					className={cn(
						"m-auto size-full flex-grow sm:p-2",
						themeStretch ? "" : "xl:max-w-screen-xl",
						themeLayout === ThemeLayout.Horizontal ? "flex-col" : "flex-row",
					)}
				>
					{multiTab ? (
						<MultiTabsProvider>
							<MultiTabs offsetTop={offsetTop} />
						</MultiTabsProvider>
					) : (
						<Outlet />
					)}
				</div>
			</div>
		</Content>
	);
});

export default Main;
