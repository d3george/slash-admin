import { Menu, MenuProps } from 'antd';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  useRouteToMenuFn,
  usePermissionRoutes,
  useFlattenedRoutes,
  usePathname,
} from '@/router/hooks';
import { menuFilter } from '@/router/utils';
import { useThemeToken } from '@/theme/hooks';

import { NAV_HORIZONTAL_HEIGHT } from '../config';

export default function NavHorizontal() {
  const navigate = useNavigate();
  const pathname = usePathname();
  const { colorBgElevated } = useThemeToken();

  const routeToMenuFn = useRouteToMenuFn();
  const permissionRoutes = usePermissionRoutes();
  const flattenedRoutes = useFlattenedRoutes();

  const menuList = useMemo(() => {
    const menuRoutes = menuFilter(permissionRoutes);
    return routeToMenuFn(menuRoutes);
  }, [routeToMenuFn, permissionRoutes]);

  const selectedKeys = useMemo(() => [pathname], [pathname]);

  const onClick: MenuProps['onClick'] = ({ key }) => {
    const nextLink = flattenedRoutes?.find((el) => el.key === key);
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
        selectedKeys={selectedKeys}
        onClick={onClick}
        className="!z-10 !border-none"
        style={{ background: colorBgElevated }}
      />
    </div>
  );
}
