import { useSettingActions, useSettings } from "@/store/settingStore";
import { useMemo } from "react";
import type { ThemeMode } from "#/enum";
import { themeVars } from "../theme.css";
import { baseThemeTokens } from "../tokens/base";
import { darkColorTokens, lightColorTokens, presetsColors } from "../tokens/color";
import { darkShadowTokens, lightShadowTokens } from "../tokens/shadow";
import { typographyTokens } from "../tokens/typography";
import { useSystemTheme } from "./use-system-theme";

export function useTheme() {
	const settings = useSettings();
	const systemTheme = useSystemTheme();
	const { setSettings } = useSettingActions();

	const colorTokens = useMemo(() => {
		const tokens = settings.themeMode === "light" ? lightColorTokens : darkColorTokens;
		return {
			...tokens,
			palette: {
				...tokens.palette,
				primary: presetsColors[settings.themeColorPresets],
			},
		};
	}, [settings.themeMode, settings.themeColorPresets]);

	const currTheme = useMemo(() => {
		return settings.themeMode === "system" ? systemTheme : settings.themeMode;
	}, [settings.themeMode, systemTheme]);

	return {
		mode: currTheme,
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
