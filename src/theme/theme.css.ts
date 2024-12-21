import { createGlobalTheme, createThemeContract } from "@vanilla-extract/css";
import { baseThemeTokens } from "./tokens/base";
import { darkColorTokens, lightColorTokens } from "./tokens/color";
import { darkShadowTokens, lightShadowTokens } from "./tokens/shadow";
import { typographyTokens } from "./tokens/typography";
import { type ThemeTokens, themeTokens } from "./type";

// 创建主题契约
export const themeVars = createThemeContract<ThemeTokens>(themeTokens);

// 创建亮色主题
createGlobalTheme(":root.light", themeVars, {
	colors: lightColorTokens,
	typography: typographyTokens,
	shadows: lightShadowTokens,
	...baseThemeTokens,
});

// 创建暗色主题
createGlobalTheme(":root.dark", themeVars, {
	colors: darkColorTokens,
	typography: typographyTokens,
	shadows: darkShadowTokens,
	...baseThemeTokens,
});
