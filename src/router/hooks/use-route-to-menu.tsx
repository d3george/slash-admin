import { ItemType } from 'antd/es/menu/hooks/useItems';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Iconify } from '@/components/icon';
import { useSettings } from '@/store/settingStore';

import { ThemeLayout } from '#/enum';
import { AppRouteObject } from '#/router';

/**
 *   routes -> menus
 */
export function useRouteToMenuFn() {
  const { t } = useTranslation();
  const { themeLayout } = useSettings();
  const routeToMenuFn = useCallback(
    (items: AppRouteObject[]) => {
      return items
        .filter((item) => !item.meta?.hideMenu)
        .map((item) => {
          const menuItem: any = [];
          const { meta, children } = item;
          if (meta) {
            const { key, label, icon, disabled, suffix } = meta;
            menuItem.key = key;
            menuItem.disabled = disabled;
            menuItem.label = (
              <div
                className={`inline-flex w-full items-center ${
                  themeLayout === ThemeLayout.Horizontal ? 'justify-start' : 'justify-between'
                } `}
              >
                <div className="">{t(label)}</div>
                {suffix}
              </div>
            );
            if (icon) {
              if (typeof icon === 'string') {
                menuItem.icon = <Iconify icon={icon} size={24} className="" />;
              } else {
                menuItem.icon = icon;
              }
            }
          }
          if (children) {
            menuItem.children = routeToMenuFn(children);
          }
          return menuItem as ItemType;
        });
    },
    [t, themeLayout],
  );
  return routeToMenuFn;
}
