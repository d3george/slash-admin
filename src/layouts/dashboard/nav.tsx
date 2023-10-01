import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { CSSProperties, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useMatches, useNavigate } from 'react-router-dom';

import { SvgIcon } from '@/components/icon';
import Logo from '@/components/logo';
import { getMenuRoutes } from '@/router/menus';
import { useSettingActions, useSettings } from '@/store/settingStore';
import { useThemeToken } from '@/theme/hooks';

import { ThemeLayout } from '#/enum';
import { AppRouteObject } from '#/router';

type Props = {
  closeSideBarDrawer?: () => void;
};
export default function Nav(props: Props) {
  const navigate = useNavigate();
  const matches = useMatches();
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const { colorTextBase, colorBgElevated } = useThemeToken();

  const settings = useSettings();
  const { themeLayout } = settings;
  const { setSettings } = useSettingActions();

  const menuStyle: CSSProperties = {
    background: colorBgElevated,
  };
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
            menuItem.icon = (
              <SvgIcon icon={meta.icon} className="ant-menu-item-icon mr-2" size="24px" />
            );
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
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['']);
  const [menuList, setMenuList] = useState<ItemType[]>([]);
  const [menuMode, setMenuMode] = useState<MenuProps['mode']>('inline');

  useEffect(() => {
    if (themeLayout === ThemeLayout.Vertical) {
      const openKeys = matches
        .filter((match) => match.pathname !== '/')
        .map((match) => match.pathname);
      setOpenKeys(openKeys);
    }
    setSelectedKeys([pathname]);
  }, [pathname, matches, collapsed, themeLayout]);

  useEffect(() => {
    const menuRoutes = getMenuRoutes();
    const menus = routeToMenu(menuRoutes);
    setMenuList(menus);
  }, [routeToMenu]);

  useEffect(() => {
    if (themeLayout === ThemeLayout.Vertical) {
      setCollapsed(false);
      setMenuMode('inline');
    }
    if (themeLayout === ThemeLayout.Mini) {
      setCollapsed(true);
      setMenuMode('inline');
    }
  }, [themeLayout]);

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
    props?.closeSideBarDrawer?.();
  };

  const setThemeLayout = (themeLayout: ThemeLayout) => {
    setSettings({
      ...settings,
      themeLayout,
    });
  };

  const toggleCollapsed = () => {
    if (!collapsed) {
      setThemeLayout(ThemeLayout.Mini);
    } else {
      setThemeLayout(ThemeLayout.Vertical);
    }
    setCollapsed(!collapsed);
  };

  return (
    <div style={{ width: collapsed ? '90px' : '260px' }}>
      <div className="relative flex h-20 items-center justify-center py-4">
        {themeLayout === ThemeLayout.Mini ? (
          <Logo className="text-lg" />
        ) : (
          <Logo className="text-4xl" />
        )}
        <button
          onClick={toggleCollapsed}
          className="absolute right-0 top-6 z-10 hidden h-6 w-6 translate-x-1/2 cursor-pointer select-none rounded-full text-center !text-gray lg:block"
          style={{ color: colorTextBase, borderColor: colorTextBase }}
        >
          {collapsed ? <MenuUnfoldOutlined size={16} /> : <MenuFoldOutlined size={16} />}
        </button>
      </div>

      {/* <!-- Sidebar Menu --> */}
      <Menu
        mode={menuMode}
        items={menuList}
        className="!border-none"
        defaultOpenKeys={openKeys}
        defaultSelectedKeys={selectedKeys}
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        onClick={onClick}
        style={menuStyle}
        inlineCollapsed={collapsed}
      />
      {/* <!-- Sidebar Menu --> */}
    </div>
  );
}
