import { useSettingActions, useSettings } from "@/store/settingStore";
import type { ThemeMode } from "#/enum";
import { themeVars } from "../theme.css";

export function useTheme() {
	const settings = useSettings();
	const { setSettings } = useSettingActions();

	return {
		mode: settings.themeMode,
		setMode: (mode: ThemeMode) => {
			setSettings({
				...settings,
				themeMode: mode,
			});
		},
		tokens: themeVars,
	};
}
