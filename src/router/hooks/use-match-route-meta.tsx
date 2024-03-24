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

    const currentRouteMeta = flattenedRoutes.find((item) => {
      if (!item.key.includes(':')) {
        // 不适用动态路由的情况
        return item.key === lastRoute?.pathname || `${item.key}/` === lastRoute?.pathname;
      }
      let pathname = lastRoute?.pathname;
      if (pathname?.endsWith('/')) {
        // 处理pathname多了一个/的情况
        pathname = pathname.substring(0, pathname.length - 1);
      }
      const partKey = item.key.split('/');
      const routerKey = pathname?.split('/') || []; // 这里分割后进行比较
      const m = partKey.length;
      const n = routerKey?.length;
      if (m !== n) {
        // 长度不同直接返回
        return false;
      }
      for (let i = 0; i < m; i += 1) {
        if (!partKey[i].startsWith(':')) {
          // 这里对不是:开头的情况进行比较,是的话就不处理，但这里如果有::id的错误路由就不好处理
          if (partKey[i] !== routerKey[i]) {
            return false;
          }
        }
      }
      return true;
    });
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
