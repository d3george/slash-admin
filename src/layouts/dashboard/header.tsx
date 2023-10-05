import { Drawer } from 'antd';
import { CSSProperties, useState } from 'react';

import { IconButton, SvgIcon } from '@/components/icon';
import LocalePicker from '@/components/locale-picker';
import Logo from '@/components/logo';
import { useSettings } from '@/store/settingStore';

import AccountDropdown from '../_common/account-dropdown';
import BreadCrumb from '../_common/bread-crumb';
import SearchBar from '../_common/search-bar';
import SettingButton from '../_common/setting-button';

import Nav from './nav';

import { ThemeLayout, ThemeMode } from '#/enum';

type Props = {
  className?: string;
  offsetTop?: boolean;
};
export default function Header({ className, offsetTop = false }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { themeLayout, themeMode } = useSettings();

  const headerStyle: CSSProperties = {
    position: themeLayout === ThemeLayout.Horizontal ? 'relative' : 'absolute',
    borderBottom:
      themeLayout === ThemeLayout.Horizontal ? `1px dashed rgba(145, 158, 171, 0.2)` : '',
    backgroundColor:
      themeMode === ThemeMode.Light ? 'rgba(255, 255, 255, 0.8)' : 'rgba(22, 28, 36, 0.8)',
  };
  return (
    <>
      <header className={`z-20 w-full ${className}`} style={headerStyle}>
        <div
          className="shadow-2 flex flex-grow items-center justify-between px-4 text-gray backdrop-blur xl:px-6 2xl:px-10"
          style={{
            height: offsetTop ? '64px' : '80px',
            transition: 'height 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          }}
        >
          <div className="flex items-center ">
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
