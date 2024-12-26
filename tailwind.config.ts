import type { Config } from "tailwindcss";
import { breakpointsTokens } from "./src/theme/tokens/breakpoints";
import { rgbAlpha, toCssVar, toCssVars } from "./src/utils/theme";

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
			common: toCssVars("colors.common"),
			text: toCssVars("colors.text"),
			bg: toCssVars("colors.background"),
			border: rgbAlpha(toCssVar("colors.palette.gray.500Channel"), 0.1),
			hover: rgbAlpha(toCssVar("colors.palette.gray.500Channel"), 0.1),
		},

		opacity: toCssVars("opacity"),
		screens: breakpointsTokens,
		extend: {
			borderRadius: toCssVars("borderRadius"),
			boxShadow: toCssVars("shadows"),
			spacing: toCssVars("spacing"),
		},
	},

	plugins: [],
};

export default config;
