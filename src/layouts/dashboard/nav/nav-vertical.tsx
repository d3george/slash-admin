import { Menu, MenuProps } from 'antd';
import Color from 'color';
import { useCallback, useMemo, useState } from 'react';
import { useMatches, useNavigate } from 'react-router-dom';

import Scrollbar from '@/components/scrollbar';
import { useRouteToMenuFn, usePermissionRoutes, useFlattenedRoutes } from '@/router/hooks';
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

  const settings = useSettings();
  const { themeLayout } = settings;
  const { setSettings } = useSettingActions();

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

  const collapsed = useMemo(() => themeLayout === ThemeLayout.Mini, [themeLayout]);

  const handleToggleCollapsed = useCallback(() => {
    setSettings({
      ...settings,
      themeLayout: collapsed ? ThemeLayout.Vertical : ThemeLayout.Mini,
    });
  }, [collapsed, settings, setSettings]);

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
    props?.closeSideBarDrawer?.();
  };

  return (
    <div className="z-50 h-full flex-shrink-0">
      <div
        className="flex h-full flex-col"
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
            defaultOpenKeys={themeLayout === ThemeLayout.Vertical ? currentOpenKeys : []}
            defaultSelectedKeys={currentOpenKeys}
            style={{ backgroundColor: colorBgElevated }}
            className="h-full !border-none"
            onClick={onClick}
          />
        </Scrollbar>
      </div>
    </div>
  );
}
