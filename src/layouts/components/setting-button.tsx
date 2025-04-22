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
import { cn } from "@/utils";
import { type CSSProperties, useState } from "react";
import { useTranslation } from "react-i18next";
import screenfull from "screenfull";
import { type ThemeColorPresets, ThemeLayout, ThemeMode } from "#/enum";

export default function SettingButton() {
	const { t } = useTranslation();
	const settings = useSettings();
	const {
		themeMode,
		themeColorPresets,
		themeLayout,
		themeStretch,
		breadCrumb,
		darkSidebar,
		fontSize,
		fontFamily,
		accordion,
	} = settings;
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
		backgroundColor: `rgba(${themeVars.colors.background.paperChannel} / 0.9)`,
		backgroundPosition: "right top, left bottom",
		backgroundSize: "50, 50%",
	};

	const [isFullscreen, setIsFullscreen] = useState(screenfull.isFullscreen);
	const toggleFullScreen = () => {
		if (screenfull.isEnabled) {
			screenfull.toggle();
			setIsFullscreen(!isFullscreen);
		}
	};

	const layoutBackground = (layout: ThemeLayout) =>
		themeLayout === layout
			? `linear-gradient(135deg, ${themeVars.colors.background.neutral} 0%, ${themeVars.colors.palette.primary.default} 100%)`
			: themeVars.colors.palette.gray[500];

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon" className="rounded-full animate-slow-spin">
					<Icon icon="local:ic-setting" size={24} />
				</Button>
			</SheetTrigger>
			<SheetContent style={sheetContentBgStyle} className="gap-0">
				<SheetHeader className="flex flex-row items-center justify-between px-6 py-4 border border-b shrink-0">
					<SheetTitle>{t("sys.settings.title")}</SheetTitle>
					<SheetDescription />
				</SheetHeader>
				<ScrollArea>
					<div className="flex flex-col gap-6 p-6">
						{/* theme mode */}
						<div>
							<div className="mb-3 text-base font-semibold text-text-secondary">{t("sys.settings.mode")}</div>
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
						<div>
							<div className="mb-3 text-base font-semibold text-text-secondary">{t("sys.settings.layout")}</div>
							<div className="grid grid-cols-3 gap-4">
								<Card
									onClick={() => updateSettings({ themeLayout: ThemeLayout.Vertical })}
									className="flex h-16 cursor-pointer flex-1 flex-row p-0 gap-1"
								>
									<div className="flex h-full w-7 flex-col gap-1 p-1">
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
									<div className="h-full w-full flex-1 grow p-1">
										<div
											className="h-full w-full rounded opacity-20"
											style={{
												background: layoutBackground(ThemeLayout.Vertical),
											}}
										/>
									</div>
								</Card>
								<Card
									onClick={() => updateSettings({ themeLayout: ThemeLayout.Horizontal })}
									className="flex h-16 cursor-pointer flex-1 p-0 gap-0"
								>
									<div className="flex h-full w-7 gap-1 p-1 items-center flex-0">
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
									<div className="h-full w-full flex-1 grow p-1">
										<div
											className="h-full w-full rounded opacity-20"
											style={{
												background: layoutBackground(ThemeLayout.Horizontal),
											}}
										/>
									</div>
								</Card>
								<Card
									onClick={() => updateSettings({ themeLayout: ThemeLayout.Mini })}
									className="h-16 cursor-pointer flex-1 p-0 gap-0 flex-row"
								>
									<div className="flex h-full w-7 gap-1 p-1 items-center flex-0 flex-col">
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
									<div className="h-full w-full flex-1 grow p-1">
										<div
											className="h-full w-full rounded opacity-20"
											style={{ background: layoutBackground(ThemeLayout.Mini) }}
										/>
									</div>
								</Card>
							</div>
						</div>

						{/* theme stretch */}
						<div>
							<div className="mb-3 text-base font-semibold text-text-secondary">
								<span className="mr-2">{t("sys.settings.stretch")}</span>
								<Tooltip>
									<TooltipTrigger>
										<Icon icon="solar:question-circle-linear" />
									</TooltipTrigger>
									<TooltipContent>{t("sys.settings.stretchTip")}</TooltipContent>
								</Tooltip>
							</div>

							<Card
								onClick={() => updateSettings({ themeStretch: !themeStretch })}
								className="flex h-20 w-full cursor-pointer items-center justify-center"
							>
								<div
									className={cn("flex w-1/2 items-center justify-between", themeStretch && "w-full")}
									style={{
										transition: "width 300ms 0ms",
									}}
								>
									<Icon
										icon={themeStretch ? "solar:alt-arrow-left-outline" : "solar:alt-arrow-right-outline"}
										size={20}
									/>
									<div className="flex grow border-b border-dashed" />
									<Icon
										icon={themeStretch ? "solar:alt-arrow-left-outline" : "solar:alt-arrow-right-outline"}
										size={20}
									/>
								</div>
							</Card>
						</div>

						{/* theme presets */}
						<div>
							<div className="mb-3 text-base font-semibold text-text-secondary">{t("sys.settings.presetThemes")}</div>
							<div className="grid grid-cols-3 gap-x-4 gap-y-3">
								{Object.entries(presetsColors).map(([preset, color]) => (
									<Card
										key={preset}
										className="flex h-12 w-full cursor-pointer items-center justify-center"
										onClick={() => updateSettings({ themeColorPresets: preset as ThemeColorPresets })}
									>
										<div style={{ color: color.default }}>
											<Icon
												icon="mdi:circle"
												className={cn(
													"scale-100 transition-all duration-300 ease-in-out",
													themeColorPresets === preset && "scale-150",
												)}
											/>
										</div>
									</Card>
								))}
							</div>
						</div>

						{/* font */}
						<div>
							<div className="mb-3 text-base font-semibold text-text-secondary">{t("sys.settings.font")}</div>

							<div className="my-3 text-sm font-semibold text-text-disabled">{t("sys.settings.family")}</div>
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

							<div className="my-4 text-sm font-semibold text-text-disabled">{t("sys.settings.size")}</div>
							<Slider
								min={12}
								max={20}
								step={1}
								defaultValue={[fontSize]}
								onValueChange={(value) => updateSettings({ fontSize: value[0] })}
							/>
						</div>

						{/* Page config */}
						<div>
							<div className="mb-3 text-base font-semibold text-text-secondary">{t("sys.settings.page")}</div>
							<div className="flex flex-col gap-2">
								<div className="flex items-center justify-between text-sm text-text-disabled">
									<div>{t("sys.settings.breadcrumb")}</div>
									<Switch checked={breadCrumb} onCheckedChange={(checked) => updateSettings({ breadCrumb: checked })} />
								</div>
								{/* <div className="flex items-center justify-between text-sm text-text-disabled">
									<div>{t("sys.settings.multiTab")}</div>
									<Switch checked={multiTab} onCheckedChange={(checked) => updateSettings({ multiTab: checked })} />
								</div> */}
								<div className="flex items-center justify-between text-sm text-text-disabled">
									<div>{t("sys.settings.darkSidebar")}</div>
									<Switch
										checked={darkSidebar}
										onCheckedChange={(checked) => updateSettings({ darkSidebar: checked })}
									/>
								</div>
								<div className="flex items-center justify-between text-sm text-text-disabled">
									<div>{t("sys.settings.accordion")}</div>
									<Switch checked={accordion} onCheckedChange={(checked) => updateSettings({ accordion: checked })} />
								</div>
							</div>
						</div>
					</div>
				</ScrollArea>
				<SheetFooter className="px-6 py-4 border border-t shrink-0 z-[2000]">
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
