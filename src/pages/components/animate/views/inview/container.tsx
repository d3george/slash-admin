import { m } from "framer-motion";
import { repeat } from "ramda";
import { useMemo } from "react";

import Cover3 from "@/assets/images/cover/cover_3.jpg";
import MotionContainer from "@/components/animate/motion-container";
import { getVariant } from "@/components/animate/variants";
import { themeVars } from "@/theme/theme.css";

const TEXT = "SlashAdmin";
type Props = {
	isText: boolean;
	isMulti: boolean;
	variant: string;
};
export default function ContainerView({ isText, variant, isMulti }: Props) {
	const varients = useMemo(() => getVariant(variant), [variant]);
	const imgs = useMemo(() => (isMulti ? repeat(Cover3, 5) : [Cover3]), [isMulti]);

	return (
		<div
			key={variant}
			className="h-[480px] overflow-auto rounded-lg flex flex-col items-center justify-center"
			style={{ backgroundColor: themeVars.colors.background.neutral }}
		>
			{isText ? (
				<MotionContainer className="flex h-[480px] items-center justify-center font-bold md:text-6xl">
					{TEXT.split("").map((letter) => (
						<m.div key={letter} variants={varients}>
							{letter}
						</m.div>
					))}
				</MotionContainer>
			) : (
				<MotionContainer className="flex flex-col items-center justify-center gap-6">
					{imgs.map((img) => (
						<m.img
							key={img}
							src={img}
							style={{
								objectFit: "cover",
								width: "240px",
								height: isMulti ? "36px" : "240px",
								margin: "auto",
								borderRadius: "8px",
							}}
							variants={varients}
						/>
					))}
				</MotionContainer>
			)}
		</div>
	);
}
