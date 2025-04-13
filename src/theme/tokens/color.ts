import { rgbAlpha } from "@/utils/theme";
import { ThemeColorPresets } from "#/enum";

export const presetsColors = {
	[ThemeColorPresets.Default]: {
		lighter: "#C8FAD6",
		light: "#5BE49B",
		default: "#00A76F",
		dark: "#007867",
		darker: "#004B50",
	},
	[ThemeColorPresets.Cyan]: {
		lighter: "#CCF4FE",
		light: "#68CDF9",
		default: "#078DEE",
		dark: "#0351AB",
		darker: "#012972",
	},
	[ThemeColorPresets.Purple]: {
		lighter: "#EBD6FD",
		light: "#B985F4",
		default: "#7635DC",
		dark: "#431A9E",
		darker: "#200A69",
	},
	[ThemeColorPresets.Blue]: {
		lighter: "#D1E9FC",
		light: "#76B0F1",
		default: "#2065D1",
		dark: "#103996",
		darker: "#061B64",
	},
	[ThemeColorPresets.Orange]: {
		lighter: "#FEF4D4",
		light: "#FED680",
		default: "#FDA92D",
		dark: "#B66816",
		darker: "#793908",
	},
	[ThemeColorPresets.Red]: {
		lighter: "#FFE3D5",
		light: "#FF9882",
		default: "#FF3030",
		dark: "#B71833",
		darker: "#7A0930",
	},
};

/**
 * We recommend picking colors with these values for [Eva Color Design](https://colors.eva.design/):
 *  + lighter : 100
 *  + light : 300
 *  + main : 500
 *  + dark : 700
 *  + darker : 900
 */
export const paletteColors = {
	primary: presetsColors[ThemeColorPresets.Default],
	success: {
		lighter: "#D8FBDE",
		light: "#86E8AB",
		default: "#36B37E",
		dark: "#1B806A",
		darker: "#0A5554",
	},
	warning: {
		lighter: "#FFF5CC",
		light: "#FFD666",
		default: "#FFAB00",
		dark: "#B76E00",
		darker: "#7A4100",
	},
	error: {
		lighter: "#FFE9D5",
		light: "#FFAC82",
		default: "#FF5630",
		dark: "#B71D18",
		darker: "#7A0916",
	},
	info: {
		lighter: "#CAFDF5",
		light: "#61F3F3",
		default: "#00B8D9",
		dark: "#006C9C",
		darker: "#003768",
	},
	gray: {
		"100": "#F9FAFB",
		"200": "#F4F6F8",
		"300": "#DFE3E8",
		"400": "#C4CDD5",
		"500": "#919EAB",
		"600": "#637381",
		"700": "#454F5B",
		"800": "#1C252E",
		"900": "#141A21",
	},
};

export const commonColors = {
	white: "#FFFFFF",
	black: "#000000",
};

export const actionColors = {
	hover: rgbAlpha(paletteColors.gray[500], 0.08),
	selected: rgbAlpha(paletteColors.gray[500], 0.08),
	focus: rgbAlpha(paletteColors.gray[500], 0.12),
	disabled: rgbAlpha(paletteColors.gray[500], 0.48),
	active: rgbAlpha(paletteColors.gray[500], 1),
};

export const lightColorTokens = {
	palette: paletteColors,
	common: commonColors,
	action: actionColors,
	text: {
		primary: paletteColors.gray[800],
		secondary: paletteColors.gray[600],
		disabled: paletteColors.gray[500],
	},
	background: {
		default: commonColors.white,
		paper: commonColors.white,
		neutral: paletteColors.gray[200],
	},
};

export const darkColorTokens = {
	palette: paletteColors,
	common: commonColors,
	action: actionColors,
	text: {
		primary: commonColors.white,
		secondary: paletteColors.gray[500],
		disabled: paletteColors.gray[600],
	},
	background: {
		default: paletteColors.gray[900],
		paper: paletteColors.gray[800],
		neutral: "#28323D",
	},
};
