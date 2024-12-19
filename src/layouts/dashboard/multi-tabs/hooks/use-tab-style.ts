import { useSettings } from "@/store/settingStore";
import { useThemeToken } from "@/theme/hooks";
import { useResponsive } from "@/theme/hooks";
import Color from "color";
import { type CSSProperties, useMemo } from "react";
import { ThemeLayout } from "#/enum";
import {
	HEADER_HEIGHT,
	MULTI_TABS_HEIGHT,
	NAV_COLLAPSED_WIDTH,
	NAV_HORIZONTAL_HEIGHT,
	NAV_WIDTH,
	OFFSET_HEADER_HEIGHT,
} from "../../config";

export function useMultiTabsStyle(offsetTop: boolean) {
	const { themeLayout } = useSettings();
	const { colorBgElevated } = useThemeToken();
	const { screenMap } = useResponsive();

	return useMemo(() => {
		const style: CSSProperties = {
			position: "fixed",
			top: offsetTop ? OFFSET_HEADER_HEIGHT - 2 : HEADER_HEIGHT,
			right: 0,
			height: MULTI_TABS_HEIGHT,
			backgroundColor: Color(colorBgElevated).alpha(1).toString(),
			transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
			width: "100%",
		};

		if (themeLayout === ThemeLayout.Horizontal) {
			style.top = HEADER_HEIGHT + NAV_HORIZONTAL_HEIGHT - 2;
		} else if (screenMap.md) {
			style.width = `calc(100% - ${
				themeLayout === ThemeLayout.Vertical ? NAV_WIDTH : NAV_COLLAPSED_WIDTH
			}px`;
		}

		return style;
	}, [themeLayout, colorBgElevated, offsetTop, screenMap.md]);
}
