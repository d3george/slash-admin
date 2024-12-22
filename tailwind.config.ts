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
			gray: toCssVars("colors.palette.gray"),
			hover: color(paletteColors.gray[500]).alpha(0.1).rgb().string(),
			// hover: "rgba(var(--colors-palette-gray-500Channel), 0.1)",
			text: toCssVars("colors.text"),
			bg: toCssVars("colors.background"),
		},

		screens: baseThemeTokens.screens,
		spacing: toCssVars("spacing"),
		extend: {
			borderRadius: toCssVars("borderRadius"),
			boxShadow: toCssVars("shadows"),
		},
	},

	plugins: [],
};

export default config;
