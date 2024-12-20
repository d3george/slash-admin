import { useSettings } from "@/store/settingStore";
import { hexToRgbString } from "@/utils/theme";
import { useEffect } from "react";
import { ThemeMode } from "#/enum";
import type { UILibraryAdapter } from "#/theme";
import { presetsColors } from "./tokens/color";

interface ThemeProviderProps {
	children: React.ReactNode;
	adapters?: UILibraryAdapter[];
}

export function ThemeProvider({ children, adapters = [] }: ThemeProviderProps) {
	const { themeMode, themeColorPresets } = useSettings();

	// 更新 HTML class 以支持 Tailwind 暗模式
	useEffect(() => {
		const root = window.document.documentElement;
		root.classList.remove(ThemeMode.Light, ThemeMode.Dark);
		root.classList.add(themeMode);
	}, [themeMode]);

	// 动态更新主题色
	useEffect(() => {
		const root = window.document.documentElement;
		const primaryColors = presetsColors[themeColorPresets];
		for (const [key, value] of Object.entries(primaryColors)) {
			root.style.setProperty(`--colors-palette-primary-${key}`, hexToRgbString(value));
		}
	}, [themeColorPresets]);

	// 包装子组件与适配器
	const wrappedWithAdapters = adapters.reduce(
		(children, Adapter) => (
			<Adapter key={Adapter.name} mode={themeMode}>
				{children}
			</Adapter>
		),
		children,
	);

	return wrappedWithAdapters;
}
