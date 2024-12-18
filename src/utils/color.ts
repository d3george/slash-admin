import type { ColorScale, ThemeColors } from "#//theme";

export const getColor = (
	colors: ThemeColors,
	color: keyof ThemeColors["palette"],
	variant: keyof ColorScale = "main",
) => {
	if (color === "gray") {
		return (colors.palette.gray as Record<string, string>)[variant];
	}
	return (colors.palette[color] as ColorScale)[variant];
};

export const alpha = (color: string, opacity: number) => {
	// 实现颜色透明度调整
	return `rgba(${hexToRgb(color)}, ${opacity})`;
};

export const hexToRgb = (hex: string): string => {
	// 实现十六进制转RGB
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	if (!result) return "";
	return `${Number.parseInt(result[1], 16)}, ${Number.parseInt(result[2], 16)}, ${Number.parseInt(result[3], 16)}`;
};
