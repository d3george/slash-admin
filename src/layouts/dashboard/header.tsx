import { Drawer } from 'antd';
import { useState } from 'react';

import { IconButton, SvgIcon } from '@/components/icon';
import LocalePicker from '@/components/locale-picker';
import Logo from '@/components/logo';
import { useSettings } from '@/store/settingStore';
import { useThemeToken } from '@/theme/hooks';

import AccountDropdown from '../_common/account-dropdown';
import BreadCrumb from '../_common/bread-crumb';
import SearchBar from '../_common/search-bar';
import SettingButton from '../_common/setting-button';

import Nav from './nav';

import { ThemeLayout } from '#/enum';

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { themeLayout } = useSettings();
  const { colorBgElevated } = useThemeToken();

  return (
    <>
      <header
        className="bg-white sticky top-0 w-full"
        style={{
          background: colorBgElevated,
          borderBottom:
            themeLayout === ThemeLayout.Horizontal ? `1px dashed rgba(145, 158, 171, 0.2)` : '',
        }}
      >
        <div className="shadow-2 flex flex-grow items-center justify-between px-4 py-4 text-gray md:px-6 2xl:px-10">
          <div className="flex items-center">
            {/* hidden when screen widht > lg, when click show Sidebar Drawer */}

            {themeLayout !== ThemeLayout.Horizontal ? (
              <IconButton onClick={() => setDrawerOpen(true)} className="h-10 w-10 lg:hidden">
                <SvgIcon icon="ic-menu" size="24" />
              </IconButton>
            ) : (
              <Logo className="mr-2 text-xl" />
            )}
            <div className="hidden md:block">
              <BreadCrumb />
            </div>
          </div>

          <div className="flex">
            <SearchBar />
            <LocalePicker />
            <SettingButton />
            <AccountDropdown />
          </div>
        </div>
      </header>
      <Drawer
        placement="left"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        closeIcon={false}
        headerStyle={{ display: 'none' }}
        bodyStyle={{ padding: 0 }}
        width="auto"
      >
        <Nav closeSideBarDrawer={() => setDrawerOpen(false)} />
      </Drawer>
    </>
  );
}
