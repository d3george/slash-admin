import { useSettingActions, useSettings } from "@/store/settingStore";
import type { ThemeMode } from "#/enum";
import { themeVars } from "../theme.css";
import { baseThemeTokens } from "../tokens/base";
import { darkColorTokens, lightColorTokens, presetsColors } from "../tokens/color";
import { darkShadowTokens, lightShadowTokens } from "../tokens/shadow";
import { typographyTokens } from "../tokens/typography";

export function useTheme() {
	const settings = useSettings();
	const { setSettings } = useSettingActions();

	let colorTokens = settings.themeMode === "light" ? lightColorTokens : darkColorTokens;

	colorTokens = {
		...colorTokens,
		palette: {
			...colorTokens.palette,
			primary: presetsColors[settings.themeColorPresets],
		},
	};

	return {
		mode: settings.themeMode,
		setMode: (mode: ThemeMode) => {
			setSettings({
				...settings,
				themeMode: mode,
			});
		},
		themeVars,
		themeTokens: {
			base: baseThemeTokens,
			color: colorTokens,
			shadow: settings.themeMode === "light" ? lightShadowTokens : darkShadowTokens,
			typography: typographyTokens,
		},
	};
}
