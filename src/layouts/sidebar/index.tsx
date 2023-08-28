import { Menu, MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import Logo from '@/assets/icons/ic-logo.svg';
import { SvgIcon } from '@/components/icon';

type SidebarProps = {
  closeSideBarDrawer?: () => void;
};
function Sidebar(props: SidebarProps) {
  // submenu keys of first level
  const rootSubmenuKeys = ['management'];
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const menuList: ItemType[] = [
    {
      key: '/dashboard',
      label: `${t('sys.menu.app')}`,
      icon: <SvgIcon icon="ic-dashboard" size="24" className="mr-6" />,
    },
    {
      key: 'management',
      label: `${t('sys.menu.management')}`,
      icon: <SvgIcon icon="ic-dashboard" size="24" className="mr-6" />,
      children: [
        {
          key: '/user',
          label: `${t('sys.menu.user')}`,
          icon: <SvgIcon icon="ic-user" size="24" className="mr-6" />,
        },
        {
          key: '/blog',
          label: `${t('sys.menu.blog')}`,
          icon: <SvgIcon icon="ic-blog" size="24" className="mr-6" />,
        },
      ],
    },
  ];

  /**
   * state
   */
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['/dashboard']);
  useEffect(() => {
    setSelectedKeys([pathname]);
  }, [pathname, openKeys]);

  useEffect(() => {
    console.log('created');
  }, []);
  /**
   * events
   */
  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
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
      className="relative h-screen w-64 duration-300 ease-linear"
    >
      {/* hidden when screen < lg */}

      {/* <!-- SIDEBAR HEADER --> */}
      <NavLink to="/">
        <img src={Logo} alt="" className="mb-2 ml-8 mt-6 h-10 w-10" />
      </NavLink>
      {/* <!-- SIDEBAR HEADER --> */}

      {/* <!-- Sidebar Menu --> */}
      <div className="pl-2">
        <Menu
          mode="inline"
          items={menuList}
          className="!border-none"
          defaultOpenKeys={openKeys}
          defaultSelectedKeys={selectedKeys}
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          onClick={onClick}
        />
      </div>
      {/* <!-- Sidebar Menu --> */}

      <button
        onClick={toggleCollapsed}
        className="absolute right-0 top-0 hidden h-6 w-6 translate-x-1/2 cursor-pointer select-none rounded-full border-[1px]  border-dashed border-[#919eab33] text-center lg:block"
      >
        {collapsed ? (
          <SvgIcon icon="ic-right-arrow" size="16" />
        ) : (
          <SvgIcon icon="ic-left-arrow" size="16" />
        )}
      </button>
    </Sider>
  );
}
export default Sidebar;
