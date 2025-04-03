import Logo from "@/components/logo";
import { useSettings } from "@/store/settingStore";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { ThemeLayout } from "#/enum";
import { HEADER_HEIGHT } from "../config";

type Props = {
	collapsed: boolean;
	onToggle: () => void;
};
export default function NavLogo({ collapsed, onToggle }: Props) {
	const { themeLayout } = useSettings();

	return (
		<div style={{ height: `${HEADER_HEIGHT}px` }} className="relative flex items-center justify-center py-4">
			<div className="flex items-center">
				<Logo />
				{themeLayout !== ThemeLayout.Mini && <span className="ml-2 text-xl font-bold text-primary">Slash Admin</span>}
			</div>
			<div
				onClick={onToggle}
				onKeyDown={onToggle}
				className="absolute right-0 transition-all top-1/2 z-50 hidden size-6 translate-x-1/2 -translate-y-1/2 cursor-pointer select-none items-center justify-center rounded-full text-center md:flex border border-dashed border-gray-500/10 text-sm bg-bg-paper"
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
