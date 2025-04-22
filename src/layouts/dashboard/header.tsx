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
	headerLeftSlot?: ReactNode;
}

export default function Header({ headerLeftSlot }: HeaderProps) {
	const { breadCrumb } = useSettings();
	return (
		<header
			data-slot="slash-layout-header"
			className={cn(
				"sticky top-0 right-0 left-auto flex items-center bg-background justify-between px-2 md:px-4 lg:px-6 xl:px-10",
				"z-app-bar",
				"h-[var(--layout-header-height)]",
			)}
		>
			<div className="flex items-baseline gap-2">
				{headerLeftSlot}

				<div className="hidden md:block">{breadCrumb && <BreadCrumb />}</div>
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
		</header>
	);
}
