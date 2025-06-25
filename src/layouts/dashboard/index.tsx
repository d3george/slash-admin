import Logo from "@/components/logo";
import { down, useMediaQuery } from "@/hooks";
import { useSettings } from "@/store/settingStore";
import { ThemeLayout } from "#/enum";
import Header from "./header";
import Main from "./main";
import { NavHorizontalLayout, NavMobileLayout, NavVerticalLayout, useFilteredNavData } from "./nav";

export default function DashboardLayout() {
	const isMobile = useMediaQuery(down("md"));

	return (
		<div data-slot="slash-layout-root" className="w-full min-h-svh bg-background">
			{isMobile ? <MobileLayout /> : <PcLayout />}
		</div>
	);
}

function MobileLayout() {
	const navData = useFilteredNavData();
	return (
		<div className="flex flex-col">
			<Header leftSlot={<NavMobileLayout data={navData} />} />
			<Main />
		</div>
	);
}

function PcLayout() {
	const { themeLayout } = useSettings();

	if (themeLayout === ThemeLayout.Horizontal) return <PcHorizontalLayout />;
	return <PcVerticalLayout />;
}

function PcHorizontalLayout() {
	const navData = useFilteredNavData();
	return (
		<div data-slot="slash-layout-content" className="w-full h-screen flex flex-col transition-all duration-300 ease-in-out">
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

	const contentPaddingLeft = themeLayout === ThemeLayout.Vertical ? "var(--layout-nav-width)" : "var(--layout-nav-width-mini)";

	return (
		<>
			<NavVerticalLayout data={navData} />
			<div
				data-slot="slash-layout-content"
				className="w-full flex flex-col transition-[padding] duration-300 ease-in-out"
				style={{
					paddingLeft: contentPaddingLeft,
				}}
			>
				<Header />
				<Main />
			</div>
		</>
	);
}
