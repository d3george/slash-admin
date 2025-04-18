import { cn } from "@/utils";
import { Icon as IconifyIcon } from "@iconify/react";
import type { IconProps as IconifyIconProps } from "@iconify/react";
import type { CSSProperties } from "react";

interface IconProps extends IconifyIconProps {
	/**
	 * Icon name or path
	 * - Local SVG: local:icon-name
	 * - URL SVG: url:https://example.com/icon.svg
	 * - Third-party icon library: iconify-icon-name
	 */
	icon: string;
	size?: string | number;
	color?: string;
	className?: string;
	style?: CSSProperties;
}

export default function Icon({
	icon,
	size = "1em",
	color = "currentColor",
	className = "",
	style = {},
	...props
}: IconProps) {
	// Handle URL SVG
	if (icon.startsWith("url:")) {
		const url = icon.replace("url:", "");
		return (
			<img
				src={url}
				alt="icon"
				className={cn("inline-block", className)}
				style={{
					width: size,
					height: size,
					color,
					...style,
				}}
			/>
		);
	}

	// Handle local and third-party icon libraries
	return (
		<IconifyIcon
			icon={icon}
			width={size}
			height={size}
			className={cn("inline-block", className)}
			style={{
				color,
				height: size,
				width: size,
				...style,
			}}
			{...props}
		/>
	);
}
