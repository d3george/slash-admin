import { isEmpty } from "ramda";
import { useEffect, useState } from "react";
import { type Params, useMatches, useOutlet } from "react-router";

import { useFlattenedRoutes } from "./use-flattened-routes";
import { useRouter } from "./use-router";

import type { RouteMeta } from "#/router";

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;
/**
 * 返回当前路由Meta信息
 */
export function useCurrentRouteMeta() {
	// const pathname = usePathname();
	const { push } = useRouter();

	// 获取路由组件实例
	const children = useOutlet();

	// 获取所有匹配的路由
	const matchs = useMatches();

	// 获取拍平后的路由菜单
	const flattenedRoutes = useFlattenedRoutes();

	const [currentRouteMeta, setCurrentRouteMeta] = useState<RouteMeta>();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		// 获取当前匹配的路由
		const lastRoute = matchs.at(-1);
		if (!lastRoute) return;

		const { pathname, params } = lastRoute;
		const matchedRouteMeta = flattenedRoutes.find((item) => {
			const replacedKey = replaceDynamicParams(item.key, params);
			return replacedKey === pathname || `${replacedKey}/` === pathname;
		});

		if (matchedRouteMeta) {
			matchedRouteMeta.outlet = children;
			if (!isEmpty(params)) {
				matchedRouteMeta.params = params;
			}
			setCurrentRouteMeta({ ...matchedRouteMeta });
		} else {
			push(HOMEPAGE);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [matchs]);

	return currentRouteMeta;
}

/**
 * replace `user/:id`  to `/user/1234512345`
 */
export const replaceDynamicParams = (
	menuKey: string,
	params: Params<string>,
) => {
	let replacedPathName = menuKey;

	// 解析路由路径中的参数名称
	const paramNames = menuKey.match(/:\w+/g);

	if (paramNames) {
		for (const paramName of paramNames) {
			// 去掉冒号，获取参数名称
			const paramKey = paramName.slice(1);
			if (!params[paramKey]) continue;

			replacedPathName = replacedPathName.replace(paramName, params[paramKey]);
		}
	}

	return replacedPathName;
};
