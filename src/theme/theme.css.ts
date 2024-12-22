import { hexToRgbString } from "@/utils/theme";
import { createGlobalTheme, createThemeContract } from "@vanilla-extract/css";
import { baseThemeTokens } from "./tokens/base";
import { darkColorTokens, lightColorTokens } from "./tokens/color";
import { darkShadowTokens, lightShadowTokens } from "./tokens/shadow";
import { typographyTokens } from "./tokens/typography";
import { type AddChannelToLeaf, themeTokens } from "./type";

const contractInitval = {
	...themeTokens,
	colors: addColorChannels(themeTokens.colors),
};

// create theme contract
export const themeVars = createThemeContract(contractInitval);

// create light theme
createGlobalTheme(":root.light", themeVars, {
	colors: addColorChannels(lightColorTokens),
	typography: typographyTokens,
	shadows: lightShadowTokens,
	...baseThemeTokens,
});

// create dark theme
createGlobalTheme(":root.dark", themeVars, {
	colors: addColorChannels(darkColorTokens),
	typography: typographyTokens,
	shadows: darkShadowTokens,
	...baseThemeTokens,
});

function addColorChannels<T extends Record<string, any>>(obj: T): AddChannelToLeaf<T> {
	const result: Record<string, any> = {};

	// 检查是否是最深层对象（所有子属性都是 null 或 string）
	const isLeafObject = Object.values(obj).every((v) => v === null || typeof v === "string");

	if (isLeafObject) {
		// 在最深层对象添加 Channel
		for (const [key, value] of Object.entries(obj)) {
			result[key] = value;
			result[`${key}Channel`] = value === null ? "" : value.startsWith("#") ? hexToRgbString(value) : value;
		}
	} else {
		// 递归处理非最深层对象
		for (const [key, value] of Object.entries(obj)) {
			if (typeof value === "object" && value !== null) {
				result[key] = addColorChannels(value);
			} else {
				result[key] = value;
			}
		}
	}

	return result as AddChannelToLeaf<T>;
}
