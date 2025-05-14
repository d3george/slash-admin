import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useTabOperations } from "../hooks/use-tab-operations";
import type { KeepAliveTab, MultiTabsContextType } from "../types";

const MultiTabsContext = createContext<MultiTabsContextType>({
	tabs: [],
	activeTabRoutePath: "",
	setTabs: () => {},
	closeTab: () => {},
	closeOthersTab: () => {},
	closeAll: () => {},
	closeLeft: () => {},
	closeRight: () => {},
	refreshTab: () => {},
});

export function MultiTabsProvider({ children }: { children: React.ReactNode }) {
	const [tabs, setTabs] = useState<KeepAliveTab[]>([]);
	const currentRouteMeta = {
		key: "/",
		label: "Home",
		hideTab: false,
		children: null,
		outlet: null,
		params: {},
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const activeTabRoutePath = useMemo(() => {
		if (!currentRouteMeta) return "";
		const { key } = currentRouteMeta;
		return key;
	}, [currentRouteMeta]);

	const operations = useTabOperations(tabs, setTabs, activeTabRoutePath);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (!currentRouteMeta) return;

		setTabs((prev) => {
			const filtered = prev.filter((item) => !item.hideTab);

			const { key, outlet: children } = currentRouteMeta;

			const isExisted = filtered.find((item) => item.key === key);
			if (!isExisted) {
				return [
					...filtered,
					{
						...currentRouteMeta,
						key,
						children,
						timeStamp: new Date().getTime().toString(),
					},
				];
			}

			return filtered;
		});
	}, [currentRouteMeta]);

	const contextValue = useMemo(
		() => ({
			tabs,
			activeTabRoutePath,
			setTabs,
			...operations,
		}),
		[tabs, activeTabRoutePath, operations],
	);

	return <MultiTabsContext.Provider value={contextValue}>{children}</MultiTabsContext.Provider>;
}

export function useMultiTabsContext() {
	return useContext(MultiTabsContext);
}
