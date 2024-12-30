import { useRouter } from "@/router/hooks";
import { type Dispatch, type SetStateAction, useCallback } from "react";
import type { KeepAliveTab } from "../types";

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

export function useTabOperations(
	tabs: KeepAliveTab[],
	setTabs: Dispatch<SetStateAction<KeepAliveTab[]>>,
	activeTabRoutePath: string,
) {
	const { push } = useRouter();

	const closeTab = useCallback(
		(path = activeTabRoutePath) => {
			const tempTabs = [...tabs];
			if (tempTabs.length === 1) return;

			const deleteTabIndex = tempTabs.findIndex((item) => item.key === path);
			if (deleteTabIndex === -1) return;

			if (deleteTabIndex > 0) {
				push(tempTabs[deleteTabIndex - 1].key);
			} else {
				push(tempTabs[deleteTabIndex + 1].key);
			}

			tempTabs.splice(deleteTabIndex, 1);
			setTabs(tempTabs);
		},
		[activeTabRoutePath, push, tabs, setTabs],
	);

	const closeOthersTab = useCallback(
		(path = activeTabRoutePath) => {
			setTabs((prev) => prev.filter((item) => item.key === path));
			if (path !== activeTabRoutePath) {
				push(path);
			}
		},
		[activeTabRoutePath, push, setTabs],
	);

	const closeAll = useCallback(() => {
		setTabs([]);
		push(HOMEPAGE);
	}, [push, setTabs]);

	const closeLeft = useCallback(
		(path: string) => {
			const currentTabIndex = tabs.findIndex((item) => item.key === path);
			const newTabs = tabs.slice(currentTabIndex);
			setTabs(newTabs);
			push(path);
		},
		[push, tabs, setTabs],
	);

	const closeRight = useCallback(
		(path: string) => {
			const currentTabIndex = tabs.findIndex((item) => item.key === path);
			const newTabs = tabs.slice(0, currentTabIndex + 1);
			setTabs(newTabs);
			push(path);
		},
		[push, tabs, setTabs],
	);

	const refreshTab = useCallback(
		(path = activeTabRoutePath) => {
			setTabs((prev) => {
				const newTabs = [...prev];
				const index = newTabs.findIndex((item) => item.key === path);
				if (index >= 0) {
					newTabs[index] = {
						...newTabs[index],
						timeStamp: new Date().getTime().toString(),
					};
				}
				return newTabs;
			});
		},
		[activeTabRoutePath, setTabs],
	);

	return {
		closeTab,
		closeOthersTab,
		closeAll,
		closeLeft,
		closeRight,
		refreshTab,
	};
}
