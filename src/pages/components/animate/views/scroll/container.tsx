import MotionViewport from "@/components/animate/motion-viewport";
import { getVariant } from "@/components/animate/variants";
import { themeVars } from "@/theme/theme.css";
import { Card } from "@/ui/card";
import { useMemo } from "react";

type Props = {
	variant: string;
};
export default function ContainerView({ variant }: Props) {
	const varients = useMemo(() => getVariant(variant), [variant]);

	return (
		<div
			key={variant}
			className="h-[480px] overflow-auto rounded-lg px-20"
			style={{ backgroundColor: themeVars.colors.background.neutral }}
		>
			{[...Array(40)].map((_, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
				<MotionViewport key={index} variants={varients} className="mt-4">
					<Card>
						<span className="text-center">Item {index + 1}</span>
					</Card>
				</MotionViewport>
			))}
		</div>
	);
}
