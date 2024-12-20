import color from "color";
import { themeTokens } from "../theme/type";

/**
 * @example
 * #FF0000 -> "255 0 0"
 * #00FF00 -> "0 255 0"
 * #0000FF -> "0 0 255"
 */
export const hexToRgbString = (hex: string) => {
	const rgb = color(hex).rgb().array();
	return rgb.join(" ");
};

/**
 * 转换为 CSS 变量
 * @param key 变量名 如：colors.palette.primary
 * @returns CSS 变量 如：--colors-palette-primary
 */
export const toCssVar = (key: string) => {
	return `--${key.split(".").join("-")}`;
};

/**
 * 转换为 CSS 变量
 * @param key 变量名 如：`colors.palette.primary`
 * @param variants 变量值 如：
 * `
 * ["lighter", "light", "main", "dark", "darker"]
 * `
 * 默认值为 defaultVariants
 * @returns
 * ```js
 * {
 *   lighter: "var(--colors-palette-primary-lighter)",
 *   light: "var(--colors-palette-primary-light)",
 *   main: "rgb(var(--colors-palette-primary-main))",
 *   dark: "rgb(var(--colors-palette-primary-dark))",
 *   darker: "rgb(var(--colors-palette-primary-darker))"
 * }
 * ```
 */
export const toCssVars = (key: string, variants: string[] = defaultVariants) => {
	const result = variants.reduce(
		(acc, variant) => {
			const variantKey = variant === "main" ? "DEFAULT" : variant;
			acc[variantKey] = `var(${toCssVar(`${key}-${variant}`)})`;
			return acc;
		},
		{} as Record<string, string>,
	);
	return result;
};

export const defaultVariants = Object.keys(themeTokens.colors.palette.primary);
