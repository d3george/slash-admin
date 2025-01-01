import { up, useMediaQuery } from "@/hooks";
import { useSettings } from "@/store/settingStore";
import { themeVars } from "@/theme/theme.css";
import { rgbAlpha } from "@/utils/theme";
import { type CSSProperties, useMemo } from "react";
import { ThemeLayout } from "#/enum";

import { HEADER_HEIGHT, MULTI_TABS_HEIGHT, NAV_COLLAPSED_WIDTH, NAV_HORIZONTAL_HEIGHT, NAV_WIDTH } from "../../config";

export function useMultiTabsStyle() {
	const { themeLayout } = useSettings();
	const isPc = useMediaQuery(up("md"));

	return useMemo(() => {
		const style: CSSProperties = {
			position: "fixed",
			top: HEADER_HEIGHT,
			right: 0,
			height: MULTI_TABS_HEIGHT,
			backgroundColor: rgbAlpha(themeVars.colors.background.defaultChannel, 0.9),
			transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
			width: "100%",
		};

		if (themeLayout === ThemeLayout.Horizontal) {
			style.top = HEADER_HEIGHT + NAV_HORIZONTAL_HEIGHT - 2;
		} else if (isPc) {
			style.width = `calc(100% - ${themeLayout === ThemeLayout.Vertical ? NAV_WIDTH : NAV_COLLAPSED_WIDTH}px`;
		}

		return style;
	}, [themeLayout, isPc]);
}
