import { themeVars } from "@/theme/theme.css";
import { rgbAlpha } from "@/utils/theme";
import { globalStyle } from "@vanilla-extract/css";
import { style } from "@vanilla-extract/css";

export const chartWrapper = style({}, "apexcharts-wrapper");

// TOOLTIP
globalStyle(`${chartWrapper} .apexcharts-tooltip`, {
	color: themeVars.colors.text.primary,
	borderRadius: themeVars.borderRadius.lg,
	backdropFilter: "blur(6px)",
	backgroundColor: rgbAlpha(themeVars.colors.background.paperChannel, 0.8),
	boxShadow: themeVars.shadows.card,
});

globalStyle(`${chartWrapper} .apexcharts-tooltip-title`, {
	textAlign: "center",
	fontWeight: "bold",
	backgroundColor: themeVars.colors.background.neutral,
});

// TOOLTIP X
globalStyle(`${chartWrapper} .apexcharts-xaxistooltip`, {
	color: themeVars.colors.text.primary,
	borderRadius: themeVars.borderRadius.lg,
	backdropFilter: "blur(6px)",
	borderColor: "transparent",
	boxShadow: themeVars.shadows.card,
	backgroundColor: themeVars.colors.background.paper,
});

globalStyle(`${chartWrapper} .apexcharts-xaxistooltip::before`, {
	borderBottomColor: rgbAlpha(themeVars.colors.background.paperChannel, 0.8),
});

globalStyle(`${chartWrapper} .apexcharts-xaxistooltip::after`, {
	borderBottomColor: themeVars.colors.background.paper,
});

// LEGEND
globalStyle(`${chartWrapper} .apexcharts-legend`, {
	padding: 0,
});

globalStyle(`${chartWrapper} .apexcharts-legend-series`, {
	display: "inline-flex !important",
	alignItems: "center",
});

globalStyle(`${chartWrapper} .apexcharts-legend-text`, {
	lineHeight: "18px",
	textTransform: "capitalize",
});
