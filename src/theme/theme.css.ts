import { HtmlDataAttribute, ThemeColorPresets, ThemeMode } from "@/types/enum";
import { addColorChannels } from "@/utils/theme";
import { assignVars, createGlobalTheme, createThemeContract, globalStyle } from "@vanilla-extract/css";
import { baseThemeTokens } from "./tokens/base";
import { darkColorTokens, lightColorTokens, presetsColors } from "./tokens/color";
import { darkShadowTokens, lightShadowTokens } from "./tokens/shadow";
import { typographyTokens } from "./tokens/typography";
import { themeTokens } from "./type";

const getThemeTokens = (theme: ThemeMode) => {
	const themeTokens = theme === ThemeMode.Light ? lightColorTokens : darkColorTokens;
	return {
		colors: addColorChannels(themeTokens),
		typography: typographyTokens,
		shadows: theme === ThemeMode.Light ? lightShadowTokens : darkShadowTokens,
		...baseThemeTokens,
	};
};

export const themeVars = createThemeContract({
	...themeTokens,
	colors: addColorChannels(themeTokens.colors),
});

// theme mode
for (const themeMode of Object.values(ThemeMode)) {
	createGlobalTheme(`:root[${HtmlDataAttribute.ThemeMode}=${themeMode}]`, themeVars, getThemeTokens(themeMode));
}

// dynamic color palette
for (const preset of Object.values(ThemeColorPresets)) {
	globalStyle(`:root[${HtmlDataAttribute.ColorPalette}=${preset}]`, {
		vars: assignVars(themeVars.colors.palette.primary, {
			...addColorChannels(presetsColors[preset]),
		}),
	});
}
