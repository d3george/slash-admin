import { Content } from "antd/es/layout/layout";
import { type CSSProperties, useRef } from "react";
import { Outlet } from "react-router";

import { useSettings } from "@/store/settingStore";
import { useResponsive, useThemeToken } from "@/theme/hooks";
import { cn } from "@/utils";

import {
	HEADER_HEIGHT,
	LAYOUT_TRANSITION,
	MULTI_TABS_HEIGHT,
	NAV_COLLAPSED_WIDTH,
	NAV_WIDTH,
	OFFSET_HEADER_HEIGHT,
	SCROLL_THRESHOLD,
} from "./config";
import MultiTabs from "./multi-tabs";
import { MultiTabsProvider } from "./multi-tabs/multi-tabs-provider";

import { useScroll } from "framer-motion";
import { useMount, useUnmount } from "react-use";
import { ThemeLayout } from "#/enum";
import { useScrollTop } from "./scroll-context";

const Main = () => {
	const { themeStretch, themeLayout, multiTab } = useSettings();
	const { colorBgElevated } = useThemeToken();
	const { screenMap } = useResponsive();

	const scrollEle = useRef<HTMLDivElement>(null);
	const { scrollY } = useScroll({ container: scrollEle });
	const { offsetTop, setOffsetTop } = useScrollTop();

	useMount(() => {
		scrollY.on("change", (scrollHeight) => {
			setOffsetTop(scrollHeight > SCROLL_THRESHOLD);
		});
	});
	useUnmount(() => {
		scrollY.destroy();
	});

	const mainStyle: CSSProperties = {
		paddingTop:
			(offsetTop ? OFFSET_HEADER_HEIGHT : HEADER_HEIGHT) +
			(multiTab ? MULTI_TABS_HEIGHT : 0),
		background: colorBgElevated,
		transition: `padding-top ${LAYOUT_TRANSITION}`,
		width: "100%",
	};
	if (themeLayout === ThemeLayout.Horizontal) {
		mainStyle.width = "100vw";
		mainStyle.paddingTop = multiTab ? MULTI_TABS_HEIGHT : 0;
	} else if (screenMap.md) {
		mainStyle.width = `calc(100% - ${
			themeLayout === ThemeLayout.Vertical ? NAV_WIDTH : NAV_COLLAPSED_WIDTH
		})`;
	} else {
		mainStyle.width = "100vw";
	}

	return (
		<Content style={mainStyle} className="flex overflow-hidden">
			<div className="flex-grow size-full overflow-auto" ref={scrollEle}>
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
			</div>
		</Content>
	);
};

export default Main;
