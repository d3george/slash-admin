import { Menu, MenuProps } from 'antd';
import Color from 'color';
import { useEffect, useMemo, useState } from 'react';
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
  console.log('NavVertical');
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

  const collapsed = useMemo(() => themeLayout === ThemeLayout.Mini, [themeLayout]);

  const menuList = useMemo(() => {
    const menuRoutes = menuFilter(permissionRoutes);
    return routeToMenuFn(menuRoutes);
  }, [routeToMenuFn, permissionRoutes]);

  const selectedKeys = useMemo(() => [pathname], [pathname]);

  const [openKeys, setOpenKeys] = useState<string[]>([]);
  useEffect(() => {
    if (collapsed) return;
    const keys = matches
      .filter((match) => match.pathname !== '/' && match.pathname !== pathname)
      .map((match) => match.pathname);
    setOpenKeys(keys);
  }, [matches, pathname, collapsed]);

  const handleToggleCollapsed = () => {
    setSettings({
      ...settings,
      themeLayout: collapsed ? ThemeLayout.Vertical : ThemeLayout.Mini,
    });
  };

  const onClick: MenuProps['onClick'] = ({ key }) => {
    const nextLink = flattenedRoutes?.find((e) => e.key === key);
    if (nextLink?.hideTab && nextLink?.frameSrc) {
      window.open(nextLink?.frameSrc, '_blank');
      return;
    }

    navigate(key);
    props?.closeSideBarDrawer?.();
  };

  const handleOpenChange: MenuProps['onOpenChange'] = (keys) => {
    setOpenKeys(keys);
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
          selectedKeys={selectedKeys}
          {...(!collapsed && { openKeys })}
          style={{ backgroundColor: colorBgElevated }}
          className="h-full !border-none"
          onOpenChange={handleOpenChange}
          onClick={onClick}
        />
      </Scrollbar>
    </div>
  );
}
