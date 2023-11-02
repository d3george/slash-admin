import { useCallback, useMemo } from 'react';

import { flattenMenuRoutes, getMenuRoutes } from '../utils';

/**
 * 返回拍平后的菜单路由
 */
export function useFlattenedRoutes() {
  const flattenRoutes = useCallback(flattenMenuRoutes, []);
  return useMemo(() => {
    const menuRoutes = getMenuRoutes();
    return flattenRoutes(menuRoutes);
  }, [flattenRoutes]);
}
