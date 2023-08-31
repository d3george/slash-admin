import { Menu, MenuProps } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { useCallback, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useMatches, useLocation } from 'react-router-dom';

import { SvgIcon } from '@/components/icon';
import { getMenuRoutes } from '@/router/menus';

import { AppRouteObject } from '#/router';

function TopMenu() {
  const navigate = useNavigate();
  const matches = useMatches();
  const { pathname } = useLocation();
  const { t } = useTranslation();

  // router -> menu
  const routeToMenu = useCallback(
    (items: AppRouteObject[]) => {
      return items.map((item) => {
        const menuItem: any = {};
        const { meta, children } = item;
        if (meta) {
          menuItem.key = meta.key;
          menuItem.label = t(meta?.title);
          if (meta.icon) {
            menuItem.icon = <SvgIcon icon={meta.icon} className="ant-menu-item-icon" size="20" />;
          }
        }
        if (children) {
          menuItem.children = routeToMenu(children);
        }
        return menuItem;
      });
    },
    [t],
  );

  /**
   * state
   */
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['']);
  const [menuList, setMenuList] = useState<ItemType[]>([]);

  useEffect(() => {
    setSelectedKeys([pathname]);
  }, [pathname, matches]);

  useEffect(() => {
    const menuRoutes = getMenuRoutes();
    const menus = routeToMenu(menuRoutes);
    setMenuList(menus);
  }, [routeToMenu]);

  /**
   * events
   */
  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey) {
      setOpenKeys([latestOpenKey]);
    } else {
      setOpenKeys([]);
    }
  };
  const onClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key);
  };

  return (
    <Menu
      mode="horizontal"
      items={menuList}
      className="!border-none"
      defaultOpenKeys={openKeys}
      defaultSelectedKeys={selectedKeys}
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      onClick={onClick}
    />
  );
}

export default TopMenu;
