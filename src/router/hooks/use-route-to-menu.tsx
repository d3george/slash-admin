import { Icon } from "@/components/icon";
import type { NavItemDataProps } from "@/components/nav";
import { useSettings } from "@/store/settingStore";
import { cn } from "@/utils";
import type { GetProp, MenuProps } from "antd";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ThemeLayout } from "#/enum";
import type { AppRouteObject } from "#/router";

type MenuItem = GetProp<MenuProps, "items">[number];

const renderIcon = (icon: string | React.ReactNode): React.ReactNode => {
	if (typeof icon !== "string") return icon;
	return <Icon icon={icon} size={24} />;
};

/**
 *   routes -> menus
 */
export function useRouteToMenuFn() {
	const { t } = useTranslation();
	const { themeLayout } = useSettings();

	const routeToMenuFn = useCallback(
		(items: AppRouteObject[]): MenuItem[] => {
			return items
				.filter((item) => !item.meta?.hideMenu)
				.map((item) => {
					const { meta, children } = item;
					if (!meta) return {} as MenuItem;

					const menuItem: Partial<MenuItem> = {
						key: meta.key,
						disabled: meta.disabled,
						label: (
							<div
								className={cn(
									"inline-flex items-center overflow-hidden",
									themeLayout === ThemeLayout.Horizontal ? "justify-start" : "justify-between",
								)}
							>
								<div className="">{t(meta.label)}</div>
								{meta.suffix}
							</div>
						),
						...(meta.icon && { icon: renderIcon(meta.icon) }),
						...(children && { children: routeToMenuFn(children) }),
					};

					return menuItem as MenuItem;
				});
		},
		[t, themeLayout],
	);
	return routeToMenuFn;
}

export function useRouteToMenu_V1() {
	const { t } = useTranslation();

	const routeToMenuFn = (items: AppRouteObject[]): NavItemDataProps[] => {
		return items
			.filter((item) => !item.meta?.hideMenu)
			.map((item) => {
				const { meta, children } = item;
				if (!meta) return {} as NavItemDataProps;

				const menuItem: NavItemDataProps = {
					path: meta.key,
					title: t(meta.label),
					disabled: meta.disabled,
					icon: meta.icon ? renderIcon(meta.icon) : undefined,
					children: children ? routeToMenuFn(children) : undefined,
				};

				return menuItem;
			});
	};
	return routeToMenuFn;
}
