import { hexToRgbChannel } from "@/utils/theme";
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

	// check if the object is a leaf object
	const isLeafObject = Object.values(obj).every((v) => v === null || typeof v === "string");

	if (isLeafObject) {
		// add channel to the leaf object
		for (const [key, value] of Object.entries(obj)) {
			result[key] = value;
			result[`${key}Channel`] = value === null ? "" : value.startsWith("#") ? hexToRgbChannel(value) : value;
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
}
