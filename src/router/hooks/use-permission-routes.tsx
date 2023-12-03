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
 * return routes about permission
 */
export function usePermissionRoutes() {
  const permissions = useUserPermission();

  return useMemo(() => {
    const permissionRoutes = transformPermissionToMenuRoutes(permissions || []);
    return [...menuModuleRoutes, ...permissionRoutes];
  }, [permissions]);
}

/**
 * transform Permission[] to  AppRouteObject[]
 * @param permissions
 * @param parent
 */
function transformPermissionToMenuRoutes(permissions: Permission[], parent?: Permission) {
  return permissions.map((permission) => {
    const { route, type, label, icon, order, hide, component, children = [] } = permission;
    const appRoute: AppRouteObject = {
      order,
      path: route,
      meta: { label, key: `/${permission.route}` },
    };

    if (parent) {
      appRoute.meta!.key = `/${parent.route}/${permission.route}`;
    }
    if (icon) appRoute.meta!.icon = icon;
    if (hide) appRoute.meta!.hideMenu = true;

    if (type === PermissionType.CATALOGUE) {
      appRoute.element = (
        <Suspense fallback={<CircleLoading />}>
          <Outlet />
        </Suspense>
      );
      appRoute.children = transformPermissionToMenuRoutes(children, permission);
      if (!isEmpty(children)) {
        appRoute.children.unshift({
          index: true,
          element: <Navigate to={children[0].route} replace />,
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
