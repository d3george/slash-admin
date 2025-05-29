import Logo from "@/components/logo";
import { down, useMediaQuery } from "@/hooks";
import { useSettings } from "@/store/settingStore";
import { cn } from "@/utils";
import { ThemeLayout } from "#/enum";
import Header from "./header";
import Main from "./main";
import { NavHorizontalLayout, NavMobileLayout, NavToggleButton, NavVerticalLayout, useFilteredNavData } from "./nav";

// Dashboard Layout
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

// Pc Layout
function PcLayout() {
	const { themeLayout } = useSettings();

	if (themeLayout === ThemeLayout.Horizontal) return <PcHorizontalLayout />;
	return <PcVerticalLayout />;
}

function PcHorizontalLayout() {
	const navData = useFilteredNavData();
	return (
		<div data-slot="slash-layout-content" className={cn("w-full h-screen flex flex-col transition-all duration-300 ease-in-out")}>
			<Header leftSlot={<Logo />} />
			<NavHorizontalLayout data={navData} />
			<Main />
		</div>
	);
}

function PcVerticalLayout() {
	const settings = useSettings();
	const { themeLayout } = settings;
	const navData = useFilteredNavData();
	return (
		<>
			<NavVerticalLayout data={navData} />
			<div
				data-slot="slash-layout-content"
				className={cn("w-full flex flex-col transition-[padding] duration-300 ease-in-out", {
					"pl-[var(--layout-nav-width)]": themeLayout === ThemeLayout.Vertical,
					"pl-[var(--layout-nav-width-mini)]": themeLayout === ThemeLayout.Mini,
				})}
			>
				<Header leftSlot={<NavToggleButton />} />
				<Main />
			</div>
		</>
	);
}

// Mobile Layout
function MobileLayout() {
	const navData = useFilteredNavData();
	return (
		<>
			<Header leftSlot={<NavMobileLayout data={navData} />} />
			<Main />
		</>
	);
}
