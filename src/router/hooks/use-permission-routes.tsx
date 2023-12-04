import { chain, isEmpty } from 'ramda';
import { Suspense, lazy, useMemo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { CircleLoading } from '@/components/loading';
import { useUserPermission } from '@/store/userStore';

import { Permission } from '#/entity';
import { PermissionType } from '#/enum';
import { AppRouteObject } from '#/router';

/**
 * return routes about permission
 */
export function usePermissionRoutes() {
  const permissions = useUserPermission();

  return useMemo(() => {
    const flattenedPermissions = flattenTrees(permissions!);
    const permissionRoutes = transformPermissionToMenuRoutes(
      permissions || [],
      flattenedPermissions,
    );
    console.log(permissionRoutes);
    return [...permissionRoutes];
  }, [permissions]);
}

/**
 * transform Permission[] to  AppRouteObject[]
 * @param permissions
 * @param parent
 */
function transformPermissionToMenuRoutes(
  permissions: Permission[],
  flattenedPermissions: Permission[],
) {
  return permissions.map((permission) => {
    const {
      route,
      type,
      label,
      icon,
      order,
      hide,
      component,
      parentId,
      children = [],
    } = permission;

    const appRoute: AppRouteObject = {
      path: route,
      meta: { label, key: getCompleteRoute(permission, flattenedPermissions), hideMenu: !!hide },
    };

    if (order) appRoute.order = order;
    if (icon) appRoute.meta!.icon = icon;

    if (type === PermissionType.CATALOGUE) {
      appRoute.meta!.hideTab = true;
      if (!parentId) {
        appRoute.element = (
          <Suspense fallback={<CircleLoading />}>
            <Outlet />
          </Suspense>
        );
      }
      appRoute.children = transformPermissionToMenuRoutes(children, flattenedPermissions);
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

/**
 * Splicing from the root permission route to the current permission route
 * @param {Permission} permission - current permission
 * @param {Permission[]} flattenedPermissions - flattened permission array
 * @param {string} route - parent permission route
 * @returns {string} - The complete route after splicing
 */
function getCompleteRoute(permission: Permission, flattenedPermissions: Permission[], route = '') {
  const currentRoute = route ? `/${permission.route}${route}` : `/${permission.route}`;

  if (permission.parentId) {
    const parentPermission = flattenedPermissions.find((p) => p.id === permission.parentId)!;
    return getCompleteRoute(parentPermission, flattenedPermissions, currentRoute);
  }

  return currentRoute;
}

/**
 * Flatten an array containing a tree structure
 * @param {Permission[]} trees - An array containing a tree structure
 * @returns {Permission[]} - Flattened array
 */
function flattenTrees(trees: Permission[] = []): Permission[] {
  return chain((permission) => {
    const children = permission.children || [];
    return [permission, ...flattenTrees(children)];
  }, trees);
}
