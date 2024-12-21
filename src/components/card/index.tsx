import { themeVars } from "@/theme/theme.css";
import type { CSSProperties, ReactNode } from "react";

type Props = {
	children?: ReactNode;
	className?: string;
	style?: CSSProperties;
};
export default function Card({ children, ...other }: Props) {
	return (
		<div
			style={{
				backgroundColor: themeVars.colors.background.paper,
				boxShadow: themeVars.shadows.card,
				transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
				borderRadius: themeVars.borderRadius.md,
				padding: themeVars.spacing[6],
				overflow: "hidden",
				position: "relative",
				display: "flex",
				alignItems: "center",
			}}
			{...other}
		>
			{children}
		</div>
	);
}
