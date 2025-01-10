import { useSyncExternalStore } from "react";

import { ThemeMode } from "#/enum";

export const useSystemTheme = () => {
	const subscribe = (callback: () => void) => {
		if (!window) return () => {};

		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

		if (mediaQuery.addEventListener) {
			mediaQuery.addEventListener("change", callback);
			return () => mediaQuery.removeEventListener("change", callback);
		}
		// for old version browsers
		mediaQuery.addListener(callback);
		return () => mediaQuery.removeListener(callback);
	};

	const getSnapshot = () => {
		if (!window) return ThemeMode.Light;

		return window.matchMedia("(prefers-color-scheme: dark)").matches ? ThemeMode.Dark : ThemeMode.Light;
	};

	const getServerSnapshot = () => ThemeMode.Light;

	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
