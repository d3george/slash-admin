import { useCallback, useMemo } from "react";

import { flattenMenuRoutes, menuFilter } from "../utils";

import { usePermissionRoutes } from "./use-permission-routes";

/**
 * 返回拍平后的菜单路由
 */
export function useFlattenedRoutes() {
	const flattenRoutes = useCallback(flattenMenuRoutes, []);
	const permissionRoutes = usePermissionRoutes();
	return useMemo(() => {
		const menuRoutes = menuFilter(permissionRoutes);
		return flattenRoutes(menuRoutes);
	}, [flattenRoutes, permissionRoutes]);
}
