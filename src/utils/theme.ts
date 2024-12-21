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
 * convert to CSS vars
 * @param key example: `colors.palette.primary`
 * @returns example: `--colors-palette-primary`
 */
export const toCssVar = (key: string) => {
	return `--${key.split(".").join("-")}`;
};

/**
 * convert to CSS vars
 * @param key example: `colors.palette.primary`
 * @param variants example:
 * `
 * ["lighter", "light", "main", "dark", "darker"]
 * `
 * default value is defaultVariants
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
export const toCssVars = (key: string) => {
	const variants = getVariants(key);
	const result = variants.reduce(
		(acc, variant) => {
			const variantKey = variant === "default" ? "DEFAULT" : variant;
			acc[variantKey] = `var(${toCssVar(`${key}-${variant}`)})`;
			return acc;
		},
		{} as Record<string, string>,
	);
	return result;
};

/**
 * get variants
 * @param keyPath example: `colors.palette.primary`
 * @returns example: `["lighter", "light", "main", "dark", "darker"]`
 */
export const getVariants = (keyPath: string) => {
	const keys = keyPath.split(".");
	const val = keys.reduce((obj: any, key) => {
		if (obj && typeof obj === "object") {
			return obj[key];
		}
		return;
	}, themeTokens);

	return val ? Object.keys(val) : [];
};

/**
 * remove px unit
 * @param value example: "16px"
 * @returns example: 16
 */
export const removePx = (value: string) => {
	return Number(value.replace("px", ""));
};
