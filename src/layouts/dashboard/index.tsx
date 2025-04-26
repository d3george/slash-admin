import { Icon } from "@/components/icon";
import Logo from "@/components/logo";
import { down, useMediaQuery } from "@/hooks";
import { useSettingActions, useSettings } from "@/store/settingStore";
import { Button } from "@/ui/button";
import { cn } from "@/utils";
import { ThemeLayout } from "#/enum";
import Header from "./header";
import Main from "./main";
import NavBar from "./nav-bar";

export default function DashboardLayout() {
	const isMobile = useMediaQuery(down("md"));
	const { themeLayout } = useSettings();

	return (
		<div
			data-slot="slash-layout-root"
			className={cn("w-full min-h-svh flex bg-background", {
				"flex-col": isMobile || themeLayout === ThemeLayout.Horizontal,
			})}
		>
			{isMobile ? <MobileLayout /> : <PcLayout />}
		</div>
	);
}

function PcLayout() {
	const { themeLayout } = useSettings();

	return (
		<>
			{themeLayout !== ThemeLayout.Horizontal && <NavBar />}

			<div
				data-slot="slash-layout-content"
				className={cn("w-full h-screen flex flex-col transition-all duration-300 ease-in-out", {
					"pl-[var(--layout-nav-width)]": themeLayout === ThemeLayout.Vertical,
					"pl-[var(--layout-nav-width-mini)]": themeLayout === ThemeLayout.Mini,
				})}
			>
				<Header headerLeftSlot={themeLayout === ThemeLayout.Horizontal ? <Logo /> : <VerticalNavTrigger />} />

				{themeLayout === ThemeLayout.Horizontal && (
					<NavBar className="sticky top-[var(--layout-header-height)] left-0 grow-0 shrink-0" />
				)}

				<Main />
			</div>
		</>
	);
}

function MobileLayout() {
	return (
		<>
			<Header headerLeftSlot={<NavBar />} />
			<Main />
		</>
	);
}

function VerticalNavTrigger() {
	const settings = useSettings();
	const { themeLayout } = settings;
	const { setSettings } = useSettingActions();

	if (themeLayout === ThemeLayout.Horizontal) return null;

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
