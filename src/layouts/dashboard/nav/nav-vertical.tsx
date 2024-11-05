import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import Color from 'color';
import { m } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useMatches, useNavigate } from 'react-router-dom';

import MotionContainer from '@/components/animate/motion-container';
import { varSlide } from '@/components/animate/variants';
import Logo from '@/components/logo';
import Scrollbar from '@/components/scrollbar';
import { useRouteToMenuFn, usePermissionRoutes, useFlattenedRoutes } from '@/router/hooks';
import { menuFilter } from '@/router/utils';
import { useSettingActions, useSettings } from '@/store/settingStore';
import { useThemeToken } from '@/theme/hooks';

import { NAV_COLLAPSED_WIDTH, NAV_WIDTH, HEADER_HEIGHT } from '../config';

import { ThemeLayout } from '#/enum';

const slideInLeft = varSlide({ distance: 10 }).inLeft;

type Props = {
  closeSideBarDrawer?: () => void;
};
export default function NavVertical(props: Props) {
  const navigate = useNavigate();
  const matches = useMatches();
  const { pathname } = useLocation();

  const { colorPrimary, colorTextBase, colorBgElevated, colorBorder } = useThemeToken();

  const settings = useSettings();
  console.log('nav vertical render');
  const { themeLayout } = settings;
  const { setSettings } = useSettingActions();

  const routeToMenuFn = useRouteToMenuFn();
  const permissionRoutes = usePermissionRoutes();

  const menuList = useMemo(() => {
    const menuRoutes = menuFilter(permissionRoutes);
    return routeToMenuFn(menuRoutes);
  }, [routeToMenuFn, permissionRoutes]);

  const flattenedRoutes = useFlattenedRoutes();

  /**
   * state
   */
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  useEffect(() => {
    if (themeLayout === ThemeLayout.Vertical) {
      setCollapsed(false);

      const openKeys = matches
        .filter((match) => match.pathname !== '/')
        .map((match) => match.pathname);
      setOpenKeys(openKeys);
    } else if (themeLayout === ThemeLayout.Mini) {
      setCollapsed(true);
    }
  }, [themeLayout, matches]);

  /**
   * events
   */
  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    setOpenKeys(keys);
  };
  const onClick: MenuProps['onClick'] = ({ key }) => {
    // 从扁平化的路由信息里面匹配当前点击的那个
    const nextLink = flattenedRoutes?.find((el) => el.key === key);

    // 处理菜单项中，外链的特殊情况
    // 点击外链时，不跳转路由，不在当前项目添加tab，不选中当前路由，新开一个 tab 打开外链
    if (nextLink?.hideTab && nextLink?.frameSrc) {
      window.open(nextLink?.frameSrc, '_blank');
      return;
    }

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
    <div className='"z-50 hidden h-full flex-shrink-0 md:block'>
      <div
        className="flex h-full flex-col"
        style={{
          width: collapsed ? NAV_COLLAPSED_WIDTH : NAV_WIDTH,
          borderRight: `1px dashed ${Color(colorBorder).alpha(0.6).toString()}`,
        }}
      >
        {/* <!-- Logo --> */}
        <div
          style={{ height: `${HEADER_HEIGHT}px` }}
          className="relative flex items-center justify-center py-4"
        >
          <MotionContainer className="flex items-center">
            <Logo />
            {themeLayout !== ThemeLayout.Mini && (
              <m.div variants={slideInLeft}>
                <span className="ml-2 text-xl font-bold" style={{ color: colorPrimary }}>
                  Slash Admin
                </span>
              </m.div>
            )}
          </MotionContainer>
          <button
            onClick={toggleCollapsed}
            className="absolute right-0 top-7 z-50 hidden h-6 w-6 translate-x-1/2 cursor-pointer select-none rounded-full text-center !text-gray md:block"
            style={{ color: colorTextBase, borderColor: colorTextBase, fontSize: 16 }}
          >
            {collapsed ? <MenuUnfoldOutlined size={20} /> : <MenuFoldOutlined size={20} />}
          </button>
        </div>

        {/* <!-- Sidebar Menu --> */}
        <Scrollbar style={{ height: `calc(100vh - ${HEADER_HEIGHT}px)` }}>
          <Menu
            mode="inline"
            items={menuList}
            className="h-full !border-none"
            defaultOpenKeys={openKeys}
            defaultSelectedKeys={[pathname]}
            selectedKeys={[pathname]}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            onClick={onClick}
            style={{ backgroundColor: colorBgElevated }}
            inlineCollapsed={collapsed}
          />
        </Scrollbar>
      </div>
    </div>
  );
}
