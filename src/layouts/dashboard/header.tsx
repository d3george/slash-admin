import { Drawer } from "antd";
import { type CSSProperties, useState } from "react";

import { IconButton, Iconify, SvgIcon } from "@/components/icon";
import LocalePicker from "@/components/locale-picker";
import Logo from "@/components/logo";
import { useSettings } from "@/store/settingStore";

import AccountDropdown from "../components/account-dropdown";
import BreadCrumb from "../components/bread-crumb";
import NoticeButton from "../components/notice";
import SearchBar from "../components/search-bar";
import SettingButton from "../components/setting-button";

import { themeVars } from "@/theme/theme.css";
import { cn } from "@/utils";
import { rgbAlpha } from "@/utils/theme";
import { ThemeLayout } from "#/enum";
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
					className="flex flex-grow items-center justify-between px-4 text-gray backdrop-blur xl:px-6 2xl:px-10"
					style={{
						height: HEADER_HEIGHT,
						transition: "height 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
					}}
				>
					<div className="flex items-baseline">
						{themeLayout !== ThemeLayout.Horizontal ? (
							<IconButton onClick={() => setDrawerOpen(true)} className="h-10 w-10 md:hidden">
								<SvgIcon icon="ic-menu" size="24" />
							</IconButton>
						) : (
							<Logo />
						)}
						<div className="ml-4 hidden md:block">{breadCrumb ? <BreadCrumb /> : null}</div>
					</div>

					<div className="flex">
						<SearchBar />
						<LocalePicker />
						<IconButton onClick={() => window.open("https://github.com/d3george/slash-admin")}>
							<Iconify icon="mdi:github" size={24} />
						</IconButton>
						<IconButton onClick={() => window.open("https://discord.gg/fXemAXVNDa")}>
							<Iconify icon="carbon:logo-discord" size={24} />
						</IconButton>
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
