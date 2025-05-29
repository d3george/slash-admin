import { Icon } from "@/components/icon";
import LocalePicker from "@/components/locale-picker";
import { useSettings } from "@/store/settingStore";
import { Button } from "@/ui/button";
import { cn } from "@/utils";
import type { ReactNode } from "react";
import AccountDropdown from "../components/account-dropdown";
import BreadCrumb from "../components/bread-crumb";
import NoticeButton from "../components/notice";
import SearchBar from "../components/search-bar";
import SettingButton from "../components/setting-button";

interface HeaderProps {
	leftSlot?: ReactNode;
}

export default function Header({ leftSlot }: HeaderProps) {
	const { breadCrumb } = useSettings();
	return (
		<header
			data-slot="slash-layout-header"
			className={cn(
				"sticky z-app-bar top-0 right-0 left-0 flex items-center bg-background justify-between px-2 ml-[1px]",
				"h-[var(--layout-header-height)] grow-0 shrink-0",
			)}
		>
			<div className="flex items-center">
				{leftSlot}

				<div className="hidden md:block ml-4">{breadCrumb && <BreadCrumb />}</div>
			</div>

			<div className="flex items-center gap-1">
				<SearchBar />
				<LocalePicker />
				<Button variant="ghost" size="icon" className="rounded-full" onClick={() => window.open("https://github.com/d3george/slash-admin")}>
					<Icon icon="mdi:github" size={24} />
				</Button>
				<Button variant="ghost" size="icon" className="rounded-full" onClick={() => window.open("https://discord.gg/fXemAXVNDa")}>
					<Icon icon="carbon:logo-discord" size={24} />
				</Button>
				<NoticeButton />
				<SettingButton />
				<AccountDropdown />
			</div>
		</header>
	);
}
