import { useScroll } from 'framer-motion';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';

import { CircleLoading } from '@/components/loading';
import ProgressBar from '@/components/progress-bar';
import { useSettings } from '@/store/settingStore';
import { useThemeToken } from '@/theme/hooks';

import Header from './header';
import Main from './main';
import MultiTabs from './multi-tabs';
import Nav from './nav';
import NavHorizontal from './nav-horizontal';

import { ThemeLayout } from '#/enum';

function DashboardLayout() {
  const { colorBgElevated, colorTextBase } = useThemeToken();
  const { themeLayout, multiTab } = useSettings();
  const mainEl = useRef(null);

  const { scrollY } = useScroll({ container: mainEl });
  const [offsetTop, setOffsetTop] = useState(false);
  const onOffSetTop = useCallback(() => {
    scrollY.on('change', (scrollHeight) => {
      if (scrollHeight > 0) {
        setOffsetTop(true);
      } else {
        setOffsetTop(false);
      }
    });
  }, [scrollY]);

  useEffect(() => {
    onOffSetTop();
  }, [onOffSetTop]);

  const verticalLayout = (
    <>
      <Header offsetTop={offsetTop} />
      {multiTab ? <MultiTabs offsetTop={offsetTop} /> : ''}
      <div className="z-50 hidden h-full flex-shrink-0 md:block">
        <Nav />
      </div>
      <Main ref={mainEl} />
    </>
  );

  const horizontalLayout = (
    <div className="relative flex flex-1 flex-col">
      <Header />
      <NavHorizontal />
      {multiTab ? <MultiTabs offsetTop={offsetTop} /> : ''}
      <MultiTabs offsetTop={offsetTop} />
      <Main />
    </div>
  );

  const layout = themeLayout !== ThemeLayout.Horizontal ? verticalLayout : horizontalLayout;

  return (
    <>
      <ProgressBar />

      <div
        className="flex h-screen overflow-hidden"
        style={{
          color: colorTextBase,
          background: colorBgElevated,
          transition:
            'color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        }}
      >
        <Suspense fallback={<CircleLoading />}>{layout}</Suspense>
      </div>
    </>
  );
}
export default DashboardLayout;
