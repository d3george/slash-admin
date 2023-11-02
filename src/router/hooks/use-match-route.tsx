import { useEffect, useState } from 'react';
import { useMatches, useOutlet } from 'react-router-dom';

import { useFlattenedRoutes } from './use-flattened-routes';
import { usePathname } from './use-pathname';

import { RouteMeta } from '#/router';

/**
 * 返回当前路由信息
 */
export function useMatchRouteMeta() {
  const [matchRouteMeta, setMatchRouteMeta] = useState<RouteMeta>();

  // 获取路由组件实例
  const children = useOutlet();

  // 获取所有匹配的路由
  const matchs = useMatches();

  // 获取拍平后的路由菜单
  const flattenedRoutes = useFlattenedRoutes();

  const pathname = usePathname();

  useEffect(() => {
    // 获取当前匹配的路由
    const lastRoute = matchs.at(-1);

    const currentRouteMeta = flattenedRoutes.find((item) => item.key === lastRoute?.pathname);
    currentRouteMeta!.outlet = children;

    setMatchRouteMeta(currentRouteMeta);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return matchRouteMeta;
}
