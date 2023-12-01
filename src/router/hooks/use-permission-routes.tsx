import { isEmpty } from 'ramda';
import { Suspense, lazy, useMemo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { CircleLoading } from '@/components/loading';
import { getMenuModules } from '@/router/utils';
import { useUserPermission } from '@/store/userStore';

import { Permission } from '#/entity';
import { PermissionType } from '#/enum';
import { AppRouteObject } from '#/router';

const menuModuleRoutes = getMenuModules();

/**
 * 根据权限返回动态路由表
 */
export function usePermissionRoutes() {
  const permissions = useUserPermission();

  return useMemo(() => {
    const permissionRoutes = transformPermissionToMenuRoutes(permissions || []);
    return [...menuModuleRoutes, ...permissionRoutes];
  }, [permissions]);
}

function transformPermissionToMenuRoutes(permissions: Permission[]) {
  return permissions.map(({ path, type, order, meta, component, children = [] }) => {
    const appRoute: AppRouteObject = {
      path,
      meta,
    };

    if (order) appRoute.order = order;

    if (type === PermissionType.CATALOGUE) {
      appRoute.element = (
        <Suspense fallback={<CircleLoading />}>
          <Outlet />
        </Suspense>
      );
      appRoute.children = transformPermissionToMenuRoutes(children);
      if (!isEmpty(children)) {
        appRoute.children.unshift({
          index: true,
          element: <Navigate to={children[0].path} replace />,
        });
      }
    } else if (type === PermissionType.MENU) {
      const componentPath = `/src/pages/${component}`;
      const Element = lazy(() => import(componentPath));
      appRoute.element = <Element />;
    }

    return appRoute;
  });
}
