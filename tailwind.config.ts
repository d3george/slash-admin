import type { Config } from "tailwindcss";
import { baseThemeTokens } from "./src/theme/core";
import {
	commonColors,
	darkColorTokens,
	lightColorTokens,
	paletteColors,
} from "./src/theme/core/color";
import { typographyTokens } from "./src/theme/core/typography";
import { alpha } from "./src/utils/color";

// Utility function: Convert number to pixel value
const toPx = (value: number) => `${value}px`;

const config: Config = {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		// Responsive configuration
		screens: Object.entries(baseThemeTokens.screens).reduce(
			(acc, [key, value]) => {
				acc[key] = toPx(value);
				return acc;
			},
			{} as Record<string, string>,
		),

		// Spacing configuration (applies to margin, padding...)
		spacing: Object.entries(baseThemeTokens.spacing).reduce(
			(acc, [key, value]) => {
				acc[key] = toPx(value);
				return acc;
			},
			{} as Record<string, string>,
		),

		// Color configuration
		colors: {
			...commonColors,
			success: {
				...paletteColors.success,
				DEFAULT: paletteColors.success.main,
			},
			warning: {
				...paletteColors.warning,
				DEFAULT: paletteColors.warning.main,
			},
			error: {
				...paletteColors.error,
				DEFAULT: paletteColors.error.main,
			},
			info: {
				...paletteColors.info,
				DEFAULT: paletteColors.info.main,
			},
			gray: {
				100: paletteColors.gray.lightest,
				200: paletteColors.gray.lighter,
				300: paletteColors.gray.light,
				400: paletteColors.gray.lightMedium,
				500: paletteColors.gray.main,
				600: paletteColors.gray.darkMedium,
				700: paletteColors.gray.dark,
				800: paletteColors.gray.darker,
				900: paletteColors.gray.darkest,
			},
			hover: alpha(paletteColors.gray.main, 0.1),
			text: {
				light: lightColorTokens.text.primary,
				dark: darkColorTokens.text.primary,
				secondary: {
					light: lightColorTokens.text.secondary,
					dark: darkColorTokens.text.secondary,
				},
				disabled: {
					light: lightColorTokens.text.disabled,
					dark: darkColorTokens.text.disabled,
				},
			},
			bg: {
				light: lightColorTokens.background.default,
				dark: darkColorTokens.background.default,
				paper: {
					light: lightColorTokens.background.paper,
					dark: darkColorTokens.background.paper,
				},
				neutral: {
					light: lightColorTokens.background.neutral,
					dark: darkColorTokens.background.neutral,
				},
			},
		},

		extend: {
			// Border radius configuration
			borderRadius: Object.entries(baseThemeTokens.borderRadius).reduce(
				(acc, [key, value]) => {
					acc[key] = toPx(value);
					return acc;
				},
				{} as Record<string, string>,
			),

			// Shadow configuration
			shadows: Object.entries(baseThemeTokens.shadows).reduce(
				(acc, [key, value]) => {
					acc[key] = value;
					return acc;
				},
				{} as Record<string, string>,
			),

			// Typography configuration
			fontFamily: typographyTokens.fontFamily,
		},
	},
	plugins: [],
};
export default config;
