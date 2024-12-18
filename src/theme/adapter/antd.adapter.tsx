import type { UILibraryAdapter } from "#/theme";
import type { ThemeConfig } from "antd";
import { App, ConfigProvider, theme } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import useLocale from "@/locales/useLocale";
import { ThemeMode } from "#/enum";
import { darkColorTokens } from "../core";

export const AntdAdapter: UILibraryAdapter = ({ tokens, mode, children }) => {
	const { language } = useLocale();
	const algorithm =
		mode === ThemeMode.Light ? theme.defaultAlgorithm : theme.darkAlgorithm;

	const {
		colors: { palette, background, text },
		typography: { fontSize },
		borderRadius,
		spacing,
	} = tokens;
	const token: ThemeConfig["token"] = {
		colorPrimary: palette.primary.main,
		colorSuccess: palette.success.main,
		colorWarning: palette.warning.main,
		colorError: palette.error.main,
		colorInfo: palette.info.main,

		colorBgLayout: background.default,
		colorBgContainer: background.paper,
		colorBgElevated: background.default,

		wireframe: false,

		borderRadiusSM: borderRadius.sm,
		borderRadius: borderRadius.base,
		borderRadiusLG: borderRadius.lg,
	};

	const components: ThemeConfig["components"] = {
		Breadcrumb: {
			fontSize: fontSize.xs,
			separatorMargin: spacing[1],
		},
		Menu: {
			fontSize: fontSize.sm,
			colorFillAlter: "transparent",
			itemColor: text.secondary,
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
					borderRadius: borderRadius.md,
					fontWeight: 700,
					padding: `0 ${spacing[1]}px`,
					margin: `0 ${spacing[1]}px`,
					fontSize: fontSize.xs,
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
