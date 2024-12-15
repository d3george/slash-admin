import { type CSSProperties, useMemo } from "react";
import { useThemeToken } from "@/theme/hooks";
import Color from "color";
import { ThemeLayout } from "#/enum";
import { useSettings } from "@/store/settingStore";
import { useResponsive } from "@/theme/hooks";
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
			position: "fixed" as const,
			top: offsetTop ? OFFSET_HEADER_HEIGHT - 2 : HEADER_HEIGHT,
			left: 0,
			height: MULTI_TABS_HEIGHT,
			backgroundColor: Color(colorBgElevated).alpha(1).toString(),
			transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
			width: "100%",
		};

		if (themeLayout === ThemeLayout.Horizontal) {
			style.top = HEADER_HEIGHT + NAV_HORIZONTAL_HEIGHT - 2;
		} else if (screenMap.md) {
			style.right = "0px";
			style.left = "auto";
			style.width = `calc(100% - ${
				themeLayout === ThemeLayout.Vertical ? NAV_WIDTH : NAV_COLLAPSED_WIDTH
			}px`;
		}

		return style;
	}, [themeLayout, colorBgElevated, offsetTop, screenMap.md]);
}
