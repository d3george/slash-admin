import { varFade } from "@/components/animate/variants";
import Logo from "@/components/logo";
import { NavMini, NavVertical } from "@/components/nav";
import type { NavProps } from "@/components/nav/types";
import { useSettings } from "@/store/settingStore";
import { ThemeLayout } from "@/types/enum";
import { ScrollArea } from "@/ui/scroll-area";
import { cn } from "@/utils";
import { m } from "motion/react";

type Props = {
	data: NavProps["data"];
	className?: string;
};

export function NavVerticalLayout({ data, className }: Props) {
	const { themeLayout } = useSettings();

	return (
		<nav
			data-slot="slash-layout-nav"
			className={cn(
				"fixed inset-y-0 left-0 flex-col h-full bg-background border-r border-dashed transition-all duration-300 ease-in-out",
				className,
			)}
		>
			<div
				className={cn("relative flex items-center py-4 px-2 h-[var(--layout-header-height)]", {
					"justify-center": themeLayout === ThemeLayout.Mini,
				})}
			>
				<div className="flex items-center gap-2">
					<Logo />
					{themeLayout !== ThemeLayout.Mini && (
						<m.span className="text-xl font-bold text-primary" variants={varFade().in}>
							Slash Admin
						</m.span>
					)}
				</div>
			</div>

			<ScrollArea
				className={cn("h-[calc(100vh-var(--layout-header-height))] px-2 bg-background", {
					"w-[var(--layout-nav-width)]": themeLayout === ThemeLayout.Vertical,
					"w-[var(--layout-nav-width-mini)]": themeLayout === ThemeLayout.Mini,
				})}
			>
				<m.div variants={varFade().in} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.2 }}>
					{themeLayout === ThemeLayout.Mini ? <NavMini data={data} /> : <NavVertical data={data} />}
				</m.div>
			</ScrollArea>
		</nav>
	);
}
