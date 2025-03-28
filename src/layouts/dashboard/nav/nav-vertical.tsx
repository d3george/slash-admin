import Scrollbar from "@/components/scrollbar";
import { useFlattenedRoutes, usePathname, usePermissionRoutes, useRouteToMenuFn } from "@/router/hooks";
import { menuFilter } from "@/router/utils";
import { useSettingActions, useSettings } from "@/store/settingStore";
import { Layout, Menu, type MenuProps } from "antd";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";

import { NAV_WIDTH } from "../config";

import NavLogo from "./nav-logo";

import type { ItemType } from "antd/es/menu/interface";
import { ThemeLayout, ThemeMode } from "#/enum";

const { Sider } = Layout;

/**
 * 获取菜单项的层级和父级key数组
 * @param items 菜单项数组或单个菜单项
 * @param targetKey 目标key
 * @returns [层级, 父级key数组]，如果未找到返回[0, []]
 */
const getKeyLevelAndParentKeys = (
	items: ItemType[] | ItemType | null | undefined,
	targetKey: string,
): [number, string[]] => {
	if (!items || !targetKey) return [0, []];

	const findLevelAndParents = (
		items: ItemType[] | ItemType,
		targetKey: string,
		level = 1,
		parentKeys: string[] = [],
	): [number, string[]] => {
		const menuItems = Array.isArray(items) ? items : [items];

		if (!menuItems?.length) return [0, []];

		for (const item of menuItems) {
			if (!item) continue;
			const itemKey = typeof item.key === "string" ? item.key : String(item.key);
			if (itemKey === targetKey) return [level, parentKeys];

			if ("children" in item && Array.isArray(item.children)) {
				const [childLevel, childParents] = findLevelAndParents(item.children, targetKey, level + 1, [
					...parentKeys,
					itemKey,
				]);
				if (childLevel > 0) return [childLevel, childParents];
			}
		}
		return [0, []];
	};

	return findLevelAndParents(items, targetKey);
};

function NavVertical({
	closeSideBarDrawer,
}: {
	closeSideBarDrawer?: () => void;
}) {
	const navigate = useNavigate();
	const pathname = usePathname();

	const settings = useSettings();
	const { themeLayout, themeMode, darkSidebar } = settings;
	const { setSettings } = useSettingActions();

	const routeToMenuFn = useRouteToMenuFn();
	const permissionRoutes = usePermissionRoutes();
	const flattenedRoutes = useFlattenedRoutes();

	const collapsed = useMemo(() => themeLayout === ThemeLayout.Mini, [themeLayout]);

	const menuList = useMemo(() => {
		const menuRoutes = menuFilter(permissionRoutes);
		return routeToMenuFn(menuRoutes);
	}, [routeToMenuFn, permissionRoutes]);

	const [selectedKey, setSelectedKey] = useState(pathname);
	const selectedKeys = useMemo(() => [selectedKey], [selectedKey]);

	const [openKeys, setOpenKeys] = useState<string[]>([]);

	const handleToggleCollapsed = () => {
		setSettings({
			...settings,
			themeLayout: collapsed ? ThemeLayout.Vertical : ThemeLayout.Mini,
		});
		if (collapsed) {
			const [, parentKeys] = getKeyLevelAndParentKeys(menuList, pathname);
			// hack resolution of https://github.com/d3george/slash-admin/issues/104
			setTimeout(() => {
				setOpenKeys([...new Set([...parentKeys, pathname])]);
			}, 0);
			return;
		}
	};

	const onClick: MenuProps["onClick"] = ({ key }) => {
		const nextLink = flattenedRoutes?.find((e) => e.key === key);
		if (nextLink?.hideTab && nextLink?.frameSrc) {
			window.open(nextLink?.frameSrc, "_blank");
			return;
		}

		setSelectedKey(key);
		navigate(key);
		closeSideBarDrawer?.();
	};

	const handleOpenChange = useCallback(
		(keys: string[]) => {
			if (!settings.accordion) {
				setOpenKeys(keys);
				return;
			}

			// 手风琴模式
			const latestOpenKey = keys.find((key) => !openKeys.includes(key));
			// 收起
			if (!latestOpenKey) {
				const closedKey = openKeys.find((key) => !keys.includes(key));
				if (closedKey) {
					// 只移除被收起的菜单，保留其他展开状态
					setOpenKeys(openKeys.filter((key) => key !== closedKey));
				}
				return;
			}

			// 展开
			const [, parentKeys] = getKeyLevelAndParentKeys(menuList, latestOpenKey);
			setOpenKeys([...new Set([...parentKeys, latestOpenKey])]);
		},
		[menuList, openKeys, settings.accordion],
	);

	const sidebarTheme = useMemo(() => {
		if (themeMode === ThemeMode.Dark) {
			return darkSidebar ? "light" : "dark";
		}
		return darkSidebar ? "dark" : "light";
	}, [themeMode, darkSidebar]);

	// 监听路由变化
	useEffect(() => {
		setSelectedKey(pathname);

		const currentKey = pathname;
		if (collapsed) return;

		const [, parentKeys] = getKeyLevelAndParentKeys(menuList, currentKey);
		if (settings.accordion) {
			setOpenKeys([...new Set([...parentKeys, currentKey])]);
		} else {
			setOpenKeys((prev) => [...new Set([...prev, ...parentKeys, currentKey])]);
		}
	}, [pathname, menuList, settings.accordion, collapsed]);

	return (
		<Sider
			trigger={null}
			collapsible
			collapsed={collapsed}
			width={NAV_WIDTH}
			theme={sidebarTheme}
			className="!fixed left-0 top-0 h-screen border-r border-dashed border-border"
		>
			<div className="flex h-full flex-col">
				<NavLogo collapsed={collapsed} onToggle={handleToggleCollapsed} />

				<Scrollbar>
					<Menu
						mode="inline"
						items={menuList}
						theme={sidebarTheme}
						selectedKeys={selectedKeys}
						openKeys={openKeys}
						onOpenChange={handleOpenChange}
						className="!border-none"
						onClick={onClick}
					/>
				</Scrollbar>
			</div>
		</Sider>
	);
}

export default memo(NavVertical);
