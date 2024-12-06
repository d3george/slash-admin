import { Content } from "antd/es/layout/layout";
import { type CSSProperties, forwardRef } from "react";
import { Outlet } from "react-router";

import { useSettings } from "@/store/settingStore";
import { useThemeToken } from "@/theme/hooks";
import { cn } from "@/utils";

import { MULTI_TABS_HEIGHT } from "./config";
import MultiTabs from "./multi-tabs";
import { MultiTabsProvider } from "./multi-tabs/multi-tabs-provider";

import { ThemeLayout } from "#/enum";

type Props = {
	offsetTop?: boolean;
};
const Main = forwardRef<HTMLDivElement, Props>(({ offsetTop = false }, ref) => {
	const { themeStretch, themeLayout, multiTab } = useSettings();
	const { colorBgElevated } = useThemeToken();

	const mainStyle: CSSProperties = {
		background: colorBgElevated,
		width: "100%",
		paddingTop:
			themeLayout === ThemeLayout.Horizontal && multiTab
				? MULTI_TABS_HEIGHT
				: 0,
	};

	return (
		<Content ref={ref} style={mainStyle} className="flex overflow-auto">
			<div
				className={cn(
					"m-auto h-full w-full flex-grow sm:p-2",
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
		</Content>
	);
});

export default Main;
