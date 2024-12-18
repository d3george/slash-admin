import { createContext, useEffect, useMemo } from "react";
import type { ThemeTokens, UILibraryAdapter } from "#/theme";

import {
	baseThemeTokens,
	darkColorTokens,
	lightColorTokens,
	presetsColors,
	typographyTokens,
} from "./core";
import { useSettings } from "@/store/settingStore";
import { ThemeMode } from "#/enum";

interface ThemeContextValue {
	tokens: ThemeTokens;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
	children: React.ReactNode;
	adapter: UILibraryAdapter;
}

export function ThemeProvider({ children, adapter }: ThemeProviderProps) {
	const { themeMode, themeColorPresets } = useSettings();

	const tokens = useMemo(() => {
		const colorTokens =
			themeMode === ThemeMode.Light ? lightColorTokens : darkColorTokens;
		return {
			...baseThemeTokens,
			colors: {
				...colorTokens,
				palette: {
					...colorTokens.palette,
					primary: presetsColors[themeColorPresets],
				},
			},
			typography: typographyTokens,
		} as ThemeTokens;
	}, [themeMode, themeColorPresets]);

	// Update HTML class name to support Tailwind dark mode
	useEffect(() => {
		const root = window.document.documentElement;
		root.classList.remove(ThemeMode.Light, ThemeMode.Dark);
		root.classList.add(themeMode);
	}, [themeMode]);

	return (
		<ThemeContext.Provider value={{ tokens }}>
			{adapter({ tokens, mode: themeMode, children })}
		</ThemeContext.Provider>
	);
}
