import color from "color";
import type { Config } from "tailwindcss";
import { baseThemeTokens } from "./src/theme/tokens/base";
import { paletteColors } from "./src/theme/tokens/color";
import { toCssVars } from "./src/utils/theme";

const config: Config = {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		colors: {
			primary: toCssVars("colors.palette.primary"),
			secondary: toCssVars("colors.palette.secondary"),
			success: toCssVars("colors.palette.success"),
			warning: toCssVars("colors.palette.warning"),
			error: toCssVars("colors.palette.error"),
			info: toCssVars("colors.palette.info"),
			gray: toCssVars("colors.palette.gray", ["100", "200", "300", "400", "500", "600", "700", "800", "900"]),
			hover: color(paletteColors.gray[500]).alpha(0.1).rgb().string(),
			text: toCssVars("colors.text", ["primary", "secondary", "disabled"]),
			bg: toCssVars("colors.background", ["default", "paper", "neutral"]),
		},

		screens: Object.entries(baseThemeTokens.screens).reduce(
			(acc, [key, value]) => {
				acc[key] = `${value}px`;
				return acc;
			},
			{} as Record<string, string>,
		),
		spacing: Object.entries(baseThemeTokens.spacing).reduce(
			(acc, [key, value]) => {
				acc[key] = `${value}px`;
				return acc;
			},
			{} as Record<string, string>,
		),
		extend: {
			borderRadius: Object.entries(baseThemeTokens.borderRadius).reduce(
				(acc, [key, value]) => {
					acc[key] = `${value}px`;
					return acc;
				},
				{} as Record<string, string>,
			),
		},
	},
	plugins: [],
};

export default config;
