// types.ts
import type { RouteMeta } from "#/router";
import type { CSSProperties, ReactNode } from "react";
import type { MenuProps } from "antd";

export type KeepAliveTab = RouteMeta & {
	children: ReactNode;
	timeStamp?: string;
};

export type MultiTabsContextType = {
	tabs: KeepAliveTab[];
	activeTabRoutePath?: string;
	setTabs: (tabs: KeepAliveTab[]) => void;
	closeTab: (path?: string) => void;
	closeOthersTab: (path?: string) => void;
	closeAll: () => void;
	closeLeft: (path: string) => void;
	closeRight: (path: string) => void;
	refreshTab: (path: string) => void;
};

export type TabItemProps = {
	tab: KeepAliveTab;
	isActive: boolean;
	isHovering: boolean;
	style: CSSProperties;
	onClose: () => void;
	onMouseEnter: () => void;
	onMouseLeave: () => void;
};

export type TabDropdownProps = {
	menuItems: MenuProps["items"];
	menuClick: (menuInfo: any, tab: KeepAliveTab) => void;
};
