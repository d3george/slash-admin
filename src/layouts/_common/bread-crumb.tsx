import { Breadcrumb } from 'antd';
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMatches } from 'react-router-dom';

import { getMenuRoutes } from '@/router/menus';

import { AppRouteObject, RouteMeta } from '#/router';

/**
 * 动态面包屑解决方案：https://github.com/MinjieChang/myblog/issues/29
 */
export default function BreadCrumb() {
  const { t } = useTranslation();
  const matches = useMatches();

  const [breadCrumbs, setBreadCrumbs] = useState<ItemType[]>([]);
  const [flattenedRoutes, setFlattenedRoutes] = useState<RouteMeta[]>([]);

  const separator = (
    <div className="flex h-full w-full items-center justify-center px-2">
      <div className="!h-1 !w-1 rounded-full bg-gray" />
    </div>
  );
  /**
   * flatten the routes
   */
  const flattenRoutes = useCallback((routes: AppRouteObject[]) => {
    return routes.reduce<RouteMeta[]>((prev, item) => {
      const { meta, children } = item;
      if (meta) prev.push(meta);
      if (children) prev.push(...flattenRoutes(children));
      return prev;
    }, []);
  }, []);

  useEffect(() => {
    const paths = matches.filter((item) => item.pathname !== '/').map((item) => item.pathname);

    const pathRouteMetas = flattenedRoutes.filter((item) => paths.indexOf(item.key) !== -1);

    const breadCrumbs = pathRouteMetas.map((routeMeta) => {
      const { key, title } = routeMeta;
      return {
        key,
        title: t(title),
      };
    });
    setBreadCrumbs(breadCrumbs);
  }, [matches, flattenedRoutes, t]);

  useEffect(() => {
    const menuRoutes = getMenuRoutes();
    setFlattenedRoutes(flattenRoutes(menuRoutes));
  }, [flattenRoutes]);
  return <Breadcrumb items={breadCrumbs} separator={separator} />;
}
