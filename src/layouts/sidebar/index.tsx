import { Menu, MenuProps } from 'antd';
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

  const [openKeys, setOpenKeys] = useState(['dashboard']);
  const [selectedKeys, setSelectedKeys] = useState(['dashboard']);
  useEffect(() => {
    console.log(pathname);
    setSelectedKeys([pathname]);
  }, [pathname, openKeys]);

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

  const menuList: ItemType[] = [
    {
      key: 'overview',
      label: `${t('sys.menu.overview')}`,
      children: [
        {
          key: '/dashboard',
          label: `${t('sys.menu.app')}`,
          icon: <SvgIcon icon="ic-dashboard" size="24" className="mr-4" />,
        },
        {
          key: '/analytics',
          label: `${t('sys.menu.analytics')}`,
          icon: <SvgIcon icon="ic-analytics" size="24" className="mr-4" />,
        },
      ],
    },
    {
      key: 'management',
      label: `${t('sys.menu.management')}`,
      children: [
        {
          key: '/user',
          label: `${t('sys.menu.user')}`,
          icon: <SvgIcon icon="ic-user" size="24" className="mr-4" />,
        },
        {
          key: '/blog',
          label: `${t('sys.menu.blog')}`,
          icon: <SvgIcon icon="ic-blog" size="24" className="mr-4" />,
        },
      ],
    },
  ];

  return (
    <div className="h-screen w-64 border-r-[1px] border-dashed  border-r-[#919eab33] duration-300 ease-linear">
      {/* hidden when screen < lg */}

      {/* <!-- SIDEBAR HEADER --> */}
      <NavLink to="/">
        <img src={Logo} alt="" className="mb-2 ml-8 mt-6 h-10 w-10" />
      </NavLink>
      {/* <!-- SIDEBAR HEADER --> */}

      {/* <!-- Sidebar Menu --> */}
      <div className="pl-4">
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
    </div>
  );
}
export default Sidebar;
