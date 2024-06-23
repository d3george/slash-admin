import { Content } from 'antd/es/layout/layout';
import { CSSProperties, forwardRef } from 'react';
import { Outlet } from 'react-router-dom';

import { useSettings } from '@/store/settingStore';
import { useResponsive } from '@/theme/hooks';

import { NAV_WIDTH, NAV_COLLAPSED_WIDTH, HEADER_HEIGHT, MULTI_TABS_HEIGHT } from './config';
import MultiTabs from './multi-tabs';
import { MultiTabsProvider } from './multi-tabs/multi-tabs-provider';

import { ThemeLayout } from '#/enum';

type Props = {
  offsetTop?: boolean;
};
const Main = forwardRef<HTMLDivElement, Props>(({ offsetTop = false }, ref) => {
  const { themeStretch, themeLayout, multiTab } = useSettings();
  const { screenMap } = useResponsive();

  const mainStyle: CSSProperties = {
    paddingTop: HEADER_HEIGHT + (multiTab ? MULTI_TABS_HEIGHT : 0),
    transition: 'padding 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    width: '100%',
  };
  if (themeLayout === ThemeLayout.Horizontal) {
    mainStyle.width = '100vw';
    mainStyle.paddingTop = multiTab ? MULTI_TABS_HEIGHT : 0;
  } else if (screenMap.md) {
    mainStyle.width = `calc(100% - ${
      themeLayout === ThemeLayout.Vertical ? NAV_WIDTH : NAV_COLLAPSED_WIDTH
    })`;
  } else {
    mainStyle.width = '100vw';
  }

  return (
    <Content ref={ref} style={mainStyle} className="flex overflow-auto">
      <div
        className={`m-auto h-full w-full flex-grow sm:p-2 ${
          themeStretch ? '' : 'xl:max-w-screen-xl'
        }`}
      >
        {multiTab ? (
          <MultiTabsProvider>
            <MultiTabs offsetTop={offsetTop} />
          </MultiTabsProvider>
        ) : (
          <Outlet />
        )}
      </div>
    </Content>
  );
});

export default Main;
