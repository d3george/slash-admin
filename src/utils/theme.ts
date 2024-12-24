import color from "color";
import { themeTokens } from "../theme/type";

/**
 * @example
 * const rgb = rgbAlpha("#000000", 0.24);
 * console.log(rgb); // "rgba(0, 0, 0, 0.24)"
 *
 * const rgb = rgbAlpha("var(--colors-palette-primary-main)", 0.24);
 * console.log(rgb); // "rgba(var(--colors-palette-primary-main), 0.24)"
 *
 * const rgb = rgbAlpha("rgb(var(--colors-palette-primary-main))", 0.24);
 * console.log(rgb); // "rgba(rgb(var(--colors-palette-primary-main)), 0.24)"
 *
 * const rgb = rgbAlpha([200, 250, 214], 0.24);
 * console.log(rgb); // "rgba(200, 250, 214, 0.24)"
 */
export function rgbAlpha(color: string | string[] | number[], alpha: number): string {
	// ensure alpha value is between 0-1
	const safeAlpha = Math.max(0, Math.min(1, alpha));

	// if color is CSS variable
	if (typeof color === "string") {
		if (color.startsWith("#")) {
			return `rgba(${hexToRgbChannel(color)}, ${safeAlpha})`;
		}
		if (color.includes("var(")) {
			return `rgba(${color}, ${safeAlpha})`;
		}
		if (color.startsWith("--")) {
			return `rgba(var(${color}), ${safeAlpha})`;
		}

		// handle "200, 250, 214" or "200 250 214" format
		if (color.includes(",") || color.includes(" ")) {
			const rgb = color.split(/[,\s]+/).map((n) => n.trim());
			return `rgba(${rgb.join(", ")}, ${safeAlpha})`;
		}
	}

	// handle array format [200, 250, 214]
	if (Array.isArray(color)) {
		return `rgba(${color.join(", ")}, ${safeAlpha})`;
	}

	throw new Error("Invalid color format");
}

/**
 * @example
 * const rgbChannel = hexToRgbChannel("#000000");
 * console.log(rgbChannel); // "0, 0, 0"
 */
export const hexToRgbChannel = (hex: string) => {
	const rgb = color(hex).rgb().array();
	return rgb.join(",");
};

/**
 * convert to CSS vars
 * @param propertyPath example: `colors.palette.primary`
 * @returns example: `--colors-palette-primary`
 */
export const toCssVar = (propertyPath: string) => {
	return `--${propertyPath.split(".").join("-")}`;
};

/**
 * convert to CSS vars
 * @param propertyPath example: `colors.palette.primary`
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
export const toCssVars = (propertyPath: string) => {
	const variants = getThemeTokenVariants(propertyPath);
	const result = variants.reduce(
		(acc, variant) => {
			const variantKey = variant === "default" ? "DEFAULT" : variant;
			acc[variantKey] = `var(${toCssVar(`${propertyPath}-${variant}`)})`;
			return acc;
		},
		{} as Record<string, string>,
	);
	return result;
};

/**
 * get variants in {@link themeTokens}
 * @param propertyPath example: `colors.palette.primary`
 * @returns example: `["lighter", "light", "main", "dark", "darker"]`
 */
export const getThemeTokenVariants = (propertyPath: string) => {
	const keys = propertyPath.split(".");
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
