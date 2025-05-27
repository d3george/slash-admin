import { DB_MENU } from "@/_mock/assets_backup";
import type { MenuMetaInfo, MenuTree } from "@/types/entity";
import { PermissionType } from "@/types/enum";
import { convertFlatToTree } from "@/utils/tree";
import type { RouteObject } from "react-router";
import { Navigate } from "react-router";
import { Component } from "./utils";

/**
 * @param menuPath '/link/external_link'
 * @returns 'external_link'
 */
const getRoutePath = (menuPath?: string) => {
	const pathArr = menuPath?.split("/") || [];
	return pathArr[pathArr.length - 1];
};

/**
 * generate props for menu component
 * @param metaInfo
 * @returns
 */
const generateProps = (metaInfo: MenuMetaInfo) => {
	const props: any = {};
	if (metaInfo.externalLink) {
		props.src = metaInfo.externalLink?.toString() || "";
	}
	return props;
};

const convert = (items: MenuTree[]): RouteObject[] => {
	const routes: RouteObject[] = [];

	const processItem = (item: MenuTree) => {
		// if group, process children
		if (item.type === PermissionType.GROUP) {
			(item.children || []).forEach(processItem);
		}

		// if catalogue, process children
		if (item.type === PermissionType.CATALOGUE) {
			const children = item.children || [];
			if (children.length > 0) {
				const firstChild = children[0];
				if (firstChild.path) {
					routes.push({
						path: getRoutePath(item.path),
						children: [
							{
								index: true,
								element: <Navigate to={getRoutePath(firstChild.path)} replace />,
							},
							...convert(children),
						],
					});
				}
			}
		}

		// if menu, create route
		if (item.type === PermissionType.MENU) {
			const props = generateProps(item);

			routes.push({
				path: getRoutePath(item.path),
				element: Component(item.component, props),
			});
		}
	};

	items.forEach(processItem);
	return routes;
};

export const backendDashboardRoutes = convert(convertFlatToTree(DB_MENU));
