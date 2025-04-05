import { useSettings } from "@/store/settingStore";
import { useEffect } from "react";
import { HtmlDataAttribute } from "#/enum";
import type { UILibraryAdapter } from "./type";
interface ThemeProviderProps {
	children: React.ReactNode;
	adapters?: UILibraryAdapter[];
}

export function ThemeProvider({ children, adapters = [] }: ThemeProviderProps) {
	const { themeMode, themeColorPresets, fontFamily, fontSize } = useSettings();

	// Update HTML class to support Tailwind dark mode
	useEffect(() => {
		const root = window.document.documentElement;
		root.setAttribute(HtmlDataAttribute.ThemeMode, themeMode);
	}, [themeMode]);

	// Dynamically update theme color related CSS variables
	useEffect(() => {
		const root = window.document.documentElement;
		root.setAttribute(HtmlDataAttribute.ColorPalette, themeColorPresets);
	}, [themeColorPresets]);

	// Update font size and font family
	useEffect(() => {
		const root = window.document.documentElement;
		root.style.fontSize = `${fontSize}px`;

		const body = window.document.body;
		body.style.fontFamily = fontFamily;
	}, [fontFamily, fontSize]);

	// Wrap children with adapters
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
