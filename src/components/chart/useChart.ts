import { themeVars } from "@/theme/theme.css";
import { removePx } from "@/utils/theme";
import type { ApexOptions } from "apexcharts";
import { mergeDeepRight } from "ramda";

export default function useChart(options: ApexOptions) {
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

	const baseOptions: ApexOptions = {
		// Colors
		colors: [
			themeVars.colors.palette.primary.default,
			themeVars.colors.palette.warning.default,
			themeVars.colors.palette.info.default,
			themeVars.colors.palette.error.default,
			themeVars.colors.palette.success.default,
			themeVars.colors.palette.warning.lighter,
			themeVars.colors.palette.success.lighter,
			themeVars.colors.palette.info.lighter,
			themeVars.colors.palette.error.lighter,
		],

		// Chart
		chart: {
			toolbar: { show: false },
			zoom: { enabled: false },
			foreColor: themeVars.colors.text.disabled,
			fontFamily: themeVars.typography.fontFamily.primary,
		},

		// States
		states: {
			hover: {
				filter: {
					type: "lighten",
					value: 0.04,
				},
			},
			active: {
				filter: {
					type: "darken",
					value: 0.88,
				},
			},
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
			width: 3,
			curve: "smooth",
			lineCap: "round",
		},

		// Grid
		grid: {
			strokeDashArray: 3,
			borderColor: themeVars.colors.background.neutral,
			xaxis: {
				lines: {
					show: false,
				},
			},
		},

		// Xaxis
		xaxis: {
			axisBorder: { show: false },
			axisTicks: { show: false },
		},

		// Markers
		markers: {
			size: 0,
		},

		// Tooltip
		tooltip: {
			theme: undefined,
			x: {
				show: true,
			},
		},

		// Legend
		legend: {
			show: true,
			fontSize: themeVars.typography.fontSize.sm,
			position: "top",
			horizontalAlign: "right",
			markers: {
				strokeWidth: 0,
			},
			fontWeight: 500,
			itemMargin: {
				horizontal: 8,
			},
			labels: {
				colors: themeVars.colors.text.primary,
			},
		},

		// plotOptions
		plotOptions: {
			// Bar
			bar: {
				borderRadius: 4,
				columnWidth: "28%",
				borderRadiusApplication: "end",
				borderRadiusWhenStacked: "last",
			},

			// Pie + Donut
			pie: {
				donut: {
					labels: {
						show: true,
						value: LABEL_VALUE,
						total: LABEL_TOTAL,
					},
				},
			},

			// Radialbar
			radialBar: {
				track: {
					strokeWidth: "100%",
				},
				dataLabels: {
					value: LABEL_VALUE,
					total: LABEL_TOTAL,
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
				breakpoint: removePx(themeVars.screens.sm),
				options: {
					plotOptions: { bar: { columnWidth: "40%" } },
				},
			},
			{
				// md
				breakpoint: removePx(themeVars.screens.md),
				options: {
					plotOptions: { bar: { columnWidth: "32%" } },
				},
			},
		],
	};

	return mergeDeepRight(baseOptions, options) as ApexOptions;
}
