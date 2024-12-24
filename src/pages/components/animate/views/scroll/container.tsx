import { Card, Typography } from "antd";
import { useMemo } from "react";

import MotionViewport from "@/components/animate/motion-viewport";
import { getVariant } from "@/components/animate/variants";
import { themeVars } from "@/theme/theme.css";

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
						<Typography className="text-center">Item {index + 1}</Typography>
					</Card>
				</MotionViewport>
			))}
		</div>
	);
}
