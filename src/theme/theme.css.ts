import { createGlobalTheme, createThemeContract } from "@vanilla-extract/css";
import { baseThemeTokens } from "./tokens/base";
import { darkColorTokens, lightColorTokens } from "./tokens/color";
import { createShadowTokens } from "./tokens/shadow";
import { typographyTokens } from "./tokens/typography";
import { type ThemeTokens, themeTokens } from "./type";

// 创建主题契约
export const themeVars = createThemeContract<ThemeTokens>(themeTokens);

// 创建亮色主题
createGlobalTheme(":root.light", themeVars, {
	colors: lightColorTokens,
	typography: typographyTokens,
	shadows: createShadowTokens(lightColorTokens),
	...baseThemeTokens,
});

// 创建暗色主题
createGlobalTheme(":root.dark", themeVars, {
	colors: darkColorTokens,
	typography: typographyTokens,
	shadows: createShadowTokens(darkColorTokens),
	...baseThemeTokens,
});
