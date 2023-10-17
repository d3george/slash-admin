import { Menu, MenuProps } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { useState, useEffect, CSSProperties } from 'react';
import { useNavigate, useMatches, useLocation } from 'react-router-dom';

import { useRouteToMenu } from '@/router/hooks';
import { getMenuRoutes } from '@/router/utils';
import { useThemeToken } from '@/theme/hooks';

export default function NavHorizontal() {
  const navigate = useNavigate();
  const matches = useMatches();
  const { pathname } = useLocation();

  const { colorBgElevated } = useThemeToken();

  const routeToMenu = useRouteToMenu();

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
      setOpenKeys(keys);
    } else {
      setOpenKeys([]);
    }
  };
  const onClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key);
  };

  const menuStyle: CSSProperties = {
    background: colorBgElevated,
  };
  const shadowStyle: CSSProperties = {
    margin: 'auto',
    height: '24px',
    borderRadius: '50%',
    opacity: 0.48,
    width: 'calc(100% - 48px)',
    boxShadow: `#919eab29 0px 8px 16px 0px`,
  };
  return (
    <div className="relative w-screen">
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
        style={menuStyle}
      />
      <div className="absolute bottom-[-2px] left-0 right-0" style={shadowStyle} />
    </div>
  );
}
