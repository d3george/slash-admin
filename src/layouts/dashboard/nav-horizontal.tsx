import { Menu, MenuProps } from 'antd';
import { useState, useEffect, CSSProperties, useMemo } from 'react';
import { useNavigate, useMatches, useLocation } from 'react-router-dom';

import { useRouteToMenuFn, usePermissionRoutes, useFlattenedRoutes } from '@/router/hooks';
import { menuFilter } from '@/router/utils';
import { useThemeToken } from '@/theme/hooks';

import { NAV_HORIZONTAL_HEIGHT } from './config';

export default function NavHorizontal() {
  const navigate = useNavigate();
  const matches = useMatches();
  const { pathname } = useLocation();

  const { colorBgElevated } = useThemeToken();

  const routeToMenuFn = useRouteToMenuFn();
  const permissionRoutes = usePermissionRoutes();
  const menuList = useMemo(() => {
    const menuRoutes = menuFilter(permissionRoutes);
    return routeToMenuFn(menuRoutes);
  }, [routeToMenuFn, permissionRoutes]);

  // 获取拍平后的路由菜单
  const flattenedRoutes = useFlattenedRoutes();

  /**
   * state
   */
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['']);

  useEffect(() => {
    setSelectedKeys([pathname]);
  }, [pathname, matches]);

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
  };

  const menuStyle: CSSProperties = {
    background: colorBgElevated,
  };
  return (
    <div className="w-screen" style={{ height: NAV_HORIZONTAL_HEIGHT }}>
      <Menu
        mode="horizontal"
        items={menuList}
        className="!z-10 !border-none"
        defaultOpenKeys={openKeys}
        defaultSelectedKeys={selectedKeys}
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        onClick={onClick}
        style={menuStyle}
      />
    </div>
  );
}
