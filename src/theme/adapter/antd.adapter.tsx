import useLocale from "@/locales/useLocale";
import { StyleProvider } from "@ant-design/cssinjs";
import type { ThemeConfig } from "antd";
import { App, ConfigProvider, theme } from "antd";
import { ThemeMode } from "#/enum";
import type { UILibraryAdapter } from "#/theme";
import { baseThemeTokens } from "../tokens/base";
import { darkColorTokens, lightColorTokens, presetsColors } from "../tokens/color";

import { useSettings } from "@/store/settingStore";
import { typographyTokens } from "../tokens/typography";

export const AntdAdapter: UILibraryAdapter = ({ mode, children }) => {
	const { language } = useLocale();
	const { themeColorPresets } = useSettings();
	const algorithm = mode === ThemeMode.Light ? theme.defaultAlgorithm : theme.darkAlgorithm;

	const colorTokens = mode === ThemeMode.Light ? lightColorTokens : darkColorTokens;

	const primaryColorToken = presetsColors[themeColorPresets];

	const token: ThemeConfig["token"] = {
		colorPrimary: primaryColorToken.main,
		colorSuccess: colorTokens.palette.success.main,
		colorWarning: colorTokens.palette.warning.main,
		colorError: colorTokens.palette.error.main,
		colorInfo: colorTokens.palette.info.main,

		colorBgLayout: colorTokens.background.default,
		colorBgContainer: colorTokens.background.paper,
		colorBgElevated: colorTokens.background.default,

		wireframe: false,

		borderRadiusSM: Number(baseThemeTokens.borderRadius.sm),
		borderRadius: Number(baseThemeTokens.borderRadius.base),
		borderRadiusLG: Number(baseThemeTokens.borderRadius.lg),
	};

	const components: ThemeConfig["components"] = {
		Breadcrumb: {
			fontSize: Number(typographyTokens.fontSize.xs),
			separatorMargin: Number(baseThemeTokens.spacing[1]),
		},
		Menu: {
			fontSize: Number(typographyTokens.fontSize.sm),
			colorFillAlter: "transparent",
			itemColor: colorTokens.text.secondary,
			motionDurationMid: "0.125s",
			motionDurationSlow: "0.125s",
			darkItemBg: darkColorTokens.background.default,
		},
		Layout: {
			siderBg: darkColorTokens.background.default,
		},
	};

	return (
		<ConfigProvider
			locale={language.antdLocal}
			theme={{ algorithm, token, components }}
			tag={{
				style: {
					borderRadius: Number(baseThemeTokens.borderRadius.md),
					fontWeight: 700,
					padding: `0 ${Number(baseThemeTokens.spacing[1])}px`,
					margin: `0 ${Number(baseThemeTokens.spacing[1])}px`,
					fontSize: Number(typographyTokens.fontSize.xs),
					borderWidth: 0,
				},
			}}
		>
			<StyleProvider hashPriority="high">
				<App>{children}</App>
			</StyleProvider>
		</ConfigProvider>
	);
};
