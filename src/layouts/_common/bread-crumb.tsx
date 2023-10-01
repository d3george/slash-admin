import { Breadcrumb } from 'antd';
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMatches, Link } from 'react-router-dom';

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
    const menuRoutes = getMenuRoutes();
    setFlattenedRoutes(flattenRoutes(menuRoutes));
  }, [flattenRoutes]);

  useEffect(() => {
    const menuRoutes = getMenuRoutes();
    const paths = matches.filter((item) => item.pathname !== '/').map((item) => item.pathname);

    const pathRouteMetas = flattenedRoutes.filter((item) => paths.indexOf(item.key) !== -1);

    let items: AppRouteObject[] | undefined = [...menuRoutes];
    const breadCrumbs = pathRouteMetas.map((routeMeta) => {
      const { key, title } = routeMeta;
      items = items!.find((item) => item.meta?.key === key)?.children;
      const result: ItemType = {
        key,
        title: t(title),
      };
      if (items) {
        result.menu = {
          items: items.map((item) => ({
            key: item.meta?.key,
            label: <Link to={item.meta!.key!}>{t(item.meta!.title)}</Link>,
          })),
        };
      }
      return result;
    });
    setBreadCrumbs(breadCrumbs);
  }, [matches, flattenedRoutes, t]);

  return <Breadcrumb items={breadCrumbs} />;
}
