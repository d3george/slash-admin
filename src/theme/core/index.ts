import type { ThemeTokens } from "#/theme";

export * from "./color";
export * from "./typography";
export const baseThemeTokens: Omit<ThemeTokens, "colors" | "typography"> = {
	spacing: {
		0: 0,
		1: 4,
		2: 8,
		3: 12,
		4: 16,
		5: 20,
		6: 24,
		8: 32,
		10: 40,
		12: 48,
		16: 64,
		20: 80,
		24: 96,
		32: 128,
	},
	borderRadius: {
		none: 0,
		sm: 2,
		base: 4,
		md: 6,
		lg: 8,
		xl: 12,
		full: 9999,
	},
	shadows: {
		sm: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
		md: "0px 1px 3px 0px rgba(0, 0, 0, 0.05)",
		lg: "0px 1px 4px 0px rgba(0, 0, 0, 0.05)",
		xl: "0px 1px 5px 0px rgba(0, 0, 0, 0.05)",
	},
	screens: {
		xs: 480,
		sm: 576,
		md: 768,
		lg: 992,
		xl: 1200,
		"2xl": 1600,
	},
	zIndex: {
		drawer: 1000,
		modal: 1000,
		snackbar: 1000,
		tooltip: 1000,
	},
};
