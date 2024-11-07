import { Menu, MenuProps } from 'antd';
import Color from 'color';
import { useMemo, useState } from 'react';
import { useMatches, useNavigate } from 'react-router-dom';

import Scrollbar from '@/components/scrollbar';
import {
  useRouteToMenuFn,
  usePermissionRoutes,
  useFlattenedRoutes,
  usePathname,
} from '@/router/hooks';
import { menuFilter } from '@/router/utils';
import { useSettingActions, useSettings } from '@/store/settingStore';
import { useThemeToken } from '@/theme/hooks';

import { NAV_COLLAPSED_WIDTH, NAV_WIDTH, HEADER_HEIGHT } from '../config';

import NavLogo from './nva-logo';

import { ThemeLayout } from '#/enum';

type Props = {
  closeSideBarDrawer?: () => void;
};
export default function NavVertical(props: Props) {
  const navigate = useNavigate();
  const matches = useMatches();
  const { colorBgElevated, colorBorder } = useThemeToken();
  const pathname = usePathname();

  const settings = useSettings();
  const { themeLayout } = settings;
  const { setSettings } = useSettingActions();

  const routeToMenuFn = useRouteToMenuFn();
  const permissionRoutes = usePermissionRoutes();
  const flattenedRoutes = useFlattenedRoutes();

  const [collapsed, setCollapsed] = useState(themeLayout === ThemeLayout.Mini);
  const menuList = useMemo(() => {
    const menuRoutes = menuFilter(permissionRoutes);
    return routeToMenuFn(menuRoutes);
  }, [routeToMenuFn, permissionRoutes]);

  const selectedKeys = useMemo(() => [pathname], [pathname]);
  const openKeys = useMemo(() => {
    const keys = matches
      .filter((match) => match.pathname !== '/')
      .filter((match) => match.pathname !== pathname)
      .map((match) => match.pathname);
    return keys;
  }, [matches, pathname]);

  const handleToggleCollapsed = () => {
    setSettings({
      ...settings,
      themeLayout: collapsed ? ThemeLayout.Vertical : ThemeLayout.Mini,
    });
    setCollapsed(!collapsed);
  };

  const onClick: MenuProps['onClick'] = ({ key, keyPath }) => {
    console.log('click', key, keyPath);
    const nextLink = flattenedRoutes?.find((el) => el.key === key);
    // Handle special case for external links in menu items
    // For external links: skip internal routing, avoid adding new tab in current project,
    // prevent selecting current route, and open link in new browser tab
    if (nextLink?.hideTab && nextLink?.frameSrc) {
      window.open(nextLink?.frameSrc, '_blank');
      return;
    }

    navigate(key);
    props?.closeSideBarDrawer?.();
  };

  return (
    <div
      style={{
        width: collapsed ? NAV_COLLAPSED_WIDTH : NAV_WIDTH,
        borderRight: `1px dashed ${Color(colorBorder).alpha(0.6).toString()}`,
      }}
    >
      <NavLogo collapsed={collapsed} onToggle={handleToggleCollapsed} />

      <Scrollbar style={{ height: `calc(100vh - ${HEADER_HEIGHT}px)` }}>
        <Menu
          mode="inline"
          inlineCollapsed={collapsed}
          items={menuList}
          {...(!collapsed && { openKeys })}
          selectedKeys={selectedKeys}
          style={{ backgroundColor: colorBgElevated }}
          className="h-full !border-none"
          onClick={onClick}
        />
      </Scrollbar>
    </div>
  );
}
