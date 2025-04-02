import { addColorChannels } from "@/utils/theme";
import { createGlobalTheme, createThemeContract } from "@vanilla-extract/css";
import { baseThemeTokens } from "./tokens/base";
import { darkColorTokens, lightColorTokens } from "./tokens/color";
import { darkShadowTokens, lightShadowTokens } from "./tokens/shadow";
import { typographyTokens } from "./tokens/typography";
import { themeTokens } from "./type";

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
