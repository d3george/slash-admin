import { Icon } from "@/components/icon";
import { useSettings } from "@/store/settingStore";
import { useSettingActions } from "@/store/settingStore";
import { ThemeLayout } from "@/types/enum";
import { Button } from "@/ui/button";

export function NavToggleButton() {
	const settings = useSettings();
	const { themeLayout } = settings;
	const { setSettings } = useSettingActions();

	const iconName = themeLayout === ThemeLayout.Vertical ? "line-md:menu-unfold-left" : "line-md:menu-unfold-right";

	const toggleThemeLayout = () => {
		setSettings({
			...settings,
			themeLayout: themeLayout === ThemeLayout.Vertical ? ThemeLayout.Mini : ThemeLayout.Vertical,
		});
	};

	return (
		<Button variant="secondary" size="icon" onClick={toggleThemeLayout}>
			<Icon icon={iconName} size={20} className="text-text-secondary" />
		</Button>
	);
}
