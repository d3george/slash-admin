import { themeVars } from "@/theme/theme.css";
import type { ReactNode } from "react";

type Props = {
	icon: ReactNode;
	title: string;
	subtitle: string;
};

export default function AnalysisTrafficCard({ icon, title, subtitle }: Props) {
	return (
		<div
			className="flex flex-col items-center rounded py-5"
			style={{
				border: `1px solid rgba(${themeVars.colors.palette.gray["500Channel"]}, .2)`,
			}}
		>
			<div>{icon}</div>
			<span className="text-2xl font-bold">{title}</span>
			<span className="text-sm text-text-secondary">{subtitle}</span>
		</div>
	);
}
