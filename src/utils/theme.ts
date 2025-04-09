import color from "color";
import { type AddChannelToLeaf, themeTokens } from "../theme/type";

/**
 * @example
 * const rgb = rgbAlpha("#000000", 0.24);
 * console.log(rgb); // "rgba(0, 0, 0, 0.24)"
 *
 * const rgb = rgbAlpha("var(--colors-palette-primary-main)", 0.24);
 * console.log(rgb); // "rgba(var(--colors-palette-primary-main) / 0.24)"
 *
 * const rgb = rgbAlpha("rgb(var(--colors-palette-primary-main))", 0.24);
 * console.log(rgb); // "rgba(rgb(var(--colors-palette-primary-main)) / 0.24)"
 *
 * const rgb = rgbAlpha([200, 250, 214], 0.24);
 * console.log(rgb); // "rgba(200, 250, 214, 0.24)"
 *
 * const rgb = rgbAlpha("200 250 214", 0.24);
 * console.log(rgb); // "rgba(200, 250, 214, 0.24)"
 */
export function rgbAlpha(colorVal: string | string[] | number[], alpha: number): string {
	// ensure alpha value is between 0-1
	const safeAlpha = Math.max(0, Math.min(1, alpha));

	// if color is CSS variable
	if (typeof colorVal === "string") {
		if (colorVal.startsWith("#")) {
			return color(colorVal).alpha(safeAlpha).toString();
		}
		if (colorVal.includes("var(")) {
			return `rgba(${colorVal} / ${safeAlpha})`;
		}
		if (colorVal.startsWith("--")) {
			return `rgba(var(${colorVal}) / ${safeAlpha})`;
		}

		// handle "200, 250, 214" or "200 250 214" format
		if (colorVal.includes(",") || colorVal.includes(" ")) {
			const rgb = colorVal
				.split(/[,\s]+/)
				.map((n) => n.trim())
				.filter(Boolean);
			return `rgba(${rgb.join(", ")}, ${safeAlpha})`;
		}
	}

	// handle array format [200, 250, 214]
	if (Array.isArray(colorVal)) {
		return `rgba(${colorVal.join(", ")}, ${safeAlpha})`;
	}

	throw new Error("Invalid color format");
}

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
 */
export const createTailwinConfg = (propertyPath: string) => {
	const variants = getThemeTokenVariants(propertyPath);
	const result = variants.reduce(
		(acc, variant) => {
			acc[variant] = `var(${toCssVar(`${propertyPath}-${variant}`)})`;
			return acc;
		},
		{} as Record<string, string>,
	);
	return result;
};

/**
 * Get RGB values from color channels
 * @param propertyPath example: `colors.palette.primary`
 * @returns example: `{ DEFAULT: "rgb(var(--colors-palette-primary-defaultChannel))" }`
 */
export const creatColorChannel = (propertyPath: string) => {
	const variants = getThemeTokenVariants(propertyPath);
	const result = variants.reduce(
		(acc, variant) => {
			const variantKey = variant === "default" ? "DEFAULT" : variant;
			acc[variantKey] = `rgb(var(${toCssVar(`${propertyPath}-${variant}Channel`)}))`;
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
/**
 * remove px unit and convert to number
 * @param value example: "16px", "16.5px", "-16px", "16", 16
 * @returns example: 16, 16.5, -16, 16, 16
 * @throws Error if value is invalid
 */
export const removePx = (value: string | number): number => {
	// 如果已经是数字，直接返回
	if (typeof value === "number") return value;

	// 如果是空字符串，抛出错误
	if (!value) {
		throw new Error("Invalid value: empty string");
	}

	// 移除所有空格
	const trimmed = value.trim();

	// 检查是否以 px 结尾（不区分大小写）
	const hasPx = /px$/i.test(trimmed);

	// 提取数字部分
	const num = hasPx ? trimmed.slice(0, -2) : trimmed;

	// 转换为数字
	const result = Number.parseFloat(num);

	// 验证结果是否为有效数字
	if (Number.isNaN(result)) {
		throw new Error(`Invalid value: ${value}`);
	}

	return result;
};

/**
 * add color channels to the color tokens {@link themeTokens}
 * @param obj example: `{ palette: { primary: "#000000" } }`
 * @returns example: `{ palette: { primary: "#000000", primaryChannel: "0, 0, 0" } }`
 */
export const addColorChannels = <T extends Record<string, any>>(obj: T): AddChannelToLeaf<T> => {
	const result: Record<string, any> = {};

	// check if the object is a leaf object
	const isLeafObject = Object.values(obj).every((v) => v === null || typeof v === "string");

	if (isLeafObject) {
		// add channel to the leaf object
		for (const [key, value] of Object.entries(obj)) {
			result[key] = value;
			result[`${key}Channel`] = color(value).rgb().array().join(" ");
		}
	} else {
		// recursively process non-leaf objects
		for (const [key, value] of Object.entries(obj)) {
			if (typeof value === "object" && value !== null) {
				result[key] = addColorChannels(value);
			} else {
				result[key] = value;
			}
		}
	}

	return result as AddChannelToLeaf<T>;
};
