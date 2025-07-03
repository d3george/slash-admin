import { themeVars } from "@/theme/theme.css";
import { removePx, rgbAlpha } from "@/utils/theme";
import type { ApexOptions } from "apexcharts";
import { mergeDeepRight } from "ramda";

import { useSettings } from "@/store/settingStore";
import { breakpointsTokens } from "@/theme/tokens/breakpoints";
import { paletteColors, presetsColors } from "@/theme/tokens/color";
import type { ThemeColorPresets, ThemeMode } from "@/types/enum";

export function useChart(options: ApexOptions) {
	const { themeColorPresets, themeMode } = useSettings();

	const baseOptions = baseCharOptions(themeMode, themeColorPresets) ?? {};
	return mergeDeepRight(baseOptions, options) as ApexOptions;
}

const baseCharOptions = (themeMode: ThemeMode, themeColorPresets: ThemeColorPresets): ApexOptions => {
	const LABEL_TOTAL = {
		show: true,
		label: "Total",
		color: themeVars.colors.text.secondary,
		fontSize: themeVars.typography.fontSize.sm,
		lineHeight: themeVars.typography.lineHeight.tight,
	};

	const LABEL_VALUE = {
		offsetY: 8,
		color: themeVars.colors.text.primary,
		fontSize: themeVars.typography.fontSize.sm,
		lineHeight: themeVars.typography.lineHeight.tight,
	};
	return {
		// Colors
		colors: [
			presetsColors[themeColorPresets].default,
			paletteColors.info.default,
			paletteColors.warning.default,
			paletteColors.error.default,
			paletteColors.success.default,

			paletteColors.warning.dark,
			paletteColors.info.dark,
			paletteColors.error.dark,
			paletteColors.success.dark,
		],

		// Chart
		chart: {
			toolbar: { show: false },
			zoom: { enabled: false },
			parentHeightOffset: 0,
			foreColor: themeVars.colors.text.disabled,
			fontFamily: themeVars.typography.fontFamily.openSans,
			// 优化动画配置以提高响应式性能
			animations: {
				enabled: true,
				speed: 360,
				animateGradually: { enabled: true, delay: 120 },
				dynamicAnimation: { enabled: true, speed: 360 },
			},
			// 启用快速响应式重绘
			redrawOnParentResize: true,
			redrawOnWindowResize: true,
		},

		// States
		states: {
			hover: { filter: { type: "darken" } },
			active: { filter: { type: "darken" } },
		},

		// Fill
		fill: {
			opacity: 1,
			gradient: {
				type: "vertical",
				shadeIntensity: 0,
				opacityFrom: 0.4,
				opacityTo: 0,
				stops: [0, 100],
			},
		},

		// Datalabels
		dataLabels: {
			enabled: false,
		},

		// Stroke
		stroke: {
			width: 2.5,
			curve: "smooth",
			lineCap: "round",
		},

		// Grid
		grid: {
			strokeDashArray: 3,
			borderColor: themeVars.colors.background.neutral, // TODO: change to gray[500]
			padding: { top: 0, right: 0, bottom: 0 },
			xaxis: { lines: { show: false } },
		},

		// Xaxis
		xaxis: { axisBorder: { show: false }, axisTicks: { show: false } },
		yaxis: { tickAmount: 5 },

		// Markers
		markers: {
			size: 0,
			strokeColors: themeVars.colors.background.paper,
		},

		// Tooltip
		tooltip: { theme: themeMode, fillSeriesColor: false, x: { show: true } },

		// Legend
		legend: {
			show: false,
			fontSize: themeVars.typography.fontSize.sm,
			position: "top",
			horizontalAlign: "right",
			markers: { shape: "circle" },
			fontWeight: 500,
			itemMargin: { horizontal: 8, vertical: 8 },
			labels: { colors: themeVars.colors.text.primary },
		},

		// plotOptions
		plotOptions: {
			// Bar
			bar: { borderRadius: 4, columnWidth: "48%", borderRadiusApplication: "end" },

			// Pie + Donut
			pie: {
				donut: { labels: { show: true, value: { ...LABEL_VALUE }, total: { ...LABEL_TOTAL } } },
			},

			// Radialbar
			radialBar: {
				hollow: { margin: -8, size: "100%" },
				track: {
					margin: -8,
					strokeWidth: "50%",
					background: rgbAlpha(themeVars.colors.palette.gray[500], 0.5),
				},
				dataLabels: {
					value: { ...LABEL_VALUE },
					total: { ...LABEL_TOTAL },
				},
			},

			// Radar
			radar: {
				polygons: {
					fill: { colors: ["transparent"] },
					strokeColors: themeVars.colors.background.neutral,
					connectorColors: themeVars.colors.background.neutral,
				},
			},

			// polarArea
			polarArea: {
				rings: {
					strokeColor: themeVars.colors.background.neutral,
				},
				spokes: {
					connectorColors: themeVars.colors.background.neutral,
				},
			},
		},

		// Responsive
		responsive: [
			{
				// sm
				breakpoint: removePx(breakpointsTokens.sm),
				options: {
					plotOptions: { bar: { columnWidth: "80%", borderRadius: 3 } },
				},
			},
			{
				// md
				breakpoint: removePx(breakpointsTokens.md),
				options: {
					plotOptions: { bar: { columnWidth: "62%" } },
				},
			},
		],
	};
};
