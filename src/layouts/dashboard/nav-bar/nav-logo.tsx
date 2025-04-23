import Logo from "@/components/logo";
import { useSettings } from "@/store/settingStore";
import { cn } from "@/utils";
import { ThemeLayout } from "#/enum";

export default function NavLogo() {
	const { themeLayout } = useSettings();

	return (
		<div
			className={cn("relative bg-background flex items-center py-4 h-[var(--layout-header-height)]", {
				"justify-center": themeLayout === ThemeLayout.Mini,
				"px-2": themeLayout === ThemeLayout.Vertical,
			})}
		>
			<div className="flex items-center gap-2">
				<Logo />
				{themeLayout !== ThemeLayout.Mini && <span className="text-xl font-bold text-primary">Slash Admin</span>}
			</div>
		</div>
	);
}
