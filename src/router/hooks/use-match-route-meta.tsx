import { useEffect, useState } from 'react';
import { useMatches, useOutlet } from 'react-router-dom';

import { useFlattenedRoutes } from './use-flattened-routes';
import { useRouter } from './use-router';

import { RouteMeta } from '#/router';

/**
 * 返回当前路由Meta信息
 */
export function useMatchRouteMeta() {
  const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;
  const [matchRouteMeta, setMatchRouteMeta] = useState<RouteMeta>();

  // 获取路由组件实例
  const children = useOutlet();

  // 获取所有匹配的路由
  const matchs = useMatches();

  // 获取拍平后的路由菜单
  const flattenedRoutes = useFlattenedRoutes();

  // const pathname = usePathname();
  const { push } = useRouter();

  useEffect(() => {
    // 获取当前匹配的路由
    console.log('matchs1', matchs, flattenedRoutes);
    const lastRoute = matchs.at(-1);

    const currentRouteMeta = flattenedRoutes.find(
      (item) => item.key === lastRoute?.pathname || `${item.key}/` === lastRoute?.pathname,
    );
    if (currentRouteMeta) {
      if (!currentRouteMeta.hideTab) {
        currentRouteMeta.outlet = children;
        setMatchRouteMeta(currentRouteMeta);
      }
    } else {
      push(HOMEPAGE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchs]);

  return matchRouteMeta;
}
