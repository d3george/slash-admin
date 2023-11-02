import { Content } from 'antd/es/layout/layout';
import { forwardRef } from 'react';

import { useSettings } from '@/store/settingStore';
import { useResponsive } from '@/theme/hooks';

import { NAV_WIDTH, NAV_COLLAPSED_WIDTH } from './config';
import MultiTabs from './multi-tabs';

import { ThemeLayout } from '#/enum';

const Main = forwardRef<HTMLDivElement, {}>((_, ref) => {
  const { themeStretch, themeLayout } = useSettings();
  const { screenMap } = useResponsive();

  let mainWith = '100%';
  if (themeLayout === ThemeLayout.Horizontal) {
    mainWith = '100vw';
  } else if (screenMap.md) {
    mainWith = `calc(100% - ${
      themeLayout === ThemeLayout.Vertical ? NAV_WIDTH : NAV_COLLAPSED_WIDTH
    }`;
  } else {
    mainWith = '100vw';
  }
  return (
    <Content
      ref={ref}
      style={{ width: mainWith }}
      className={`flex overflow-auto p-2 ${themeLayout === ThemeLayout.Horizontal ? '' : 'pt-20'}`}
    >
      {/* <!-- ===== Content Start ===== --> */}
      <div
        className={`m-auto h-full w-full flex-grow sm:px-2 ${
          themeStretch ? '' : 'xl:max-w-screen-xl'
        }`}
      >
        <MultiTabs />
      </div>
      {/* <!-- ===== Content End ===== --> */}
    </Content>
  );
});

export default Main;
