import Logo from "@/components/logo";
import { useSettings } from "@/store/settingStore";
import { cn } from "@/utils";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { ThemeLayout } from "#/enum";

type Props = {
	collapsed: boolean;
	onToggle: () => void;
};
export default function NavLogo({ collapsed, onToggle }: Props) {
	const { themeLayout } = useSettings();

	return (
		<div
			className={cn("relative flex items-center py-4 h-[var(--layout-header-height)]", {
				"justify-center": themeLayout === ThemeLayout.Mini,
				"px-4": themeLayout === ThemeLayout.Vertical,
			})}
		>
			<div className="flex items-center gap-2">
				<Logo />
				{themeLayout !== ThemeLayout.Mini && <span className="text-xl font-bold text-primary">Slash Admin</span>}
			</div>
			<div
				onClick={onToggle}
				onKeyDown={onToggle}
				className="absolute right-0 transition-all top-1/2 z-tooltip hidden size-6 translate-x-1/2 -translate-y-1/2 cursor-pointer select-none items-center justify-center rounded-full text-center md:flex border border-dashed text-sm bg-bg-paper"
			>
				{collapsed ? (
					<RightOutlined className="text-xs text-text-disabled" />
				) : (
					<LeftOutlined className="text-xs text-text-disabled" />
				)}
			</div>
		</div>
	);
}
