import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Menu, MenuProps, theme } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation, useMatches, useNavigate } from 'react-router-dom';

import Logo from '@/assets/icons/ic-logo.svg';
import { SvgIcon } from '@/components/icon';
import { getMenuRoutes } from '@/router/menus';

import { AppRouteObject } from '#/router';

type SidebarProps = {
  closeSideBarDrawer?: () => void;
};
function Sidebar(props: SidebarProps) {
  const navigate = useNavigate();
  const matches = useMatches();
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const {
    token: { colorTextBase, colorPrimary },
  } = theme.useToken();

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
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['']);
  const [menuList, setMenuList] = useState<ItemType[]>([]);

  useEffect(() => {
    const openKeys = matches
      .filter((match) => match.pathname !== '/')
      .map((match) => match.pathname);
    setOpenKeys(openKeys);
    setSelectedKeys([pathname]);
  }, [pathname, matches, collapsed]);

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
    props?.closeSideBarDrawer?.();
  };
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      collapsedWidth={90}
      className="relative h-screen duration-300 ease-linear"
    >
      {/* hidden when screen < lg */}

      <div className="h-screen">
        {/* <!-- SIDEBAR HEADER --> */}
        <NavLink to="/">
          <img src={Logo} alt="" className="mb-2 ml-8 mt-6 h-10 w-10" />
        </NavLink>
        {/* <!-- SIDEBAR HEADER --> */}

        {/* <!-- Sidebar Menu --> */}
        <Menu
          mode="inline"
          items={menuList}
          className="h-full !border-none"
          defaultOpenKeys={openKeys}
          defaultSelectedKeys={selectedKeys}
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          onClick={onClick}
        />
        {/* <!-- Sidebar Menu --> */}
      </div>
      <button
        onClick={toggleCollapsed}
        className="absolute right-0 top-0 z-10 hidden h-6 w-6 translate-x-1/2 cursor-pointer select-none rounded-full text-center !text-gray lg:block"
        style={{ color: colorTextBase, borderColor: colorTextBase }}
      >
        {collapsed ? <MenuUnfoldOutlined size={16} /> : <MenuFoldOutlined size={16} />}
      </button>
    </Sider>
  );
}
export default Sidebar;
