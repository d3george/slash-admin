import { cn } from "@/utils";
import type { ButtonProps } from "antd";
import type { CSSProperties, ReactNode } from "react";

type Props = {
	children: ReactNode;
	className?: string;
	style?: CSSProperties;
} & ButtonProps;
export default function IconButton({
	children,
	className,
	style,
	onClick,
}: Props) {
	return (
		<button
			type="button"
			style={style}
			className={cn(
				"flex cursor-pointer items-center justify-center rounded-full p-2 hover:bg-hover",
				className,
			)}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
