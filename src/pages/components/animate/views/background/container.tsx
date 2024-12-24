import { m } from "framer-motion";
import { useMemo } from "react";

import Cover3 from "@/assets/images/cover/cover_3.jpg";
import MotionContainer from "@/components/animate/motion-container";
import { getVariant } from "@/components/animate/variants";
import { themeVars } from "@/theme/theme.css";

type Props = {
	variant: string;
};
export default function ContainerView({ variant }: Props) {
	const varients = useMemo(() => getVariant(variant), [variant]);
	const isKenburns = variant.includes("kenburns");

	return (
		<div
			key={variant}
			className="h-[480px] overflow-hidden rounded-lg"
			style={{ backgroundColor: themeVars.colors.background.neutral }}
		>
			<MotionContainer className="flex h-full w-full flex-col items-center gap-6">
				{isKenburns ? (
					<m.img src={Cover3} className="h-full w-full object-cover" variants={varients} />
				) : (
					<m.div {...varients} className="h-full w-full" />
				)}
			</MotionContainer>
		</div>
	);
}
