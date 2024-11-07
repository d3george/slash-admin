import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Iconify, SvgIcon } from '@/components/icon';

import { AppRouteObject } from '#/router';
import type { GetProp, MenuProps } from 'antd';

type MenuItem = GetProp<MenuProps, 'items'>[number];

const renderIcon = (icon: string | React.ReactNode): React.ReactNode => {
  if (typeof icon !== 'string') return icon;

  return icon.startsWith('ic') ? (
    <SvgIcon icon={icon} size={24} className="ant-menu-item-icon" />
  ) : (
    <Iconify icon={icon} size={24} className="ant-menu-item-icon" />
  );
};

const renderLabel = (label: string, suffix: React.ReactNode, t: (key: string) => string) => {
  return (
    <div className="flex items-center">
      <div>{t(label)}</div>
      {suffix}
    </div>
  );
};

/**
 *   routes -> menus
 */
export function useRouteToMenuFn() {
  const { t } = useTranslation();

  const routeToMenuFn = useCallback(
    (items: AppRouteObject[]): MenuItem[] => {
      return items
        .filter((item) => !item.meta?.hideMenu)
        .map((item) => {
          const { meta, children } = item;
          if (!meta) return {} as MenuItem;

          const menuItem: Partial<MenuItem> = {
            key: meta.key,
            disabled: meta.disabled,
            label: renderLabel(meta.label, meta.suffix, t),
            ...(meta.icon && { icon: renderIcon(meta.icon) }),
            ...(children && { children: routeToMenuFn(children) }),
          };

          return menuItem as MenuItem;
        });
    },
    [t],
  );
  return routeToMenuFn;
}
