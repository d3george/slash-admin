import { Icon } from "@/components/icon";
import LocalePicker from "@/components/locale-picker";
import Logo from "@/components/logo";
import { useSettings } from "@/store/settingStore";
import { themeVars } from "@/theme/theme.css";
import { Button } from "@/ui/button";
import { cn } from "@/utils";
import { rgbAlpha } from "@/utils/theme";
import { Drawer } from "antd";
import { type CSSProperties, useState } from "react";
import { ThemeLayout } from "#/enum";
import AccountDropdown from "../components/account-dropdown";
import BreadCrumb from "../components/bread-crumb";
import NoticeButton from "../components/notice";
import SearchBar from "../components/search-bar";
import SettingButton from "../components/setting-button";
import { HEADER_HEIGHT, NAV_COLLAPSED_WIDTH, NAV_WIDTH } from "./config";
import NavVertical from "./nav/nav-vertical";

export default function Header() {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const { themeLayout, breadCrumb } = useSettings();

	const headerStyle: CSSProperties = {
		borderBottom:
			themeLayout === ThemeLayout.Horizontal
				? `1px dashed ${rgbAlpha(themeVars.colors.palette.gray["500Channel"], 0.2)}`
				: "",
		backgroundColor: rgbAlpha(themeVars.colors.background.defaultChannel, 0.9),
		width: "100%",
	};

	return (
		<>
			<header
				className={cn(themeLayout === ThemeLayout.Horizontal ? "relative" : "sticky top-0 right-0 left-auto")}
				style={headerStyle}
			>
				<div
					className="flex grow items-center justify-between px-4 text-gray backdrop-blur-sm xl:px-6 2xl:px-10"
					style={{
						height: HEADER_HEIGHT,
						transition: "height 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
					}}
				>
					<div className="flex items-baseline">
						{themeLayout !== ThemeLayout.Horizontal ? (
							<Button variant="ghost" size="icon" onClick={() => setDrawerOpen(true)} className="md:hidden">
								<Icon icon="local:ic-menu" size="24" />
							</Button>
						) : (
							<Logo />
						)}
						<div className="ml-4 hidden md:block">{breadCrumb ? <BreadCrumb /> : null}</div>
					</div>

					<div className="flex items-center">
						<SearchBar />
						<LocalePicker />
						<Button
							variant="ghost"
							size="icon"
							className="rounded-full"
							onClick={() => window.open("https://github.com/d3george/slash-admin")}
						>
							<Icon icon="mdi:github" size={24} />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							className="rounded-full"
							onClick={() => window.open("https://discord.gg/fXemAXVNDa")}
						>
							<Icon icon="carbon:logo-discord" size={24} />
						</Button>
						<NoticeButton />
						<SettingButton />
						<AccountDropdown />
					</div>
				</div>
			</header>
			<Drawer
				placement="left"
				onClose={() => setDrawerOpen(false)}
				open={drawerOpen}
				closeIcon={false}
				width={themeLayout === ThemeLayout.Mini ? NAV_COLLAPSED_WIDTH : NAV_WIDTH}
			>
				<NavVertical closeSideBarDrawer={() => setDrawerOpen(false)} />
			</Drawer>
		</>
	);
}
