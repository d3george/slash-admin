import { themeVars } from "@/theme/theme.css";
import type { CSSProperties } from "react";

export const navItemStyles: Record<string, CSSProperties> = {
	icon: {
		display: "inline-flex",
		flexShrink: 0,
		width: 22,
		height: 22,
	},
	texts: {
		display: "inline-flex",
		flexDirection: "column",
		justifyContent: "center",
		flex: "1 1 auto",
	},
	title: {
		display: "-webkit-box",
		WebkitLineClamp: 1,
		WebkitBoxOrient: "vertical",
		overflow: "hidden",
		textOverflow: "ellipsis",
		fontSize: "0.875rem",
		fontWeight: 500,
		textAlign: "left",
		lineHeight: 18 / 12,
	},
	caption: {
		display: "-webkit-box",
		WebkitLineClamp: 1,
		WebkitBoxOrient: "vertical",
		overflow: "hidden",
		textOverflow: "ellipsis",
		fontSize: "0.75rem",
		fontWeight: 400,
		color: themeVars.colors.text.secondary,
		textAlign: "left",
		lineHeight: 18 / 12,
	},

	info: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		flexShrink: 0,
		marginLeft: "6px",
	},

	arrow: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		flexShrink: 0,
		width: 16,
		height: 16,
		marginLeft: "6px",
		transition: "all 0.3s ease-in-out",
	},
};
