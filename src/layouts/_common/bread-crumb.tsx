import { Breadcrumb } from 'antd';
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMatches, Link } from 'react-router-dom';

import { Iconify } from '@/components/icon';
import { useFlattenedRoutes, usePermissionRoutes } from '@/router/hooks';
import { menuFilter } from '@/router/utils';

import { AppRouteObject } from '#/router';

/**
 * 动态面包屑解决方案：https://github.com/MinjieChang/myblog/issues/29
 */
export default function BreadCrumb() {
  const { t } = useTranslation();
  const matches = useMatches();
  const [breadCrumbs, setBreadCrumbs] = useState<ItemType[]>([]);

  const flattenedRoutes = useFlattenedRoutes();
  const permissionRoutes = usePermissionRoutes();

  useEffect(() => {
    const menuRoutes = menuFilter(permissionRoutes);
    const paths = matches.filter((item) => item.pathname !== '/').map((item) => item.pathname);

    const pathRouteMetas = flattenedRoutes.filter((item) => paths.indexOf(item.key) !== -1);

    let items: AppRouteObject[] | undefined = [...menuRoutes];
    const breadCrumbs = pathRouteMetas.map((routeMeta) => {
      const { key, label } = routeMeta;
      items = items!
        .find((item) => item.meta?.key === key)
        ?.children?.filter((item) => !item.meta?.hideMenu);
      const result: ItemType = {
        key,
        title: t(label),
      };
      if (items) {
        result.menu = {
          items: items.map((item) => ({
            key: item.meta?.key,
            label: <Link to={item.meta!.key!}>{t(item.meta!.label)}</Link>,
          })),
        };
      }
      return result;
    });
    setBreadCrumbs(breadCrumbs);
  }, [matches, flattenedRoutes, t, permissionRoutes]);

  return (
    <Breadcrumb
      items={breadCrumbs}
      className="!text-sm"
      separator={<Iconify icon="ph:dot-duotone" />}
    />
  );
}
