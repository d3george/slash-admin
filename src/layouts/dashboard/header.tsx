import { Drawer } from 'antd';
import Color from 'color';
import { CSSProperties, useState } from 'react';

import { IconButton, Iconify, SvgIcon } from '@/components/icon';
import LocalePicker from '@/components/locale-picker';
import Logo from '@/components/logo';
import { useSettings } from '@/store/settingStore';
import { useResponsive, useThemeToken } from '@/theme/hooks';

import AccountDropdown from '../_common/account-dropdown';
import BreadCrumb from '../_common/bread-crumb';
import NoticeButton from '../_common/notice';
import SearchBar from '../_common/search-bar';
import SettingButton from '../_common/setting-button';

import { NAV_COLLAPSED_WIDTH, NAV_WIDTH, HEADER_HEIGHT, OFFSET_HEADER_HEIGHT } from './config';
import NavVertical from './nav/nav-vertical';

import { ThemeLayout } from '#/enum';

type Props = {
  className?: string;
  offsetTop?: boolean;
};
export default function Header({ className = '', offsetTop = false }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { themeLayout, breadCrumb } = useSettings();
  const { colorBgElevated, colorBorder } = useThemeToken();
  const { screenMap } = useResponsive();

  const headerStyle: CSSProperties = {
    position: themeLayout === ThemeLayout.Horizontal ? 'relative' : 'fixed',
    borderBottom:
      themeLayout === ThemeLayout.Horizontal
        ? `1px dashed ${Color(colorBorder).alpha(0.6).toString()}`
        : '',
    backgroundColor: Color(colorBgElevated).alpha(1).toString(),
  };

  if (themeLayout === ThemeLayout.Horizontal) {
    headerStyle.width = '100vw';
  } else if (screenMap.md) {
    headerStyle.right = '0px';
    headerStyle.left = 'auto';
    headerStyle.width = `calc(100% - ${
      themeLayout === ThemeLayout.Vertical ? NAV_WIDTH : NAV_COLLAPSED_WIDTH
    }px)`;
  } else {
    headerStyle.width = '100vw';
  }

  return (
    <>
      <header className={`z-20 w-full ${className}`} style={headerStyle}>
        <div
          className="flex flex-grow items-center justify-between px-4 text-gray backdrop-blur xl:px-6 2xl:px-10"
          style={{
            height: offsetTop ? OFFSET_HEADER_HEIGHT : HEADER_HEIGHT,
            transition: 'height 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          }}
        >
          <div className="flex items-baseline">
            {themeLayout !== ThemeLayout.Horizontal ? (
              <IconButton onClick={() => setDrawerOpen(true)} className="h-10 w-10 md:hidden">
                <SvgIcon icon="ic-menu" size="24" />
              </IconButton>
            ) : (
              <Logo />
            )}
            <div className="ml-4 hidden md:block">{breadCrumb ? <BreadCrumb /> : null}</div>
          </div>

          <div className="flex">
            <SearchBar />
            <LocalePicker />
            <IconButton onClick={() => window.open('https://github.com/d3george/slash-admin')}>
              <Iconify icon="mdi:github" size={24} />
            </IconButton>
            <IconButton onClick={() => window.open('https://discord.gg/fXemAXVNDa')}>
              <Iconify icon="carbon:logo-discord" size={24} />
            </IconButton>
            <NoticeButton />
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
        styles={{
          header: {
            display: 'none',
          },
          body: {
            padding: 0,
            overflow: 'hidden',
          },
        }}
        width="auto"
      >
        <NavVertical closeSideBarDrawer={() => setDrawerOpen(false)} />
      </Drawer>
    </>
  );
}
