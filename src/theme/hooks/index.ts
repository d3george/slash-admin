import type { ThemeMode } from "#/enum";
import { useSettingActions } from "@/store/settingStore";
import { useSettings } from "@/store/settingStore";
import { useContext } from "react";
import { ThemeContext } from "styled-components";

export { useThemeToken } from "./use-theme-token";
export { useResponsive } from "./use-reponsive";

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within ThemeProvider");
	}
	const { themeMode } = useSettings();
	const { setSettings } = useSettingActions();

	return {
		mode: themeMode,
		setMode: (mode: ThemeMode) => {
			setSettings({
				...useSettings(),
				themeMode: mode,
			});
		},
		tokens: context.tokens,
	};
};

export const useThemeTokens = () => {
	const { tokens } = useTheme();
	return tokens;
};

// 颜色工具 Hook
export const useThemeColor = () => {
	const { tokens } = useTheme();

	return {
		getPaletteColor: (
			color: keyof typeof tokens.colors.palette,
			variant: "lighter" | "light" | "main" | "dark" | "darker" = "main",
		) => tokens.colors.palette[color][variant],

		getTextColor: (variant: keyof typeof tokens.colors.text = "primary") =>
			tokens.colors.text[variant],

		getBackgroundColor: (
			variant: keyof typeof tokens.colors.background = "default",
		) => tokens.colors.background[variant],
	};
};

export const useTypography = () => {
	const { tokens } = useTheme();

	return {
		getFontFamily: (
			variant: keyof typeof tokens.typography.fontFamily = "primary",
		) => tokens.typography.fontFamily[variant],

		getFontSize: (size: keyof typeof tokens.typography.fontSize) =>
			tokens.typography.fontSize[size],

		getFontWeight: (weight: keyof typeof tokens.typography.fontWeight) =>
			tokens.typography.fontWeight[weight],
	};
};

export const useSpacing = () => {
	const { tokens } = useTheme();

	return {
		getSpacing: (size: keyof typeof tokens.spacing) => tokens.spacing[size],
	};
};
