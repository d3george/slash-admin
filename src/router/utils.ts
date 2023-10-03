import { ascend } from 'ramda';

import { AppRouteObject } from '#/router';

export const menuFilter = (items: AppRouteObject[]) => {
  return items
    .filter((item) => {
      const show = !item.meta?.hideMenu && item.path;
      if (show && item.children) {
        item.children = menuFilter(item.children);
      }
      return show;
    })
    .sort(ascend((item) => item.order!));
};

/**
 * 基于 src/router/routes/modules 文件结构动态生成路由
 */
export function getMenuModules() {
  const menuModules: AppRouteObject[] = [];

  const modules = import.meta.glob('./routes/modules/**/*.tsx', { eager: true });
  Object.keys(modules).forEach((key) => {
    const mod = (modules as any)[key].default || {};
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    menuModules.push(...modList);
  });
  return menuModules;
}

/**
 * return the routes will be used in sidebar menu
 */
export function getMenuRoutes() {
  return menuFilter(getMenuModules());
}
