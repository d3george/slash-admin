import { Drawer } from 'antd';
import { useState } from 'react';

import { SvgIcon } from '@/components/icon';
import Logo from '@/components/logo';
import { useSettings } from '@/store/settingStore';
import { useThemeToken } from '@/theme/hooks';

import AccountDropdown from '../_common/account-dropdown';
import LanguageDropdown from '../_common/language-dropdown';
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
      <header className="bg-white sticky top-0 h-20 w-full" style={{ background: colorBgElevated }}>
        <div className="shadow-2 flex flex-grow items-center justify-between px-4 py-4 text-gray md:px-6 2xl:px-11">
          <div className="flex items-center">
            {/* hidden when screen widht > lg, when click show Sidebar Drawer */}

            {themeLayout !== ThemeLayout.Horizontal ? (
              <button
                onClick={() => setDrawerOpen(true)}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-hover lg:hidden"
              >
                <SvgIcon icon="ic-menu" size="24" />
              </button>
            ) : (
              <Logo className="mr-4 h-10 w-10" />
            )}

            <SearchBar />
          </div>

          <div className="flex">
            <LanguageDropdown />
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
