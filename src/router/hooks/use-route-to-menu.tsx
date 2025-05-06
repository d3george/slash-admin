import { Icon } from "@/components/icon";
import type { NavItemDataProps } from "@/components/nav";
import { useTranslation } from "react-i18next";
import type { AppRouteObject } from "#/router";

const renderIcon = (icon: string | React.ReactNode): React.ReactNode => {
	if (typeof icon !== "string") return icon;
	return <Icon icon={icon} size={24} />;
};

export function useRouteToMenu() {
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
					info: meta.info,
				};

				return menuItem;
			});
	};
	return routeToMenuFn;
}
