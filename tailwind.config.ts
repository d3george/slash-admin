import type { Config } from "tailwindcss";
import { breakpointsTokens } from "./src/theme/tokens/breakpoints";
import { HtmlDataAttribute } from "./src/types/enum";
import { creatColorChannel, createTailwinConfg } from "./src/utils/theme";

export default {
	darkMode: ["selector", `[${HtmlDataAttribute.ThemeMode}='dark']`],
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		fontFamily: createTailwinConfg("typography.fontFamily"),
		extend: {
			colors: {
				// slash admin theme tokens
				primary: creatColorChannel("colors.palette.primary"),
				success: creatColorChannel("colors.palette.success"),
				warning: creatColorChannel("colors.palette.warning"),
				error: creatColorChannel("colors.palette.error"),
				info: creatColorChannel("colors.palette.info"),
				gray: creatColorChannel("colors.palette.gray"),
				common: creatColorChannel("colors.common"),
				text: creatColorChannel("colors.text"),
				bg: creatColorChannel("colors.background"),
				action: createTailwinConfg("colors.action"),

				// shadcn ui theme tokens
				background: "var(--background)",
				foreground: "var(--foreground)",
				card: "var(--card)",
				cardForeground: "var(--card-foreground)",
				popover: "var(--popover)",
				popoverForeground: "var(--popover-foreground)",
				primaryForeground: "var(--primary-foreground)",
				secondary: "var(--secondary)",
				secondaryForeground: "var(--secondary-foreground)",
				muted: "var(--muted)",
				mutedForeground: "var(--muted-foreground)",
				accent: "var(--accent)",
				accentForeground: "var(--accent-foreground)",
				destructive: "var(--destructive)",
				border: "var(--border)",
				input: "var(--input)",
				ring: "var(--ring)",
				chart1: "var(--chart-1)",
				chart2: "var(--chart-2)",
				chart3: "var(--chart-3)",
				chart4: "var(--chart-4)",
				chart5: "var(--chart-5)",
				sidebar: "var(--sidebar)",
				sidebarForeground: "var(--sidebar-foreground)",
				sidebarPrimary: "var(--sidebar-primary)",
				sidebarPrimaryForeground: "var(--sidebar-primary-foreground)",
				sidebarAccent: "var(--sidebar-accent)",
				sidebarAccentForeground: "var(--sidebar-accent-foreground)",
				sidebarBorder: "var(--sidebar-border)",
				sidebarRing: "var(--sidebar-ring)",
			},
			opacity: createTailwinConfg("opacity"),
			borderRadius: createTailwinConfg("borderRadius"),
			boxShadow: createTailwinConfg("shadows"),
			spacing: createTailwinConfg("spacing"),
			zIndex: createTailwinConfg("zIndex"),
			screens: breakpointsTokens,
		},
	},
} satisfies Config;
