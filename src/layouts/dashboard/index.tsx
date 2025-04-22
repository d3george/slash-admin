import Logo from "@/components/logo";
import { down, useMediaQuery } from "@/hooks";
import { useSettings } from "@/store/settingStore";
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
				className={cn("w-full flex flex-col transition-[width, height] duration-300 ease-in-out", {
					"pl-[var(--layout-nav-width)]": themeLayout === ThemeLayout.Vertical,
					"pl-[var(--layout-nav-width-mini)]": themeLayout === ThemeLayout.Mini,
				})}
			>
				<Header headerLeftSlot={themeLayout === ThemeLayout.Horizontal && <Logo />} />

				{themeLayout === ThemeLayout.Horizontal && (
					<NavBar className="sticky top-[var(--layout-header-height)] left-0 z-app-bar bg-background" />
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
