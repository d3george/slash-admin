import { Menu, MenuProps } from 'antd';
import { useMemo, useState } from 'react';
import { useNavigate, useMatches } from 'react-router-dom';

import { useRouteToMenuFn, usePermissionRoutes, useFlattenedRoutes } from '@/router/hooks';
import { menuFilter } from '@/router/utils';
import { useThemeToken } from '@/theme/hooks';

import { NAV_HORIZONTAL_HEIGHT } from '../config';

export default function NavHorizontal() {
  const navigate = useNavigate();
  const matches = useMatches();
  const { colorBgElevated } = useThemeToken();

  const routeToMenuFn = useRouteToMenuFn();
  const permissionRoutes = usePermissionRoutes();
  const flattenedRoutes = useFlattenedRoutes();

  const menuList = useMemo(() => {
    const menuRoutes = menuFilter(permissionRoutes);
    return routeToMenuFn(menuRoutes);
  }, [routeToMenuFn, permissionRoutes]);

  const [currentOpenKeys, setCurrentOpenKeys] = useState<string[]>(() => {
    return matches.filter((match) => match.pathname !== '/').map((match) => match.pathname);
  });
  const onClick: MenuProps['onClick'] = ({ key, keyPath }) => {
    const nextLink = flattenedRoutes?.find((el) => el.key === key);
    setCurrentOpenKeys(keyPath);

    // Handle special case for external links in menu items
    // For external links: skip internal routing, avoid adding new tab in current project,
    // prevent selecting current route, and open link in new browser tab
    if (nextLink?.hideTab && nextLink?.frameSrc) {
      window.open(nextLink?.frameSrc, '_blank');
      return;
    }
    navigate(key);
  };

  return (
    <div className="w-screen" style={{ height: NAV_HORIZONTAL_HEIGHT }}>
      <Menu
        mode="horizontal"
        items={menuList}
        defaultOpenKeys={[]}
        defaultSelectedKeys={currentOpenKeys}
        onClick={onClick}
        className="!z-10 !border-none"
        style={{ background: colorBgElevated }}
      />
    </div>
  );
}
