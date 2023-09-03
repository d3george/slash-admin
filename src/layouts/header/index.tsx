import { Drawer, theme } from 'antd';
import { useState } from 'react';

import { AppLocalePicker } from '@/components/app';
import Logo from '@/components/app/Logo';
import { SvgIcon } from '@/components/icon';
import { useSettings } from '@/store/settingStore';

import ProSider from '../sidebar';

import Settings from './Settings';
import UserAvatar from './UserAvatar';

import { ThemeLayout } from '#/enum';

function ProHeader() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { themeLayout } = useSettings();
  const {
    token: { colorBgElevated },
  } = theme.useToken();

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

            <button className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-hover">
              <SvgIcon icon="ic-search" size="20" />
            </button>
            <span className="flex h-6 cursor-pointer items-center justify-center rounded-md bg-hover px-2 py-0 text-xs font-bold">
              ⌘K
            </span>
          </div>

          <div className="flex">
            <AppLocalePicker />
            <Settings />
            <UserAvatar />
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
        <ProSider closeSideBarDrawer={() => setDrawerOpen(false)} />
      </Drawer>
    </>
  );
}
export default ProHeader;
