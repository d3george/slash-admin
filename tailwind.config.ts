import type { Config } from "tailwindcss";
import { breakpointsTokens } from "./src/theme/tokens/breakpoints";
import { HtmlDataAttribute } from "./src/types/enum";
import { getRgbFromColorChannel, getTailwinConfg } from "./src/utils/theme";

const config: Config = {
	darkMode: ["selector", `[${HtmlDataAttribute.ThemeMode}='dark']`],
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		colors: {
			primary: getRgbFromColorChannel("colors.palette.primary"),
			secondary: getRgbFromColorChannel("colors.palette.secondary"),
			success: getRgbFromColorChannel("colors.palette.success"),
			warning: getRgbFromColorChannel("colors.palette.warning"),
			error: getRgbFromColorChannel("colors.palette.error"),
			info: getRgbFromColorChannel("colors.palette.info"),
			gray: getRgbFromColorChannel("colors.palette.gray"),
			common: getRgbFromColorChannel("colors.common"),
			text: getRgbFromColorChannel("colors.text"),
			bg: getRgbFromColorChannel("colors.background"),
			action: getTailwinConfg("colors.action"),
		},
		opacity: getTailwinConfg("opacity"),
		screens: breakpointsTokens,
		extend: {
			borderRadius: getTailwinConfg("borderRadius"),
			boxShadow: getTailwinConfg("shadows"),
			spacing: getTailwinConfg("spacing"),
			keyframes: {
				"collapsible-down": {
					from: { height: "0" },
					to: { height: "var(--radix-collapsible-content-height)" },
				},
				"collapsible-up": {
					from: { height: "var(--radix-collapsible-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"collapsible-down": "collapsible-down 0.2s ease-out",
				"collapsible-up": "collapsible-up 0.2s ease-out",
			},
		},
	},
};

export default config;
