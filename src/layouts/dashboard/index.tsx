import Logo from "@/components/logo";
import { down, useMediaQuery } from "@/hooks";
import { useSettings } from "@/store/settingStore";
import { ScrollArea } from "@/ui/scroll-area";
import { cn } from "@/utils";
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
		<ScrollArea className={cn("flex w-full h-screen")}>
			<Header leftSlot={<NavMobileLayout data={navData} />} />
			<Main />
		</ScrollArea>
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
			<ScrollArea className={cn("flex w-full h-screen")}>
				<Header leftSlot={<Logo />} />
				<NavHorizontalLayout data={navData} />
				<Main />
			</ScrollArea>
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
				className="w-full h-full flex flex-col transition-[padding] duration-300 ease-in-out"
				style={{
					paddingLeft: contentPaddingLeft,
				}}
			>
				<ScrollArea className={cn("flex h-screen w-full")}>
					<Header />
					<Main />
				</ScrollArea>
			</div>
		</>
	);
}
