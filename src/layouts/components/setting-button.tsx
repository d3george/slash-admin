import CyanBlur from "@/assets/images/background/cyan-blur.png";
import RedBlur from "@/assets/images/background/red-blur.png";
import { Icon } from "@/components/icon";
import { type SettingsType, useSettingActions, useSettings } from "@/store/settingStore";
import { themeVars } from "@/theme/theme.css";
import { presetsColors } from "@/theme/tokens/color";
import { FontFamilyPreset } from "@/theme/tokens/typography";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { ScrollArea } from "@/ui/scroll-area";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/ui/sheet";
import { Slider } from "@/ui/slider";
import { Switch } from "@/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/ui/tooltip";
import { Text } from "@/ui/typography";
import { cn } from "@/utils";
import { type CSSProperties, useCallback, useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import screenfull from "screenfull";
import { type ThemeColorPresets, ThemeLayout, ThemeMode } from "#/enum";

export default function SettingButton() {
	const { t } = useTranslation();
	const settings = useSettings();
	const { themeMode, themeColorPresets, themeLayout, themeStretch, breadCrumb, fontSize, fontFamily } = settings;
	const { setSettings } = useSettingActions();

	const updateSettings = (partialSettings: Partial<SettingsType>) => {
		setSettings({
			...settings,
			...partialSettings,
		});
	};

	const sheetContentBgStyle: CSSProperties = {
		backdropFilter: "blur(20px)",
		backgroundImage: `url("${CyanBlur}"), url("${RedBlur}")`,
		backgroundRepeat: "no-repeat, no-repeat",
		backgroundPosition: "right top, left bottom",
		backgroundSize: "50%, 50%",
	};

	const [isFullscreen, setIsFullscreen] = useState(screenfull.isFullscreen);
	const toggleFullScreen = () => {
		if (screenfull.isEnabled) {
			screenfull.toggle();
		}
	};
	const handleKeyDown = useCallback((event: KeyboardEvent) => {
		if (event.key === "Escape" && screenfull.isEnabled && screenfull.isFullscreen) {
			setIsFullscreen(false);
		}
	}, []);

	useEffect(() => {
		const onFullscreenChange = () => {
			if (screenfull.isEnabled) {
				setIsFullscreen(screenfull.isFullscreen);
			}
		};

		if (screenfull.isEnabled) {
			screenfull.on("change", onFullscreenChange);
		}

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			if (screenfull.isEnabled) {
				screenfull.off("change", onFullscreenChange);
			}
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [handleKeyDown]);
	const layoutBackground = (layout: ThemeLayout) =>
		themeLayout === layout ? themeVars.colors.palette.primary.light : themeVars.colors.palette.gray[500];

	return (
		<Sheet modal={false}>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon" className="rounded-full animate-slow-spin">
					<Icon icon="local:ic-setting" size={24} />
				</Button>
			</SheetTrigger>
			<SheetContent style={sheetContentBgStyle} className="gap-0" onOpenAutoFocus={(e) => e.preventDefault()}>
				<SheetHeader className="flex flex-row items-center justify-between px-6 py-4 shrink-0">
					<SheetTitle>{t("sys.settings.title")}</SheetTitle>
					<SheetDescription />
				</SheetHeader>
				<ScrollArea>
					<div className="flex flex-col gap-6 px-6 py-2">
						{/* theme mode */}
						<div className="flex flex-col gap-2">
							<Text variant="subTitle1">{t("sys.settings.mode")}</Text>
							<div className="flex flex-row gap-4">
								<Card
									onClick={() => updateSettings({ themeMode: ThemeMode.Light })}
									className="flex flex-1 h-20 cursor-pointer items-center justify-center"
								>
									<Icon
										icon="local:ic-settings-mode-sun"
										size="24"
										color={themeMode === ThemeMode.Light ? themeVars.colors.palette.primary.default : ""}
									/>
								</Card>
								<Card
									onClick={() => updateSettings({ themeMode: ThemeMode.Dark })}
									className="flex flex-1 h-20 cursor-pointer items-center justify-center"
								>
									<Icon
										icon="local:ic-settings-mode-moon"
										size="24"
										color={themeMode === ThemeMode.Dark ? themeVars.colors.palette.primary.default : ""}
									/>
								</Card>
							</div>
						</div>

						{/* theme layout */}
						<div className="flex flex-col gap-2">
							<Text variant="subTitle1">{t("sys.settings.layout")}</Text>

							<div className="grid grid-cols-3 gap-4">
								{/* vertical */}
								<Card
									onClick={() => updateSettings({ themeLayout: ThemeLayout.Vertical })}
									className="flex h-16 cursor-pointer flex-1 flex-row p-0 gap-1"
								>
									<div className="flex h-full w-5 flex-col gap-1 p-1">
										<div
											className="h-2 w-2 shrink-0 rounded"
											style={{
												background: layoutBackground(ThemeLayout.Vertical),
											}}
										/>
										<div
											className="h-1 w-full shrink-0 rounded opacity-50"
											style={{
												background: layoutBackground(ThemeLayout.Vertical),
											}}
										/>
										<div
											className="h-1 max-w-[12px] shrink-0 rounded opacity-20"
											style={{
												background: layoutBackground(ThemeLayout.Vertical),
											}}
										/>
									</div>
									<div className="h-full w-full flex-1 grow p-1 flex flex-col gap-1">
										<div
											className="w-full h-1.5 rounded opacity-20"
											style={{ background: layoutBackground(ThemeLayout.Vertical) }}
										/>
										<div
											className={cn(
												"flex-1 w-full rounded opacity-20 mx-auto transition-all duration-300 ease-in-out",
												!themeStretch && "w-10",
											)}
											style={{
												background: layoutBackground(ThemeLayout.Vertical),
											}}
										/>
									</div>
								</Card>

								{/* mini */}
								<Card
									onClick={() => updateSettings({ themeLayout: ThemeLayout.Mini })}
									className="h-16 cursor-pointer flex-1 p-0 gap-0 flex-row"
								>
									<div className="flex h-full w-3 gap-1 p-1 items-center flex-0 flex-col">
										<div
											className="h-2 w-2 shrink-0 rounded"
											style={{ background: layoutBackground(ThemeLayout.Mini) }}
										/>
										<div
											className="h-1 w-full shrink-0 rounded opacity-50"
											style={{ background: layoutBackground(ThemeLayout.Mini) }}
										/>
										<div
											className="h-1 w-full shrink-0 rounde opacity-20"
											style={{ background: layoutBackground(ThemeLayout.Mini) }}
										/>
									</div>
									<div className="h-full w-full flex-1 grow p-1 flex flex-col gap-1">
										<div
											className="w-full h-1.5 rounded opacity-20"
											style={{ background: layoutBackground(ThemeLayout.Mini) }}
										/>
										<div
											className={cn(
												"flex-1 w-full rounded opacity-20 mx-auto transition-all duration-300 ease-in-out",
												!themeStretch && "w-10",
											)}
											style={{
												background: layoutBackground(ThemeLayout.Mini),
											}}
										/>
									</div>
								</Card>

								{/* horizontal */}
								<Card
									onClick={() => updateSettings({ themeLayout: ThemeLayout.Horizontal })}
									className="flex h-16 cursor-pointer flex-1 p-0 gap-0"
								>
									<div className="flex h-full w-full gap-1 p-1 items-center flex-0">
										<div
											className="h-2 w-2 shrink-0 rounded"
											style={{
												background: layoutBackground(ThemeLayout.Horizontal),
											}}
										/>
										<div
											className="h-1 w-4 shrink-0 rounded opacity-50"
											style={{
												background: layoutBackground(ThemeLayout.Horizontal),
											}}
										/>
										<div
											className="h-1 w-3 shrink-0 rounded opacity-20"
											style={{
												background: layoutBackground(ThemeLayout.Horizontal),
											}}
										/>
									</div>
									<div
										className="h-1.5 rounded opacity-20 mx-1"
										style={{ background: layoutBackground(ThemeLayout.Horizontal) }}
									/>
									<div className="h-full w-full flex-1 grow p-1 flex flex-col gap-1">
										<div
											className={cn(
												"h-full w-full rounded opacity-20 mx-auto transition-all duration-300 ease-in-out",
												!themeStretch && "w-10",
											)}
											style={{
												background: layoutBackground(ThemeLayout.Horizontal),
											}}
										/>
									</div>
								</Card>
							</div>
							<div className="flex flex-row items-center justify-between">
								<Tooltip delayDuration={700} defaultOpen={false} disableHoverableContent>
									<TooltipTrigger>
										<Text variant="subTitle2">{t("sys.settings.stretch")}</Text>
										<Icon icon="solar:question-circle-linear" className="ml-1" />
									</TooltipTrigger>
									<TooltipContent>{t("sys.settings.stretchTip")}</TooltipContent>
								</Tooltip>
								<Switch
									checked={themeStretch}
									onCheckedChange={(checked) => updateSettings({ themeStretch: checked })}
								/>
							</div>
						</div>

						{/* theme presets */}
						<div className="flex flex-col gap-2">
							<Text variant="subTitle1">{t("sys.settings.presetThemes")}</Text>
							<div className="flex flex-wrap gap-1">
								{Object.entries(presetsColors).map(([preset, color]) => (
									<div
										key={preset}
										className={cn(
											"relative flex h-13 w-5 cursor-pointer items-center justify-center rounded transition-all duration-300 ease-in-out p-1",
											themeColorPresets === preset && "w-13",
										)}
										style={{ backgroundColor: color.default }}
										onClick={() => updateSettings({ themeColorPresets: preset as ThemeColorPresets })}
									>
										<div
											className={cn(
												"w-full h-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 ease-in-out rounded",
												themeColorPresets === preset && "bg-white/30",
											)}
										>
											{themeColorPresets === preset && <Icon icon="bi:check-all" size={24} color="white" />}
										</div>
									</div>
								))}
							</div>
						</div>

						{/* font */}
						<div className="flex flex-col gap-2">
							<Text variant="subTitle1">{t("sys.settings.font")}</Text>

							<Text variant="subTitle2">{t("sys.settings.family")}</Text>
							<div className="flex flex-row gap-3">
								{Object.entries(FontFamilyPreset).map(([font, family]) => (
									<Card
										key={font}
										className={cn(
											"flex h-20 w-full cursor-pointer items-center justify-center text-text-disabled",
											fontFamily === family && "text-primary font-medium",
											family === FontFamilyPreset.inter && "font-inter",
											family === FontFamilyPreset.openSans && "font-openSans",
										)}
										onClick={() => updateSettings({ fontFamily: family })}
									>
										<div className="text-center text-lg">
											<span>A</span>
											<span className="opacity-50 ml-0.5">a</span>
										</div>
										<span className="text-sm text-text-primary">{family.replace("Variable", "")}</span>
									</Card>
								))}
							</div>

							<Text variant="subTitle2">{t("sys.settings.size")}</Text>
							<Slider
								min={12}
								max={20}
								step={1}
								defaultValue={[fontSize]}
								onValueChange={(value) => updateSettings({ fontSize: value[0] })}
							/>
						</div>

						{/* Page config */}
						<div className="flex flex-col gap-2">
							<Text variant="subTitle1">{t("sys.settings.page")}</Text>
							<div className="flex items-center justify-between">
								<Text variant="subTitle2">{t("sys.settings.breadcrumb")}</Text>
								<Switch checked={breadCrumb} onCheckedChange={(checked) => updateSettings({ breadCrumb: checked })} />
								{/* <div className="flex items-center justify-between text-sm text-text-disabled">
									<div>{t("sys.settings.multiTab")}</div>
									<Switch checked={multiTab} onCheckedChange={(checked) => updateSettings({ multiTab: checked })} />
								</div> */}
								{/* <div className="flex items-center justify-between text-sm text-text-disabled">
									<div>{t("sys.settings.darkSidebar")}</div>
									<Switch checked={darkSidebar} onCheckedChange={(checked) => updateSettings({ darkSidebar: checked })} />
								</div> */}
								{/* <div className="flex items-center justify-between text-sm text-text-disabled">
									<div>{t("sys.settings.accordion")}</div>
									<Switch checked={accordion} onCheckedChange={(checked) => updateSettings({ accordion: checked })} />
								</div> */}
							</div>
						</div>
					</div>
				</ScrollArea>
				<SheetFooter className="px-6 py-4 border border-t shrink-0">
					<Button
						variant="outline"
						className="w-full border-dashed text-text-primary hover:border-primary hover:text-primary"
						onClick={toggleFullScreen}
					>
						<div
							className="flex items-center justify-center"
							aria-label={isFullscreen ? t("sys.settings.exitFullscreen") : t("sys.settings.fullscreen")}
						>
							{isFullscreen ? (
								<>
									<Icon icon="local:ic-settings-exit-fullscreen" />
									<span className="ml-2">{t("sys.settings.exitFullscreen")}</span>
								</>
							) : (
								<>
									<Icon icon="local:ic-settings-fullscreen" />
									<span className="ml-2">{t("sys.settings.fullscreen")}</span>
								</>
							)}
						</div>
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
