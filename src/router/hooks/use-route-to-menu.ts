import { ItemType } from 'antd/es/menu/hooks/useItems';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { AppRouteObject } from '#/router';

/**
 *   routes -> menus
 */
export function useRouteToMenu() {
  const { t } = useTranslation();
  const routeToMenu = useCallback(
    (items: AppRouteObject[]) => {
      return items.map((item) => {
        const menuItem: any = {};
        const { meta, children } = item;
        if (meta) {
          const { key, title, icon, disabled } = meta;
          menuItem.key = key;
          menuItem.label = t(title);
          menuItem.disabled = disabled;
          if (icon) {
            menuItem.icon = icon;
          }
        }
        if (children) {
          menuItem.children = routeToMenu(children);
        }
        return menuItem as ItemType;
      });
    },
    [t],
  );
  return routeToMenu;
}
