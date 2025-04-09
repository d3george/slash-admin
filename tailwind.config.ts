import type { Config } from "tailwindcss";
import { breakpointsTokens } from "./src/theme/tokens/breakpoints";
import { HtmlDataAttribute } from "./src/types/enum";
import { creatColorChannel, createTailwinConfg } from "./src/utils/theme";

export default {
	darkMode: ["selector", `[${HtmlDataAttribute.ThemeMode}='dark']`],
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				primary: creatColorChannel("colors.palette.primary"),
				secondary: creatColorChannel("colors.palette.secondary"),
				success: creatColorChannel("colors.palette.success"),
				warning: creatColorChannel("colors.palette.warning"),
				error: creatColorChannel("colors.palette.error"),
				info: creatColorChannel("colors.palette.info"),
				gray: creatColorChannel("colors.palette.gray"),
				common: creatColorChannel("colors.common"),
				text: creatColorChannel("colors.text"),
				bg: creatColorChannel("colors.background"),
				action: createTailwinConfg("colors.action"),
			},
			opacity: createTailwinConfg("opacity"),
			borderRadius: createTailwinConfg("borderRadius"),
			boxShadow: createTailwinConfg("shadows"),
			spacing: createTailwinConfg("spacing"),
			screens: breakpointsTokens,
		},
	},
} satisfies Config;
